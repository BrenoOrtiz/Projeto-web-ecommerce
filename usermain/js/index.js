window.onload = async function () {
    
    function createProductCard(product) {
        return `
        <div class="card">
                <div class="card-img">
                    <img src="../img/${product.imagem}" alt="${product.nome}/img" height="100%" width="100%">
                </div>
                <div class="card-info">
                    <p class="text-title">${product.nome}</p>
                    <p class="text-body">${product.descricao}</p>
                    <span class="text-title">$${product.preco}</span>
                </div>
                <hr>
                <div class="card-footer">
                    <div class="card-button" data-produtoID="${product.produto_id}">
                        <span>Adicionar ao carrinho</span>
                    </div>
                </div>
            </div>
    `;
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

    
    function addEventCart(){
        const cartButtons = document.querySelectorAll('.card-button');
        
        cartButtons.forEach((button) => {
            button.addEventListener('click', async function addToCart() {
                var product_id = button.getAttribute('data-produtoID');
                

                const dados = new FormData();
                dados.append('id', product_id);

                var promise = await fetch('php/addToCart.php', {
                    method: 'POST',
                    body: dados
            
                })

                var response = await promise.json();
            
                var avisoContainer = document.querySelector('.aviso');
                var aviso_link = document.getElementById('aviso-link');
                var aviso = document.getElementById('aviso-text');
                var overlay = document.getElementById('all-content');

                if (response == "Produto inserido no carrinho com sucesso!") {
                    aviso_link.textContent = "Ir ao Carrinho";
                    aviso_link.href = "shoppingcart.html"
                }
                else {
                    aviso_link.textContent = "Login";
                    aviso_link.href = "../login/login.html";
                }
                overlay.style.opacity = "0.7";
                aviso.textContent = response;
                avisoContainer.style = "animation: aviso 0.5s ease-out forwards;"
            });
        });
    }
    
    addEventCart();
    
    var icon = document.getElementById('close-icon');
    icon.addEventListener('click', () => {
        var overlay = document.getElementById('all-content');
        var avisoContainer = document.querySelector('.aviso');
        avisoContainer.style = "animation: none;"
        overlay.style.opacity = "1.0";
    })


    var search_input = document.getElementById('search-input');
    search_input.addEventListener('input', function busca(){

        var produtosBuscados = dados.filter(produto => produto.nome.toLowerCase().includes(search_input.value.toLowerCase()));
        
        var container = document.getElementById('card-container');
        container.innerHTML = ``;
        
        if (!produtosBuscados.length) {
            container.innerHTML = `<h2 id="aviso">Produto <span id="aviso-keyword">"${search_input.value}"</span> não encontrado</h2>`;
        }
        else {
            produtosBuscados.forEach((produto) => {
                var conteudo = createProductCard(produto);
                container.innerHTML += conteudo;
                
            })
            // Readicionar eventos para o card
            addEventCart();
        }
        

    })


    var promiseUserData = await fetch('php/mostrarUser.php', {
        method: 'GET',
    });

    var responseUserData = await promiseUserData.json();
    var nav = document.querySelector('.nav-links');
    if (responseUserData == 'Não Autenticado') {
        // Implementação usuário não autenticado
        nav.innerHTML = `
        <div id="icon-menu-container">
            <i class="fa-solid fa-bars fa-2xl"></i>
        </div>
        <div id="menu-links">
            <a href="../cadastro/cadastro.html" id="link-cadastro">Cadastro</a>
            <a href="../login/login.html" id="link-login">Login</a>
        </div>
        `;

        // Implementação abrir fechar menu-links
        var iconMenu = document.getElementById("icon-menu-container");
        var icon = document.querySelector('.fa-bars');
        iconMenu.addEventListener('click', () => {
            var menulinks = document.getElementById("menu-links");
            if (menulinks.style.display == "") {
                menulinks.style.display = "flex"
                icon.style.color = "var(--primary-200)";
                
            }
            else {
                menulinks.style.display = ""
                icon.style.color = "var(--primary-300)";

            }
            
        })

    }
    else {
        // Implementação caso usuário esteja autenticado
        nav.innerHTML = `
        <div class="icon-container">
        <i class="fa-regular fa-circle-user fa-2xl"></i>
        </div>
        <div id="menu-user">
        <span id="nome">${responseUserData.nome}</span>
        <span id="email">${responseUserData.email}</span>
        <hr id="user-menu-divider">
        <div class="carrinho-container" id="carrinho-container">
                <i class="fa-solid fa-cart-shopping fa-lg"></i>
                <span id="carrinho-link">Seu carrinho</span>
            </div>
            <div class="log-out-container" id="log-out">
                <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
                <span id="sair">Sair</span>
            </div>
        </div>
        `;
        // Implementação abrir fechar menu-user
        var iconUser = document.querySelector('.icon-container');
        var icon = document.querySelector('.fa-circle-user');
        iconUser.addEventListener('click', () => {
            var menu = document.getElementById("menu-user");
            if (menu.style.display == "") {
                menu.style.display = "flex"
                icon.style.color = "var(--primary-200)";
            }
            else {
                menu.style.display = ""
                icon.style.color = "var(--primary-300)";
            }
            
        })

        // Implementação ir ao carrinho
        var carrinhoContainer = document.getElementById('carrinho-container');
        carrinhoContainer.addEventListener('click', () => {
            window.location.href = "shoppingcart.html";
         })

        // Implementação Logout do usuário
        var logout = document.getElementById('log-out');
        logout.addEventListener('click', async () => {
            await fetch('php/logoutUser.php', {
                method: 'GET'
            })
            location.reload();
        })
    }




    
    
}