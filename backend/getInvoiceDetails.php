<?php
    include 'db.php';

    if (isset($_GET['InvoiceID'])) {
        $invoiceID = $_GET['InvoiceID'];

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

                $invoice['Details'] = $details;
                echo json_encode($invoice);
            } else {
                echo json_encode(["error" => "Invoice not found"]);
            }
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
?>
