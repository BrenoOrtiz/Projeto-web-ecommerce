window.onload = async function fetchData() {
    try {
        const response = await fetch('product_maker.php', {
            method: 'GET',
        });

        const dados = await response.json();
        const container = document.getElementById('table-container');
        container.innerHTML = generateTable(dados);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function generateTable(products) {
    let tableHTML = `
        <table border="1">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    products.forEach(product => {
        tableHTML += `
            <tr>
                <td>${product.nome}</td>
                <td>${product.descricao}</td>
                <td>${product.preco}</td>
                <td>${product.estoque}</td>
                <td>
                    <button class="edit-button" data-id="${product.id}">Edit</button>
                    <button class="remove-button" data-id="${product.id}">Remove</button>
                </td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    return tableHTML;
}

