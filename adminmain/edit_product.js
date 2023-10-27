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

    try {
        const response = await fetch(`get_product.php?id=${productId}`);
        const product = await response.json();

        ['nome', 'descricao', 'preco', 'estoque'].forEach(field => {
            document.getElementById(field).value = product[field];
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

async function updateProduct() {
    const productId = await getProductIdFromURL();
    if (!productId) {
        console.error('Cannot update product without an ID.');
        return;
    }

    const updatedProduct = {
        id: productId,
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        preco: document.getElementById('preco').value,
        estoque: document.getElementById('estoque').value
    };

    try {
        const response = await fetch('edit_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        const result = await response.json();
        if (result.success) {
            alert('Product updated successfully!');
        } else {
            alert('Error updating product!');
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

window.onload = fetchProductDetails;

