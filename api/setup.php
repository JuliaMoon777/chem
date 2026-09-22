<?php
/**
 * CHEMOROZRUCH – Admin Setup & Password Initialization Script
 * Use this script on initial server deployment to set or update the admin master password.
 */

require_once __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$message = '';
$messageType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newPassword = $_POST['new_password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if (strlen($newPassword) < 8) {
        $message = 'Hasło musi mieć co najmniej 8 znaków.';
        $messageType = 'error';
    } elseif ($newPassword !== $confirmPassword) {
        $message = 'Hasła nie są identyczne.';
        $messageType = 'error';
    } else {
        // Hash password securely with default strong algorithm (Argon2id/Bcrypt depending on PHP build)
        $hash = password_hash($newPassword, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("
            INSERT INTO admin_config (key, value)
            VALUES ('admin_password_hash', ?)
            ON CONFLICT(key) DO UPDATE SET value = ?
        ");
        $stmt->execute([$hash, $hash]);

        $message = 'Hasło administratora zostało pomyślnie ustawione i zabezpieczone hashem serwerowym.';
        $messageType = 'success';
    }
}
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CHEMOROZRUCH – Konfiguracja Hasła Panelu</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 40px 20px; }
        .card { max-width: 480px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        h1 { font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 8px; color: #0f172a; }
        p { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 24px; }
        label { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #334155; margin-bottom: 6px; }
        input[type="password"] { width: 100%; box-sizing: border-box; padding: 12px 14px; font-size: 14px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 16px; }
        input[type="password"]:focus { border-color: #dc2626; outline: none; box-shadow: 0 0 0 3px rgba(220,38,38,0.15); }
        button { width: 100%; padding: 12px; background: #dc2626; color: #fff; font-size: 14px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
        button:hover { background: #b91c1c; }
        .alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 20px; }
        .alert-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
        .alert-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
        .back-link { display: block; text-align: center; margin-top: 20px; font-size: 13px; color: #64748b; text-decoration: none; }
        .back-link:hover { color: #dc2626; }
    </style>
</head>
<body>
    <div class="card">
        <h1>CHEMOROZRUCH</h1>
        <p>Inicjalizacja lub zmiana hasła administratora panelu redakcyjnego.</p>

        <?php if ($message): ?>
            <div class="alert alert-<?= $messageType ?>">
                <?= htmlspecialchars($message) ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <div>
                <label for="new_password">Nowe hasło administratora</label>
                <input type="password" id="new_password" name="new_password" required minlength="8" placeholder="Minimum 8 znaków">
            </div>

            <div>
                <label for="confirm_password">Powtórz nowe hasło</label>
                <input type="password" id="confirm_password" name="confirm_password" required minlength="8" placeholder="Powtórz hasło">
            </div>

            <button type="submit">Zapisz bezpieczny hash hasła</button>
        </form>

        <a href="/" class="back-link">← Powrót do serwisu CHEMOROZRUCH</a>
    </div>
</body>
</html>
