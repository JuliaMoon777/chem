<?php
/**
 * CHEMOROZRUCH – Authentication & Session Security Handler
 */

require_once __DIR__ . '/db.php';

// Configure session parameters securely
if (session_status() === PHP_SESSION_NONE) {
    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
    session_set_cookie_params([
        'lifetime' => 86400, // 24 hours
        'path' => '/',
        'domain' => '',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Strict'
    ]);
    session_start();
}

header('Content-Type: application/json; charset=utf-8');

$pdo = getDatabaseConnection();
$clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$clientIp = explode(',', $clientIp)[0];
$clientIp = trim(filter_var($clientIp, FILTER_VALIDATE_IP) ? $clientIp : '127.0.0.1');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// Check Rate Limiting (Brute Force Protection)
function checkRateLimit(PDO $pdo, string $ip): bool {
    $stmt = $pdo->prepare("SELECT attempts_count, last_attempt_time FROM login_attempts WHERE ip_address = ?");
    $stmt->execute([$ip]);
    $attempt = $stmt->fetch();

    if ($attempt) {
        $now = time();
        $attempts = (int)$attempt['attempts_count'];
        $lastTime = (int)$attempt['last_attempt_time'];

        // If locked for 15 minutes
        if ($attempts >= 5 && ($now - $lastTime) < 900) {
            return false;
        }

        // Reset if lock time passed
        if (($now - $lastTime) >= 900) {
            $pdo->prepare("DELETE FROM login_attempts WHERE ip_address = ?")->execute([$ip]);
        }
    }
    return true;
}

function recordFailedAttempt(PDO $pdo, string $ip): void {
    $stmt = $pdo->prepare("
        INSERT INTO login_attempts (ip_address, attempts_count, last_attempt_time)
        VALUES (?, 1, ?)
        ON CONFLICT(ip_address) DO UPDATE SET
            attempts_count = attempts_count + 1,
            last_attempt_time = ?
    ");
    $now = time();
    $stmt->execute([$ip, $now, $now]);
}

function clearFailedAttempts(PDO $pdo, string $ip): void {
    $pdo->prepare("DELETE FROM login_attempts WHERE ip_address = ?")->execute([$ip]);
}

// Generate CSRF token if not exists
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Action Dispatcher
if ($action === 'check') {
    $isAuth = !empty($_SESSION['chemorozruch_admin_logged_in']) && $_SESSION['chemorozruch_admin_logged_in'] === true;
    sendJsonResponse([
        'authenticated' => $isAuth,
        'username' => $isAuth ? 'admin' : null,
        'csrfToken' => $_SESSION['csrf_token'] ?? null
    ]);
} elseif ($action === 'login') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(['success' => false, 'error' => 'Nieprawidłowa metoda żądania.'], 405);
    }

    if (!checkRateLimit($pdo, $clientIp)) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie za 15 minut.'
        ], 429);
    }

    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true) ?: $_POST;
    $password = $input['password'] ?? '';

    if (empty($password)) {
        sendJsonResponse(['success' => false, 'error' => 'Wprowadź hasło dostępowe.'], 400);
    }

    // Retrieve admin password hash from DB or default config
    $stmt = $pdo->prepare("SELECT value FROM admin_config WHERE key = 'admin_password_hash'");
    $stmt->execute();
    $configRow = $stmt->fetch();

    // Default fallback hash (can be overridden via setup.php or SQL)
    $storedHash = $configRow['value'] ?? null;

    $isValid = false;
    if ($storedHash) {
        $isValid = password_verify($password, $storedHash);
    }

    if ($isValid) {
        clearFailedAttempts($pdo, $clientIp);
        session_regenerate_id(true);
        $_SESSION['chemorozruch_admin_logged_in'] = true;
        $_SESSION['chemorozruch_admin_ip'] = $clientIp;
        $_SESSION['chemorozruch_admin_agent'] = $_SERVER['HTTP_USER_AGENT'] ?? '';

        sendJsonResponse([
            'success' => true,
            'username' => 'admin',
            'csrfToken' => $_SESSION['csrf_token']
        ]);
    } else {
        recordFailedAttempt($pdo, $clientIp);
        sendJsonResponse([
            'success' => false,
            'error' => 'Nieprawidłowe hasło dostępowe.'
        ], 401);
    }
} elseif ($action === 'logout') {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    sendJsonResponse(['success' => true]);
} else {
    sendJsonResponse(['success' => false, 'error' => 'Nieznana akcja.'], 400);
}
