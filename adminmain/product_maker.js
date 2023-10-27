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
                    <button class="edit-button" onclick="editProduct(${product.produto_id})">Edit</button>
                    <button class="remove-button" onclick="removeProduct(${product.produto_id})" data-id="${product.produto_id}">Remove</button>
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

async function removeProduct(productId) {
    const confirmDeletion = confirm('Are you sure you want to delete this product?');
    if (confirmDeletion) {
        const response = await fetch('delete_product.php', {
            method: 'POST',
            body: JSON.stringify({ action: 'delete', id: productId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            alert('Product deleted successfully!');
            fetchData();
        } else {
            alert('Error deleting product!');
        }
    }
}

async function editProduct(productId) {
    try {

        const response = await fetch(`get_product.php?id=${productId}`);
        const product = await response.json();
        window.location.href = `edit_product.html?id=${productId}`;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}


