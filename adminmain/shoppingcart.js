document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    attachInputListeners();
});

function loadCart() {
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('container-povo');
    container.innerHTML = '';

    let totalPrice = 0;

    cartProducts.forEach((product) => {
        totalPrice += parseFloat(product.preco) * (product.quantity || 1);
        const productElement = createCartItem(product);
        container.innerHTML += productElement;
    });

    // Update total price and item count
    updateTotalPrice();
    document.getElementById('total-items').textContent = `items ${cartProducts.length}`;
}

function createCartItem(product) {
    return `
        <div class="row mb-4 d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${product.imagem}" class="img-fluid rounded-3" alt="${product.nome}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted">${product.nome}</h6>
                <h6 class="text-black mb-0">${product.descricao}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                </button>
                <input id="form1" data-nome="${product.nome}" data-preco="${product.preco}" min="0" name="quantity" value="${product.quantity || 1}" type="number" class="form-control form-control-sm" />
                <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">€ ${product.preco}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
            </div>
        </div>
    `;
}

function attachInputListeners() {
    const quantityInputs = document.querySelectorAll('input[name="quantity"]');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productNome = input.getAttribute('data-nome');
            const productPrice = parseFloat(input.getAttribute('data-preco'));
            const quantity = parseInt(input.value);

            // Update the local storage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = cart.map(product => {
                if (product.nome === productNome) {
                    product.quantity = quantity;
                }
                return product;
            });
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Update the displayed total price
            updateTotalPrice();
        });
    });
}


function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
    let totalItems = 0; 
    
    cart.forEach(product => {
        const productQuantity = product.quantity || 1;
        totalPrice += parseFloat(product.preco) * productQuantity;
        totalItems += productQuantity;
    });

    // Update the displayed total price and item count
    document.getElementById('total-price').textContent = `€ ${totalPrice.toFixed(2)}`;
    document.getElementById('total-items').textContent = `items ${totalItems}`;
    document.getElementById('item-count').textContent = `${cart.length} items`;  
}

