<?php
    include 'db.php';

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $customerID = $_POST['CustomerID'];
        $products = $_POST['Products']; // Array of product IDs and quantities

        try {
            $pdo->beginTransaction();

            // Insert into Invoices
            $stmt = $pdo->prepare("INSERT INTO Invoices (CustomerID, Total) VALUES (?, ?)");
            $stmt->execute([$customerID, 0]);
            $invoiceID = $pdo->lastInsertId();

            $total = 0;

            // Insert into InvoiceDetails
            foreach ($products as $product) {
                $stmt = $pdo->prepare("SELECT Price FROM Products WHERE ProductID = ?");
                $stmt->execute([$product['ProductID']]);
                $price = $stmt->fetchColumn();

                $quantity = $product['Quantity'];
                $lineTotal = $price * $quantity;
                $total += $lineTotal;

                $stmt = $pdo->prepare("INSERT INTO InvoiceDetails (InvoiceID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)");
                $stmt->execute([$invoiceID, $product['ProductID'], $quantity, $lineTotal]);
            }

            // Update Invoice Total
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
