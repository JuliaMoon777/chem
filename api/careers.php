<?php
/**
 * CHEMOROZRUCH – Careers (Kariera) API
 */

require_once __DIR__ . '/db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$pdo = getDatabaseConnection();
$method = $_SERVER['REQUEST_METHOD'];
$isAdmin = !empty($_SESSION['chemorozruch_admin_logged_in']) && $_SESSION['chemorozruch_admin_logged_in'] === true;

function sanitizeHtml(string $html): string {
    $allowedTags = '<p><br><strong><em><b><i><h2><h3><h4><ul><ol><li><a>';
    $clean = strip_tags($html, $allowedTags);
    $clean = preg_replace('/<a\s+[^>]*href=["\']javascript:[^"\']*["\'][^>]*>/i', '', $clean);
    $clean = preg_replace('/\s*on\w+\s*=\s*["\'][^"\']*["\']/i', '', $clean);
    return $clean;
}

// -------------------------------------------------------------
// GET: Fetch Career Offers
// -------------------------------------------------------------
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? null;
    $id = $_GET['id'] ?? null;
    $getAll = !empty($_GET['all']) && $isAdmin;

    if ($slug) {
        $query = "SELECT * FROM careers WHERE slug = ?";
        if (!$isAdmin) {
            $query .= " AND status = 'published'";
        }
        $stmt = $pdo->prepare($query);
        $stmt->execute([$slug]);
        $item = $stmt->fetch();

        if ($item) {
            sendJsonResponse(['success' => true, 'data' => $item]);
        } else {
            sendJsonResponse(['success' => false, 'error' => 'Nie znaleziono oferty pracy.'], 404);
        }
    } elseif ($id) {
        $stmt = $pdo->prepare("SELECT * FROM careers WHERE id = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetch();

        if ($item) {
            sendJsonResponse(['success' => true, 'data' => $item]);
        } else {
            sendJsonResponse(['success' => false, 'error' => 'Nie znaleziono oferty pracy.'], 404);
        }
    } else {
        $query = "SELECT id, position, slug, location, intro, publication_date, status, created_at, updated_at FROM careers";
        if (!$getAll) {
            $query .= " WHERE status = 'published'";
        }
        $query .= " ORDER BY publication_date DESC, created_at DESC";

        $stmt = $pdo->query($query);
        $items = $stmt->fetchAll();
        sendJsonResponse(['success' => true, 'data' => $items]);
    }
}

// -------------------------------------------------------------
// PROTECTED METHODS (Require Admin Session)
// -------------------------------------------------------------
if (!$isAdmin) {
    sendJsonResponse(['success' => false, 'error' => 'Brak uprawnień. Zaloguj się.'], 401);
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

if ($method === 'PATCH' && !empty($_GET['action']) && $_GET['action'] === 'status') {
    $id = $_GET['id'] ?? $data['id'] ?? '';
    $status = in_array($data['status'] ?? '', ['draft', 'published', 'closed']) ? $data['status'] : 'closed';

    if (empty($id)) {
        sendJsonResponse(['success' => false, 'error' => 'Brak ID oferty.'], 400);
    }

    $stmt = $pdo->prepare("UPDATE careers SET status = ?, updated_at = ? WHERE id = ?");
    $stmt->execute([$status, date('Y-m-d H:i:s'), $id]);
    sendJsonResponse(['success' => true, 'status' => $status]);
} elseif ($method === 'POST' || $method === 'PUT') {
    $id = $data['id'] ?? ($method === 'PUT' ? ($_GET['id'] ?? '') : '');
    $position = trim($data['position'] ?? '');
    $slug = trim($data['slug'] ?? '');
    $location = trim($data['location'] ?? '');
    $intro = trim($data['intro'] ?? '');
    $description = sanitizeHtml($data['description'] ?? '');
    $responsibilities = sanitizeHtml($data['responsibilities'] ?? '');
    $requirements = sanitizeHtml($data['requirements'] ?? '');
    $offer = sanitizeHtml($data['offer'] ?? '');
    $applicationInfo = sanitizeHtml($data['application_information'] ?? '');
    $publicationDate = trim($data['publication_date'] ?? date('Y-m-d'));
    $status = in_array($data['status'] ?? '', ['draft', 'published', 'closed']) ? $data['status'] : 'published';
    $seoTitle = trim($data['seo_title'] ?? '') ?: null;
    $metaDescription = trim($data['meta_description'] ?? '') ?: null;

    if (empty($position) || empty($slug) || empty($location)) {
        sendJsonResponse(['success' => false, 'error' => 'Stanowisko, slug i lokalizacja są wymagane.'], 400);
    }

    $now = date('Y-m-d H:i:s');

    if ($method === 'POST' && empty($id)) {
        $id = 'job-' . bin2hex(random_bytes(8));
        $stmt = $pdo->prepare("
            INSERT INTO careers (
                id, position, slug, location, intro, description, responsibilities,
                requirements, offer, application_information, publication_date,
                created_at, updated_at, status, seo_title, meta_description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        try {
            $stmt->execute([
                $id, $position, $slug, $location, $intro, $description, $responsibilities,
                $requirements, $offer, $applicationInfo, $publicationDate,
                $now, $now, $status, $seoTitle, $metaDescription
            ]);
            sendJsonResponse(['success' => true, 'data' => ['id' => $id, 'slug' => $slug]]);
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'UNIQUE') !== false) {
                sendJsonResponse(['success' => false, 'error' => 'Oferta o takim adresie URL (slug) już istnieje.'], 409);
            }
            sendJsonResponse(['success' => false, 'error' => 'Błąd zapisu oferty w bazie danych.'], 500);
        }
    } else {
        $stmt = $pdo->prepare("
            UPDATE careers SET
                position = ?, slug = ?, location = ?, intro = ?, description = ?,
                responsibilities = ?, requirements = ?, offer = ?, application_information = ?,
                publication_date = ?, updated_at = ?, status = ?, seo_title = ?, meta_description = ?
            WHERE id = ?
        ");
        try {
            $stmt->execute([
                $position, $slug, $location, $intro, $description,
                $responsibilities, $requirements, $offer, $applicationInfo,
                $publicationDate, $now, $status, $seoTitle, $metaDescription, $id
            ]);
            sendJsonResponse(['success' => true, 'data' => ['id' => $id, 'slug' => $slug]]);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'error' => 'Błąd aktualizacji oferty pracy.'], 500);
        }
    }
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? $data['id'] ?? '';
    if (empty($id)) {
        sendJsonResponse(['success' => false, 'error' => 'Brak ID oferty do usunięcia.'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM careers WHERE id = ?");
    $stmt->execute([$id]);
    sendJsonResponse(['success' => true, 'message' => 'Oferta pracy została usunięta.']);
} else {
    sendJsonResponse(['success' => false, 'error' => 'Niedozwolona metoda HTTP.'], 405);
}
