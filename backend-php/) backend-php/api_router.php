<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? '';

if ($endpoint === 'products') {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
            $stmt->execute([$_GET['id']]);
            echo json_encode($stmt->fetch());
            exit();
        }

        $category = $_GET['category'] ?? null;
        $sql = "SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1";
        $params = [];

        if ($category && $category !== 'All') {
            $sql .= " AND c.name = ?";
            $params[] = $category;
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        echo json_encode($stmt->fetchAll());
        exit();
    }
}

if ($endpoint === 'partner' && $method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $pdo->prepare("INSERT INTO partners (partner_type, full_name, phone, city, note) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['partner_type'] ?? 'Dealership',
        $data['name'] ?? '',
        $data['phone'] ?? '',
        $data['city'] ?? '',
        $data['note'] ?? ''
    ]);
    echo json_encode(["status" => "success", "message" => "Partnership application received."]);
    exit();
}

http_response_code(404);
echo json_encode(["error" => "API endpoint not found."]);