<?php
/**
 * CHEMOROZRUCH – Server-Side SEO & Meta Tags Injector
 * Dynamically injects Title, H1, Meta Description, Canonical, and Schema.org
 * into the HTML page for search engines before serving to client.
 */

require_once __DIR__ . '/db.php';

function renderSsrPage(string $requestUri): void {
    $pdo = getDatabaseConnection();
    $indexPath = dirname(__DIR__) . '/dist/index.html';
    if (!file_exists($indexPath)) {
        $indexPath = dirname(__DIR__) . '/index.html';
    }

    $html = file_exists($indexPath) ? file_get_contents($indexPath) : '<!DOCTYPE html><html><head><title>CHEMOROZRUCH</title></head><body><div id="root"></div></body></html>';

    $parsed = parse_url($requestUri);
    $path = trim($parsed['path'] ?? '', '/');
    $parts = explode('/', $path);

    $type = $parts[0] ?? ''; // 'aktualnosci' or 'kariera'
    $slug = $parts[1] ?? '';

    $title = 'CHEMOROZRUCH – Konstrukcje stalowe i instalacje przemysłowe';
    $description = 'CHEMOROZRUCH – Generalny wykonawca konstrukcji stalowych, aparatów ciśnieniowych i rurociągów przemysłowych.';
    $canonical = 'https://chemorozruch.pl/' . $path . ($path ? '/' : '');
    $ogType = 'website';
    $ogImage = 'https://chemorozruch.pl/images/hero/chemorozruch-hero-konstrukcje-stalowe.webp';
    $h1 = '';
    $bodyContent = '';

    if ($type === 'aktualnosci') {
        if ($slug) {
            $stmt = $pdo->prepare("SELECT * FROM news WHERE slug = ? AND status = 'published'");
            $stmt->execute([$slug]);
            $item = $stmt->fetch();

            if ($item) {
                $title = ($item['seo_title'] ?: $item['title']) . ' | CHEMOROZRUCH';
                $description = $item['meta_description'] ?: ($item['excerpt'] ?: substr(strip_tags($item['content']), 0, 160));
                $h1 = $item['title'];
                $ogType = 'article';
                if (!empty($item['cover_image'])) {
                    $ogImage = str_starts_with($item['cover_image'], 'http') ? $item['cover_image'] : 'https://chemorozruch.pl' . $item['cover_image'];
                }
                $bodyContent = '<h1>' . htmlspecialchars($item['title']) . '</h1>' .
                    '<p class="date">' . htmlspecialchars($item['publication_date']) . '</p>' .
                    '<div>' . $item['content'] . '</div>';
            }
        } else {
            $title = 'Aktualności i Komunikaty | CHEMOROZRUCH';
            $description = 'Bieżące informacje o projektach, rozwoju technologicznym i działalności Przedsiębiorstwa Remontowo-Montażowego CHEMOROZRUCH Sp. z o.o.';
            $h1 = 'Aktualności i Komunikaty';
        }
    } elseif ($type === 'kariera') {
        if ($slug) {
            $stmt = $pdo->prepare("SELECT * FROM careers WHERE slug = ? AND status = 'published'");
            $stmt->execute([$slug]);
            $item = $stmt->fetch();

            if ($item) {
                $title = ($item['seo_title'] ?: 'Praca: ' . $item['position']) . ' | CHEMOROZRUCH';
                $description = $item['meta_description'] ?: ($item['intro'] ?: substr(strip_tags($item['description']), 0, 160));
                $h1 = $item['position'];
                $ogType = 'article';
                $bodyContent = '<h1>' . htmlspecialchars($item['position']) . '</h1>' .
                    '<p class="location">' . htmlspecialchars($item['location']) . '</p>' .
                    '<div>' . $item['description'] . '</div>' .
                    '<div>' . $item['responsibilities'] . '</div>' .
                    '<div>' . $item['requirements'] . '</div>' .
                    '<div>' . $item['offer'] . '</div>';
            }
        } else {
            $title = 'Kariera i Oferty Pracy | CHEMOROZRUCH';
            $description = 'Dołącz do zespołu inżynierów, monterów i spawaczy CHEMOROZRUCH. Stabilne zatrudnienie i bezpieczne warunki.';
            $h1 = 'Dołącz do Zespołu CHEMOROZRUCH';
        }
    }

    // Replace Title
    $html = preg_replace('/<title>.*?<\/title>/i', '<title>' . htmlspecialchars($title) . '</title>', $html);

    // Replace or add Meta Description
    if (preg_match('/<meta\s+name=["\']description["\'][^>]*>/i', $html)) {
        $html = preg_replace('/<meta\s+name=["\']description["\']\s+content=["\'][^"\']*["\']/i', '<meta name="description" content="' . htmlspecialchars($description) . '"', $html);
    } else {
        $html = str_replace('</head>', '<meta name="description" content="' . htmlspecialchars($description) . "\">\n</head>", $html);
    }

    // Replace Open Graph Tags
    $ogTags = "
    <meta property=\"og:title\" content=\"" . htmlspecialchars($title) . "\" />
    <meta property=\"og:description\" content=\"" . htmlspecialchars($description) . "\" />
    <meta property=\"og:type\" content=\"{$ogType}\" />
    <meta property=\"og:url\" content=\"{$canonical}\" />
    <meta property=\"og:image\" content=\"{$ogImage}\" />
    <link rel="canonical" href="{$canonical}" />
    ";
    $html = str_replace('</head>', $ogTags . "\n</head>", $html);

    // Inject crawler-readable content inside <div id="root"> if empty on raw load
    if ($bodyContent) {
        $ssrDiv = '<noscript><div id="ssr-crawler-content" style="display:block; max-width:800px; margin:0 auto; padding:20px;">' . $bodyContent . '</div></noscript>';
        $html = str_replace('</body>', $ssrDiv . "\n</body>", $html);
    }

    header('Content-Type: text/html; charset=utf-8');
    echo $html;
    exit;
}

// Direct invocation
if (isset($_SERVER['REQUEST_URI'])) {
    renderSsrPage($_SERVER['REQUEST_URI']);
}
