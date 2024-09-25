window.onload = async function fetchData() {
    try {
        const response = await fetch('php/product_maker.php', {
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
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Imagem</th>
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
                <td>${product.imagem}</td>
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

function removeProduct(productId) {
    var avisoContainer = document.querySelector('.aviso');
    var aviso = document.getElementById('aviso-text');
    var overlay = document.getElementById('all-content');
    var confirmarBtn = document.getElementById('confirmar-btn');

    confirmarBtn.style.display = 'block';

    aviso.textContent = "Tem certeza que deseja remover o produto?";
    overlay.style.opacity = "0.7";
    avisoContainer.style = "animation: aviso 0.5s ease-out forwards;"

    var dados = new FormData();
    dados.append('id_produto', productId);

    confirmarBtn.addEventListener('click', async() => {
        const response = await fetch('php/delete_product.php', {
            method: 'POST',
            body: dados
            
        });
    
        const result = await response.json();
        aviso.textContent = result;
        confirmarBtn.style.display = 'none';
    })
    

        
}

async function editProduct(productId) {
    try {

        window.location.href = `edit_product.html?id=${productId}`;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

var icon = document.getElementById('close-icon');
icon.addEventListener('click', () => {
    var overlay = document.getElementById('all-content');
    var avisoContainer = document.querySelector('.aviso');
    avisoContainer.style = "animation: none;"
    overlay.style.opacity = "1.0";
    window.location.reload();
})



