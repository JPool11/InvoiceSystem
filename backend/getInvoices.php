<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Permitir solicitudes desde el origen del frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos
header("Access-Control-Max-Age: 86400"); // Cache preflight durante 1 día
    include 'db.php';

    try {
        $stmt = $pdo->query("SELECT * FROM Invoices");
        $invoices = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($invoices);
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
?>
