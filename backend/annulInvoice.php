<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Permitir solicitudes desde el origen del frontend
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos
header("Access-Control-Max-Age: 86400"); // Cache preflight durante 1 día
include 'db.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $invoiceID = $_POST['InvoiceID'];

        try {
            $stmt = $pdo->prepare("UPDATE Invoices SET Status = 'Annulled' WHERE InvoiceID = ?");
            $stmt->execute([$invoiceID]);
            echo json_encode(["message" => "Invoice annulled successfully"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
?>
