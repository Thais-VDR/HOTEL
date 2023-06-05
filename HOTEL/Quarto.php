<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;
}

include 'conexao.php';

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    $stmt = $conn->prepare("SELECT * FROM quarto");
    $stmt->execute();
    $Hotel = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($Hotel);
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $numero = $_POST['numero'];
    $tipo = $_POST['tipo'];
    $disponivel = $_POST['disponivel'];
  
    $stmt = $conn->prepare("INSERT INTO quarto (numero, tipo, disponivel) VALUES(:numero, :tipo, :disponivel)");
    $stmt->bindParam(':numero', $numero);
    $stmt->bindParam(':tipo', $tipo);
    $stmt->bindParam(':disponivel', $disponivel);

    if($stmt->execute()){
        echo "Quarto adicionado com sucesso!!!";
    } else {
        echo"Este quarto já está adicionado, tente outro!!!";
    }
}

if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM quarto WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Quarto excluido com sucesso!!!";
    }else{
        echo"Erro ao excluir o quarto";
    }
}

if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $novoNumero = $_PUT['numero'];
    $novoTipo = $_PUT['tipo'];
    $novoDisponivel = $_PUT['disponivel'];

    $stmt = $conn->prepare("UPDATE quarto SET numero = :numero, tipo = :tipo, disponivel = :disponivel WHERE id = :id");
    $stmt->bindParam(':numero', $novoNumero);
    $stmt->bindParam(':tipo', $novoTipo);
    $stmt->bindParam(':disponivel', $novoDisponivel);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Quarto atualizado!!!";
    } else {
        echo "Erro ao atualizar!!!";
    }
}