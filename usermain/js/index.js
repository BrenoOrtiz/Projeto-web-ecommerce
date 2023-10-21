window.onload = async function () {
    
    function createProductCard(product) {
        return `
        <div class="card" data-nome="${product.nome}" data-imagem="${product.imagem}" data-descricao="${product.descricao}" data-preco="${product.preco}">
            <div class="card-img">
                <img src="${product.imagem}" alt="${product.nome}" height="100%" width="100%">
            </div>
            <div class="card-info">
                <p class="text-title">${product.nome}</p>
                <p class="text-body">${product.descricao}</p>
            </div>
            <hr>
            <div class="card-footer">
                <span class="text-title">$${product.preco}</span>
                <div class="card-button">    
                <svg class="svg-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" data-href="shoppingcart.html">
                </g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Shopping_Cart_01"> <path id="Vector" d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z" stroke="#1565C0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                </div>
            </div>
        </div>
    `;
    }
    
    function addToCart(productElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            nome: productElement.getAttribute('data-nome'),
            imagem: productElement.getAttribute('data-imagem'),
            descricao: productElement.getAttribute('data-descricao'),
            preco: productElement.getAttribute('data-preco')
        });
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Redirect to the shopping cart page
        window.location.href = "shoppingcart.html";
    }

    var response = await fetch('php/index.php', {
        method: 'GET',
    });
    
    var dados = await response.json();
    var container = document.getElementById('card-container');
    
    dados.forEach((dado) => {
        var conteudo = createProductCard(dado);
        container.innerHTML += conteudo;
    });
    
    
    
    var search_input = document.getElementById('search-input');
    search_input.addEventListener('input', async () => {

        var produtosBuscados = dados.filter(produto => produto.nome.toLowerCase().includes(search_input.value.toLowerCase()));

        const container = document.getElementById('card-container');
        container.innerHTML = ``;
        console.log(produtosBuscados)

        if (!produtosBuscados.length) {
            container.innerHTML = `<h2 id="aviso">Produto <span id="aviso-keyword">"${search_input.value}"</span> não encontrado</h2>`;
        }
        else {
            produtosBuscados.forEach((produto) => {
                const conteudo = createProductCard(produto);
                container.innerHTML += conteudo;
                
            })
        }

    })
    
    
    

    // Attach the event listener to SVG icons directly
    const svgButtons = document.querySelectorAll('.svg-icon');
        
    svgButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Get product data from the grandparent (the card)
            addToCart(button.parentNode.parentNode.parentNode);
        });
    });




}