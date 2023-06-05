const form = document.querySelector('#quartos')
const quartoInput = document.querySelector('#quartoInput')
const tipoInput = document.querySelector('#tipoInput')
const disponivelInput = document.querySelector('#disponivelInput')
const URL = 'http://localhost:8080/Quarto.php'

const tableBody = document.querySelector('#tabela-quarto')

function carregarQuartos() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(quartos => {
            tableBody.innerHTML = ''

            for (let i = 0; i < quartos.length; i++) {
                const tr = document.createElement('tr')
                const quarto = quartos[i]
                tr.innerHTML = `
                  <td>${quarto.id}</td>
                  <td>${quarto.numero}</td>
                  <td>${quarto.tipo}</td>
                  <td>${quarto.disponivel}</td>
                   <td> 
                  <button data-id="${quarto.id}"onclick="atualizarQuartos(${quarto.id})">Editar</button>
                  <button onclick="excluirQuartos(${quarto.id})">Excluir</button>
                 </td>

                `
                tableBody.appendChild(tr)
            }
        })
}
function adicionarQuartos(event) {
    event.preventDefault()
    const numero = quartoInput.value
    const tipo = tipoInput.value
    const disponivel = disponivelInput.value
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
            `numero=${encodeURIComponent(numero)}&tipo=${encodeURIComponent(tipo)}&disponivel=${encodeURIComponent(disponivel)}`
    })
        .then(response => {
            if (response.ok) {
                carregarQuartos()
                quartoInput.value = ''
                tipoInput.value = ''
                disponivelInput.value = ''
            } //else {
            //     console.error('Error ao add Livro')
            //     alert('Erro ao Add livro')
            // }
        })
}

function atualizarQuartos(id) {
    const novoNumero = prompt("Digite o novo número de quarto")
    const novoTipo = prompt("Digite o novo tipo de quarto")
    const novoDisponivel = prompt("Digite o nova disponibilidade")

    if (novoNumero && novoTipo && novoDisponivel) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: `numero=${encodeURIComponent(novoNumero)}&tipo=${encodeURIComponent(novoTipo)}&disponivel=${encodeURIComponent(novoDisponivel)}`

        })

            .then(response => {
                if (response.ok) {
                    carregarQuartos()
                } else {
                    console.error('Erro ao att quarto')
                    alert('erro ao att quarto')
                }
            })
    }
}

function excluirQuartos(id) {
    if (confirm('Deseja excluir o quarto??')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarQuartos()
                } else {
                    console.error('Erro ao excluir quarto')
                    alert('Erro ao excluir quarto')
                }
            })
    }
}

function ValidarQuarto(){
 var disponivel = quarto.numero.value;
if(disponivel == "" || disponivel.length <= 3){
    alert('Este quarto está ocupado');
    quarto.numero.focus();
    return false;
}
}
ValidarQuarto()

form.addEventListener('submit', adicionarQuartos)

carregarQuartos()
