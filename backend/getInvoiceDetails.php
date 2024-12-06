<?php
header("Access-Control-Allow-Origin: http://localhost:5173"); // Permitir solicitudes desde el origen del frontend
header("Access-Control-Allow-Methods: POST, OPTIONS, GET"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos
header("Access-Control-Max-Age: 86400"); // Cache preflight durante 1 día

include 'db.php';

// Verificar si el InvoiceID está presente en la URL
if (isset($_GET['InvoiceID']) && is_numeric($_GET['InvoiceID'])) {
    $invoiceID = $_GET['InvoiceID']; // Obtener el InvoiceID

    try {
        // Fetch Invoice Header
        $stmt = $pdo->prepare("SELECT * FROM Invoices WHERE InvoiceID = ?");
        $stmt->execute([$invoiceID]);
        $invoice = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($invoice) {
            // Fetch Invoice Details
            $stmt = $pdo->prepare("SELECT d.*, p.Name AS ProductName 
                                   FROM InvoiceDetails d 
                                   JOIN Products p ON d.ProductID = p.ProductID 
                                   WHERE d.InvoiceID = ?");
            $stmt->execute([$invoiceID]);
            $details = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Agregar los detalles de la factura al array
            $invoice['Details'] = $details;

            // Retornar la respuesta en formato JSON
            echo json_encode($invoice);
        } else {
            // Responder con un error si no se encuentra la factura
            echo json_encode(["error" => "Invoice not found"]);
        }
    } catch (Exception $e) {
        // Capturar y responder con un error en caso de excepción
        echo json_encode(["error" => "An error occurred: " . $e->getMessage()]);
    }
} else {
    // Si el InvoiceID no es válido o no está presente
    echo json_encode(["error" => "Invalid or missing InvoiceID"]);
}
?>
