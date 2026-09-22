<?php
/**
 * CHEMOROZRUCH – News (Aktualności) API
 */

require_once __DIR__ . '/db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$pdo = getDatabaseConnection();
$method = $_SERVER['REQUEST_METHOD'];
$isAdmin = !empty($_SESSION['chemorozruch_admin_logged_in']) && $_SESSION['chemorozruch_admin_logged_in'] === true;

function sanitizeHtml(string $html): string {
    // Strip dangerous tags while allowing safe editorial elements
    $allowedTags = '<p><br><strong><em><b><i><h2><h3><h4><ul><ol><li><a>';
    $clean = strip_tags($html, $allowedTags);
    // Remove javascript: links and event handlers
    $clean = preg_replace('/<a\s+[^>]*href=["\']javascript:[^"\']*["\'][^>]*>/i', '', $clean);
    $clean = preg_replace('/\s*on\w+\s*=\s*["\'][^"\']*["\']/i', '', $clean);
    return $clean;
}

// -------------------------------------------------------------
// GET: Fetch News
// -------------------------------------------------------------
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? null;
    $id = $_GET['id'] ?? null;
    $getAll = !empty($_GET['all']) && $isAdmin;

    if ($slug) {
        $query = "SELECT * FROM news WHERE slug = ?";
        if (!$isAdmin) {
            $query .= " AND status = 'published'";
        }
        $stmt = $pdo->prepare($query);
        $stmt->execute([$slug]);
        $item = $stmt->fetch();

        if ($item) {
            sendJsonResponse(['success' => true, 'data' => $item]);
        } else {
            sendJsonResponse(['success' => false, 'error' => 'Nie znaleziono aktualności.'], 404);
        }
    } elseif ($id) {
        $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
        $stmt->execute([$id]);
        $item = $stmt->fetch();

        if ($item) {
            sendJsonResponse(['success' => true, 'data' => $item]);
        } else {
            sendJsonResponse(['success' => false, 'error' => 'Nie znaleziono aktualności.'], 404);
        }
    } else {
        $query = "SELECT id, title, slug, excerpt, cover_image, image_alt, publication_date, status, created_at, updated_at FROM news";
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

if ($method === 'POST' || $method === 'PUT') {
    $id = $data['id'] ?? ($method === 'PUT' ? ($_GET['id'] ?? '') : '');
    $title = trim($data['title'] ?? '');
    $slug = trim($data['slug'] ?? '');
    $excerpt = trim($data['excerpt'] ?? '');
    $content = sanitizeHtml($data['content'] ?? '');
    $coverImage = trim($data['cover_image'] ?? '');
    $imageAlt = trim($data['image_alt'] ?? '');
    $publicationDate = trim($data['publication_date'] ?? date('Y-m-d'));
    $status = in_array($data['status'] ?? '', ['draft', 'published']) ? $data['status'] : 'published';
    $seoTitle = trim($data['seo_title'] ?? '') ?: null;
    $metaDescription = trim($data['meta_description'] ?? '') ?: null;

    if (empty($title) || empty($slug)) {
        sendJsonResponse(['success' => false, 'error' => 'Tytuł i adres URL (slug) są wymagane.'], 400);
    }

    $now = date('Y-m-d H:i:s');

    if ($method === 'POST' && empty($id)) {
        $id = 'news-' . bin2hex(random_bytes(8));
        $stmt = $pdo->prepare("
            INSERT INTO news (
                id, title, slug, excerpt, content, cover_image, image_alt,
                publication_date, created_at, updated_at, status, seo_title, meta_description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        try {
            $stmt->execute([
                $id, $title, $slug, $excerpt, $content, $coverImage, $imageAlt,
                $publicationDate, $now, $now, $status, $seoTitle, $metaDescription
            ]);
            sendJsonResponse(['success' => true, 'data' => ['id' => $id, 'slug' => $slug]]);
        } catch (PDOException $e) {
            if (strpos($e->getMessage(), 'UNIQUE') !== false) {
                sendJsonResponse(['success' => false, 'error' => 'Wpis o takim adresie URL (slug) już istnieje.'], 409);
            }
            sendJsonResponse(['success' => false, 'error' => 'Błąd zapisu w bazie danych.'], 500);
        }
    } else {
        $stmt = $pdo->prepare("
            UPDATE news SET
                title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, image_alt = ?,
                publication_date = ?, updated_at = ?, status = ?, seo_title = ?, meta_description = ?
            WHERE id = ?
        ");
        try {
            $stmt->execute([
                $title, $slug, $excerpt, $content, $coverImage, $imageAlt,
                $publicationDate, $now, $status, $seoTitle, $metaDescription, $id
            ]);
            sendJsonResponse(['success' => true, 'data' => ['id' => $id, 'slug' => $slug]]);
        } catch (PDOException $e) {
            sendJsonResponse(['success' => false, 'error' => 'Błąd aktualizacji wpisu.'], 500);
        }
    }
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? $data['id'] ?? '';
    if (empty($id)) {
        sendJsonResponse(['success' => false, 'error' => 'Brak ID wpisu do usunięcia.'], 400);
    }

    $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
    $stmt->execute([$id]);
    sendJsonResponse(['success' => true, 'message' => 'Aktualność została usunięta.']);
} else {
    sendJsonResponse(['success' => false, 'error' => 'Niedozwolona metoda HTTP.'], 405);
}
