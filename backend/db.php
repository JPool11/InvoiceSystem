<?php
    $host = "localhost";
    $user = "root";  // Replace with your username
    $password = "1234";  // Replace with your password
    $dbname = "invoicesystem";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>
