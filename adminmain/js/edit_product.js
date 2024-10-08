async function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchProductDetails() {
    const productId = await getProductIdFromURL();
    
    if (!productId) {
        console.error('Product ID not provided in the URL.');
        return;
    }

    
        const response = await fetch(`php/get_product.php?id=${productId}`);
        const product = await response.json();

        ['nome', 'descricao', 'preco', 'estoque'].forEach(field => {
            document.getElementById(field).value = product[field];
        });
    
}

async function updateProduct() {
    const productId = await getProductIdFromURL();
    if (!productId) {
        console.error('Cannot update product without an ID.');
        return;
    }

    var form = document.getElementById('form');
    var dados = new FormData(form);
    dados.append('id', productId);

   
    const response = await fetch('php/edit_product.php', {
        method: 'POST',
        body: dados
    });

    const result = await response.json(); 
    var avisoContainer = document.querySelector('.aviso');
    var aviso = document.getElementById('aviso-text');
    var overlay = document.getElementById('all-content');
 
    aviso.textContent = result;
    overlay.style.opacity = "0.7";
    avisoContainer.style = "animation: aviso 0.5s ease-out forwards;"
    

}

var icon = document.getElementById('close-icon');
icon.addEventListener('click', () => {
    var overlay = document.getElementById('all-content');
    var avisoContainer = document.querySelector('.aviso');
    avisoContainer.style = "animation: none;"
    overlay.style.opacity = "1.0";
})

window.onload = fetchProductDetails;

