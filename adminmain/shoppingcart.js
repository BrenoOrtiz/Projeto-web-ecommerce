let discountPercentage = 0;
let deliveryPrice = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    attachListeners(); 
});

function loadCart() {
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('container-povo');
    container.innerHTML = cartProducts.map(createCartItem).join('');

    updateTotalWithDelivery();
}

function attachListeners() {
    const deliveryDropdown = document.querySelector('.select');
    const couponButton = document.getElementById('coupon-button');

    deliveryDropdown.addEventListener('change', updateTotalWithDelivery);
    couponButton.addEventListener('click', applyCoupon);
}

function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value.trim();

    console.log('Entered Coupon Code:', couponCode);

    if (couponCode === 'BOAOJUICEBRABO10') {
        discountPercentage = 10; 
        updateTotalWithDelivery();
        alert('Coupon applied successfully!');
    } else {
        alert('Invalid coupon code. Please try again.');
    }

    couponInput.value = '';
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
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex" style="align-items: center;">
                <button class="btn btn-link px-2" onclick="adjustQuantity('${product.nome}', 'decrease')">
                    <i class="fas fa-minus"></i>
                </button>
                <span id="quantity-${product.nome}" class="product-quantity">${product.quantity || 1}</span>
                <button class="btn btn-link px-2" onclick="adjustQuantity('${product.nome}', 'increase')">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">€ ${product.preco}</h6>
            </div>
            <div class="icon">
                <a href="#!" onclick="event.preventDefault(); removeFromCart('${product.nome}');" class="text-muted"><i class="fas fa-times"></i></a>
            </div>
        </div>
    `;
}

function adjustQuantity(productNome, action) {
    const span = document.getElementById(`quantity-${productNome}`);
    const currentQuantity = parseInt(span.textContent);

    let newQuantity = (action === 'decrease') ? currentQuantity - 1 : currentQuantity + 1;
    if (newQuantity < 0) newQuantity = 0;

    span.textContent = newQuantity;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.map(product => {
        if (product.nome === productNome) {
            product.quantity = newQuantity;
        }
        return product;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
}

function removeFromCart(productNome) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(product => product.nome !== productNome);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
}

function updateTotalWithDelivery() {
    const selectElement = document.querySelector('.select');
    const selectedOption = selectElement.options[selectElement.selectedIndex].text;
    const deliveryPriceMatch = selectedOption.match(/€([\d,]+(\.\d{2})?)/);
     
    if (deliveryPriceMatch) {
        deliveryPrice = parseFloat(deliveryPriceMatch[1].replace(',', ''));
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((total, product) => total + parseFloat(product.preco) * (product.quantity || 1), deliveryPrice);

    const discountAmount = totalPrice * (discountPercentage / 100);
    totalPrice -= discountAmount;

    document.getElementById('discount-value').textContent = `€ ${discountAmount.toFixed(2)}`;
    document.getElementById('total-price').textContent = `€ ${totalPrice.toFixed(2)}`;
    document.getElementById('total-items').textContent = `items ${cart.reduce((sum, product) => sum + (product.quantity || 1), 0)}`;
    document.getElementById('item-count').textContent = `${cart.length} items`;  
}
