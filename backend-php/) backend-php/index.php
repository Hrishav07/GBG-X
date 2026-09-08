<?php
require_once 'config.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (strpos($path, '/api/products') !== false) {
    // 1. Recommendation Query Check
    if (isset($_GET['recommend_for'])) {
        $prodId = (int)$_GET['recommend_for'];
        
        // Proxy call to Python Flask Recommender
        $ch = curl_init("http://127.0.0.1:5000/recommend?product_id=" . $prodId . "&limit=4");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 2);
        $resp = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($status === 200 && $resp) {
            $data = json_decode($resp, true);
            $ids = $data['recommended_ids'];
            if (!empty($ids)) {
                $placeholders = implode(',', array_fill(0, count($ids), '?'));
                $stmt = $pdo->prepare("SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id IN ($placeholders)");
                $stmt->execute($ids);
                echo json_encode($stmt->fetchAll());
                exit();
            }
        }

        // Fallback: Return 4 other items from the same category
        $stmt = $pdo->prepare("SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id != ? LIMIT 4");
        $stmt->execute([$prodId]);
        echo json_encode($stmt->fetchAll());
        exit();
    }

    // 2. Filter & Search Query Check
    $categorySlug = $_GET['category'] ?? null;
    $search = $_GET['q'] ?? null;

    $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1";
    $params = [];

    if ($categorySlug && $categorySlug !== 'all') {
        $sql .= " AND c.slug = ?";
        $params[] = $categorySlug;
    }

    if ($search) {
        $sql .= " AND (p.name LIKE ? OR p.brand LIKE ? OR p.specs LIKE ?)";
        $params[] = "%$search%";
        $params[] = "%$search%";
        $params[] = "%$search%";
    }

    $sql .= " ORDER BY p.id ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode($stmt->fetchAll());
    exit();
}

http_response_code(404);
echo json_encode(["error" => "Endpoint not found"]);