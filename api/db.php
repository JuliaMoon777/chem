<?php
/**
 * CHEMOROZRUCH – CMS Database Layer (SQLite PDO)
 * Zero-dependency, lightweight, high performance.
 */

// Enable strict error reporting internally, but do not leak details to clients
error_reporting(E_ALL);
ini_set('display_errors', '0');

function getDatabaseConnection(): PDO {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dataDir = dirname(__DIR__) . '/data';
    if (!is_dir($dataDir)) {
        @mkdir($dataDir, 0750, true);
    }

    // Protect data folder with .htaccess if on Apache
    $dataHtaccess = $dataDir . '/.htaccess';
    if (!file_exists($dataHtaccess)) {
        @file_put_contents($dataHtaccess, "Deny from all\n");
    }

    $dbFile = $dataDir . '/chemorozruch.sqlite';
    $isNew = !file_exists($dbFile);

    try {
        $pdo = new PDO('sqlite:' . $dbFile);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        // SQLite Pragmas for performance and concurrency
        $pdo->exec('PRAGMA journal_mode = WAL;');
        $pdo->exec('PRAGMA synchronous = NORMAL;');
        $pdo->exec('PRAGMA foreign_keys = ON;');

        if ($isNew) {
            initSchema($pdo);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'error' => 'Błąd inicjalizacji bazy danych.']);
        exit;
    }

    return $pdo;
}

function initSchema(PDO $pdo): void {
    // 1. News table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS news (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            excerpt TEXT,
            content TEXT NOT NULL,
            cover_image TEXT,
            image_alt TEXT,
            publication_date TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'published',
            seo_title TEXT,
            meta_description TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
        CREATE INDEX IF NOT EXISTS idx_news_status_date ON news(status, publication_date DESC);
    ");

    // 2. Careers table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS careers (
            id TEXT PRIMARY KEY,
            position TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            location TEXT NOT NULL,
            intro TEXT,
            description TEXT,
            responsibilities TEXT,
            requirements TEXT,
            offer TEXT,
            application_information TEXT,
            publication_date TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'published',
            seo_title TEXT,
            meta_description TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
        CREATE INDEX IF NOT EXISTS idx_careers_status_date ON careers(status, publication_date DESC);
    ");

    // 3. Rate limiting / login attempts table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS login_attempts (
            ip_address TEXT PRIMARY KEY,
            attempts_count INTEGER NOT NULL DEFAULT 1,
            last_attempt_time INTEGER NOT NULL
        );
    ");

    // 4. Admin config table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_config (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );
    ");
}

function sendJsonResponse(array $data, int $statusCode = 200): void {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
