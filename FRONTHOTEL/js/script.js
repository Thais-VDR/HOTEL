const form = document.querySelector('#reserva')
const nomeInput = document.querySelector('#nomeInput')
const quartoInput = document.querySelector('#quartoInput')
const checkinInput = document.querySelector('#checkinInput')
const checkoutInput = document.querySelector('#checkoutInput')
const URL = 'http://localhost:8080/Reserva.php'

const tableBody = document.querySelector('#tabela-reserva')

function carregarReservas() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(reservas => {
            tableBody.innerHTML = ''

            for (let i = 0; i < reservas.length; i++) {
                const tr = document.createElement('tr')
                const reserva = reservas[i]
                tr.innerHTML = `
                  <td>${reserva.id}</td>
                  <td>${reserva.nome_cliente}</td>
                  <td>${reserva.numero_quarto}</td>
                  <td>${reserva.check_in}</td>
                  <td>${reserva.check_out}</td>
                   <td> 
                  <button data-id="${reserva.id}"onclick="atualizarReserva(${reserva.id})">Edit</button>
                  <button onclick="excluirReserva(${reserva.id})">Cancelar</button>
                 </td>

                `
                tableBody.appendChild(tr)
            }
        })
}
//Função para criar um livro
function adicionarReserva(event) {
    event.preventDefault()
    const nome_cliente = nomeInput.value
    const numero_quarto = quartoInput.value
    const check_in = checkinInput.value
    const check_out = checkoutInput.value
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
            `nome_cliente=${encodeURIComponent(nome_cliente)}&numero_quarto=${encodeURIComponent(numero_quarto)}&check_in=${encodeURIComponent(check_in)}&check_out=${encodeURIComponent(check_out)}`
    })
        .then(response => {
            if (response.ok) {
                carregarReservas()
                nomeInput.value = ''
                quartoInput.value = ''
                checkinInput.value = ''
                checkoutInput.value = ''
            } //else {
            //     console.error('Error ao add Livro')
            //     alert('Erro ao Add livro')
            // }
        })
}

function atualizarReserva(id) {
    const novoCliente = prompt("Digite o novo nome")
    const novoQuarto = prompt("Digite o novo número do quarto")
    const novoCheckIn = prompt("Digite o novo check-in")
    const novoCheckOut = prompt("Digite o novo check-out")

    if (novoCliente && novoQuarto && novoCheckIn && novoCheckOut) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: `nome_cliente=${encodeURIComponent(novoCliente)}&numero_quarto=${encodeURIComponent(novoQuarto)}&check_in=${encodeURIComponent(novoCheckIn)}&check_out=${encodeURIComponent(novoCheckOut)}`

        })

            .then(response => {
                if (response.ok) {
                    carregarReservas()
                } else {
                    console.error('Erro ao att reserva')
                    alert('erro ao att reserva')
                }
            })
    }
}

function excluirReserva(id) {
    if (confirm('Deseja excluir sua reserva??')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarReservas()
                } else {
                    console.error('Erro ao excluir reserva')
                    alert('Erro ao excluir reserva')
                }
            })
    }
}
form.addEventListener('submit', adicionarReserva)

carregarReservas()
