<?php
/**
 * CHEMOROZRUCH – Secure Image Uploader API
 */

require_once __DIR__ . '/db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$isAdmin = !empty($_SESSION['chemorozruch_admin_logged_in']) && $_SESSION['chemorozruch_admin_logged_in'] === true;
if (!$isAdmin) {
    sendJsonResponse(['success' => false, 'error' => 'Brak autoryzacji do wgrywania plików.'], 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'error' => 'Wymagane żądanie POST.'], 405);
}

if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    sendJsonResponse(['success' => false, 'error' => 'Brak pliku lub błąd przesyłania.'], 400);
}

$file = $_FILES['image'];
$targetFolder = $_POST['folder'] ?? 'aktualnosci';
if (!in_array($targetFolder, ['aktualnosci', 'kariera'])) {
    $targetFolder = 'aktualnosci';
}

// 1. Max size: 5MB
$maxSize = 5 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    sendJsonResponse(['success' => false, 'error' => 'Maksymalny dozwolony rozmiar pliku wynosi 5 MB.'], 400);
}

// 2. MIME type verification via finfo
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file['tmp_name']);

$allowedMimeToExt = [
    'image/jpeg' => 'jpg',
    'image/jpg'  => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
];

if (!isset($allowedMimeToExt[$mimeType])) {
    sendJsonResponse(['success' => false, 'error' => 'Niedozwolony format. Dozwolone: JPG, PNG, WebP.'], 400);
}

$extension = $allowedMimeToExt[$mimeType];

// 3. Security: Prevent PHP execution in uploads directory
$uploadBaseDir = dirname(__DIR__) . '/uploads/' . $targetFolder;
if (!is_dir($uploadBaseDir)) {
    @mkdir($uploadBaseDir, 0755, true);
}

// Write .htaccess inside uploads to strictly disallow script execution
$uploadsHtaccess = dirname(__DIR__) . '/uploads/.htaccess';
if (!file_exists($uploadsHtaccess)) {
    $htaccessRules = "<FilesMatch \"\\.(php|phtml|php3|php4|php5|php7|php8|phps|cgi|pl|sh|py|asp|aspx|exe|dll)$\">\n    Deny from all\n</FilesMatch>\nOptions -ExecCGI\n";
    @file_put_contents($uploadsHtaccess, $htaccessRules);
}

// 4. Generate unique random filename
$safeFilename = 'chemorozruch-' . bin2hex(random_bytes(12)) . '.' . $extension;
$destinationPath = $uploadBaseDir . '/' . $safeFilename;

if (move_uploaded_file($file['tmp_name'], $destinationPath)) {
    $publicUrl = '/uploads/' . $targetFolder . '/' . $safeFilename;
    sendJsonResponse([
        'success' => true,
        'url' => $publicUrl,
        'filename' => $safeFilename
    ]);
} else {
    sendJsonResponse(['success' => false, 'error' => 'Błąd zapisu pliku na serwerze.'], 500);
}
