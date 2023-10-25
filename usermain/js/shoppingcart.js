
document.addEventListener('DOMContentLoaded', async function () {

    var promiseUserData = await fetch('php/mostrarUser.php', {
        method: 'GET',
    });

    var responseUserData = await promiseUserData.json();
    var nav = document.querySelector('.nav-links');
    if (responseUserData == 'Não Autenticado') {
        window.location.href = "../login/login.html";
    }
    else {
        nav.innerHTML = `
        <div class="icon-container">
        <i class="fa-regular fa-circle-user fa-2xl"></i>
        </div>
        <div id="menu-user">
            <span id="nome">${responseUserData.nome}</span>
            <span id="email">${responseUserData.email}</span>
            <hr id="user-menu-divider">
            <div class="log-out-container">
                <i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
                <span id="sair">Sair</span>
            </div>
        </div>
        `;
    }

    var iconUser = document.querySelector('.icon-container');
    iconUser.addEventListener('click', () => {
        var menu = document.getElementById("menu-user");
        if (menu.style.display == "") {
            menu.style.display = "flex"
        }
        else {
            menu.style.display = ""
        }
        
    })
    

    var promiseProdutos = await fetch('php/shoppingCart.php', {
        method: 'GET'
    })

    var responseProdutos = await promiseProdutos.json();
    console.log(responseProdutos)

    function renderProduct(product) {
        return `<div class="produto-container">
                    <div class="select-container">
                        <input type="checkbox" name="" class="checkbox" data-id="${product.produto_id}">
                        <label for="">Selecionar produto</label>
                    </div>
                    <div class="produto">
                        <img src="" alt="" class="img-produto" height="200px" width="250px">
                        <div class="info-produto">
                            <p class="descricao">${product.descricao}</p>
                            <span class="nome-produto">${product.nome}</span>
                            <div class="details-container">
                                <h3>R$${product.preco}</h3>
                                <div class="contador">
                                    <i class="fa-solid fa-trash-can"></i>
                                    <i class="fa-solid fa-minus"></i>
                                    <input type="number" name="quantidade" class="qntd-produto" value="${product.qntd_produto}">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>`;
    }

    var container = document.getElementById('products-container');

    responseProdutos.forEach(produto => {
        var conteudo = renderProduct(produto);
        container.innerHTML += conteudo;
    });


    var qntdProdutosContainer = document.getElementById('qntd-produtos');
    qntdProdutosContainer.textContent = responseProdutos.length;

})


