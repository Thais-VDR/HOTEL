<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;
}

include 'conexao.php';

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    $stmt = $conn->prepare("SELECT * FROM reserva");
    $stmt->execute();
    $Hotel = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($Hotel);
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $nome_cliente = $_POST['nome_cliente'];
    $numero_quarto = $_POST['numero_quarto'];
    $check_in = $_POST['check_in'];
    $check_out = $_POST['check_out'];

    $stmt = $conn->prepare("INSERT INTO reserva (nome_cliente, numero_quarto, check_in, check_out) VALUES(:nome_cliente, :numero_quarto, :check_in, :check_out)");
    $stmt->bindParam(':nome_cliente', $nome_cliente);
    $stmt->bindParam(':numero_quarto', $numero_quarto);
    $stmt->bindParam(':check_in', $check_in);
    $stmt->bindParam(':check_out', $check_out);
  
    if($stmt->execute()){
        echo "Reserva adicionada com sucesso!!!";
    } else {
        echo"Este quarto já está reservado!!!";
    }
}

if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM quartos WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Reserva excluida com sucesso!!!";
    }else{
        echo"Erro ao excluir a reserva";
    }
}

if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $novoCliente = $_PUT['nome_cliente'];
    $novoQuarto = $_PUT['numero_quarto'];
    $novoCheckIn = $_PUT['check_in'];
    $novoCheckOut = $_PUT['check_out'];

    $stmt = $conn->prepare("UPDATE reserva SET nome_cliente = :nome_cliente, numero_quarto = :numero_quarto, check_in = :check_in, check_out = :check_out WHERE id = :id");
    $stmt->bindParam(':nome_cliente', $novoCliente);
    $stmt->bindParam(':numero_quarto', $novoQuarto);
    $stmt->bindParam(':check_in', $novoCheckIn);
    $stmt->bindParam(':check_out', $novoCheckOut);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Reserva atualizada!!!";
    } else {
        echo "Erro ao atualizar a reserva!!!";
    }

}