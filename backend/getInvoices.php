<?php
    include 'db.php';

    try {
        $stmt = $pdo->query("SELECT * FROM Invoices");
        $invoices = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($invoices);
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
?>
