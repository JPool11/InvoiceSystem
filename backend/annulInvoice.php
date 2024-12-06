<?php
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
