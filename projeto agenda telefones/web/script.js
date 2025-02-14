const cadastro = document.getElementById('cadastro');

cadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    const corpo = {
        nome: cadastro.nome.value,
        telefone: cadastro.telefone.value,
        obs: cadastro.obs.value
    };

    fetch('http://localhost:4000/telefones', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
    .then(response => response.status)
    .then(status => {
        if (status === 201) {
            alert('Telefone cadastrado com sucesso');
            window.location.reload();
        } else {
            alert('Erro ao cadastrar telefone');
        }
    });
});

fetch('http://localhost:4000/telefones')
.then(response => response.json())
.then(telefones => {
    const tabela = document.getElementById('telefones');
    telefones.forEach(telefone => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${telefone.telefone_id}</td>
            <td>${telefone.nome}</td>
            <td>${telefone.telefone}</td>
            <td>${telefone.obs || 'Sem observações'}</td>
            <td><button class="delete-btn" data-id="${telefone.telefone_id}">Deletar</button></td>
        `;
        tabela.appendChild(linha);
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const telefoneId = event.target.getAttribute('data-id');
            deletarTelefone(telefoneId);
        });
    });
});

function deletarTelefone(id) {
    fetch(`http://localhost:4000/telefones/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 200) {
            alert('Telefone deletado com sucesso');
            window.location.reload();
        } else {
            alert('Erro ao deletar telefone');
        }
    });
}
