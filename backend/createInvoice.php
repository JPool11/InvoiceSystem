<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Permitir solicitudes desde el origen del frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos
header("Access-Control-Max-Age: 86400"); // Cache preflight durante 1 día
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Decodifica los datos JSON enviados desde Postman
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        echo json_encode(["error" => "Invalid JSON"]);
        exit;
    }

    $customerID = $input['CustomerID'] ?? null;
    $products = $input['Products'] ?? [];

    if (!$customerID || empty($products)) {
        echo json_encode(["error" => "Missing CustomerID or Products"]);
        exit;
    }

    try {
        $pdo->beginTransaction();

        // Inserta en la tabla de facturas
        $stmt = $pdo->prepare("INSERT INTO Invoices (CustomerID, Total) VALUES (?, ?)");
        $stmt->execute([$customerID, 0]);
        $invoiceID = $pdo->lastInsertId();

        $total = 0;

        // Procesa los productos y calcula el total
        foreach ($products as $product) {
            $stmt = $pdo->prepare("SELECT Price FROM Products WHERE ProductID = ?");
            $stmt->execute([$product['ProductID']]);
            $price = $stmt->fetchColumn();

            if (!$price) {
                throw new Exception("ProductID " . $product['ProductID'] . " not found");
            }

            $quantity = $product['Quantity'];
            $lineTotal = $price * $quantity;
            $total += $lineTotal;

            $stmt = $pdo->prepare("INSERT INTO InvoiceDetails (InvoiceID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)");
            $stmt->execute([$invoiceID, $product['ProductID'], $quantity, $price]);
        }

        // Actualiza el total en la factura
        $stmt = $pdo->prepare("UPDATE Invoices SET Total = ? WHERE InvoiceID = ?");
        $stmt->execute([$total, $invoiceID]);

        $pdo->commit();
        echo json_encode(["message" => "Invoice created successfully", "InvoiceID" => $invoiceID]);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(["error" => $e->getMessage()]);
    }
}
?>
