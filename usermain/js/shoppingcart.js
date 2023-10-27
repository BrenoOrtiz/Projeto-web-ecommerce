
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
            <div class="log-out-container" id="log-out">
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

    var logout = document.getElementById('log-out');
    logout.addEventListener('click', async () => {
        
        var promiseLogout = await fetch('php/logoutUser.php', {
            method: 'GET'
        }) 

        var responseLogout = await promiseLogout.json();
        window.location.href = "../login/login.html";
    })
    

    var promiseProdutos = await fetch('php/shoppingCart.php', {
        method: 'GET'
    })

    var responseProdutos = await promiseProdutos.json();

    function renderProduct(product) {
        return `<div class="produto-container">
                    <div class="select-container">
                        <div class="checkbox">
                            <input class="checkbox-inputs All-checkbox" type="checkbox" name="${product.nome}" data-id="${product.produto_id}">
                            <span class="checkmark"></span>
                        </div>
                        <label for="${product.nome}">Selecionar produto</label>
                    </div>
                    <div class="produto">
                        <img src="" alt="" class="img-produto" height="200px" width="250px">
                        <div class="info-produto">
                            <p class="descricao">${product.descricao}</p>
                            <span class="nome-produto">${product.nome}</span>
                            <div class="details-container">
                                <h3>R$${product.preco}</h3>
                                <div class="contador-container">
                                    <i class="fa-solid fa-trash-can"></i>
                                    <div class="contador">
                                        <i class="fa-solid fa-minus minus-plus"></i>
                                        <input type="number" name="quantidade" class="qntd-produto" value="${product.qntd_produto}" 
                                        data-estoque="${product.estoque}" readonly>
                                        <i class="fa-solid fa-plus minus-plus"></i>
                                    </div>
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


    var Allcheckboxes = document.querySelectorAll('.All-checkbox');
    var productCheckboxes = document.querySelectorAll('.checkbox-inputs');
    var selectAllinput = document.getElementById('inpt-select-all');


    function selectAllProducts() {
        if (selectAllinput.checked) {
            productCheckboxes.forEach((checkbox) => {
                checkbox.checked = true;
            })
        } else {
            productCheckboxes.forEach((checkbox) => {
                checkbox.checked = false;
            })
        }
    }

    selectAllProducts();

    selectAllinput.addEventListener('click', selectAllProducts)
    
    
    var itensSelecionados = document.getElementById('selected-items');
    var valorTotalContainer = document.getElementById('total-value');
    var quantidadeInputs = document.querySelectorAll('.qntd-produto');
    var cuponBtn = document.querySelector('.button-cupon');
    
    function RenderCompraDetails() {
        
        itensSelecionados.innerHTML = ``;
        var valorTotal = 0.00;
        var isallSelected = true;
        var amountSelected = 0;
        
        for (var i = 0; i < productCheckboxes.length; i++) {
            if (productCheckboxes[i].checked) {
                var id_produto = productCheckboxes[i].getAttribute('data-id');
                var produto = responseProdutos.find(produto => produto.produto_id === id_produto);
                var quantidade = quantidadeInputs[i].value
                var preco = produto.preco * quantidade

                itensSelecionados.innerHTML += `<div class="item"><p>X${quantidade} ${produto.nome}</p> <span>R$${preco}</span></div>`
                valorTotal += parseFloat(preco);
            }
            else {
                isallSelected = false;
                amountSelected++;
            }

        }

        if (amountSelected == productCheckboxes.length) {
            itensSelecionados.innerHTML = `<p>Nenhum produto Selecionado</p>`
        }

        selectAllinput.checked = isallSelected;

        if (cuponBtn.textContent == "Cupom aplicado") {
            valorTotal = (valorTotal - (valorTotal / 15)).toFixed(2);
            valorTotalContainer.textContent = 'R$' + valorTotal;
        } else {
            valorTotalContainer.textContent = 'R$' + valorTotal.toFixed(2);
            
        }
    }

    RenderCompraDetails();

    Allcheckboxes.forEach(checkbox => {checkbox.addEventListener("click", RenderCompraDetails)})
    
                
    const addbuttons = document.querySelectorAll('.fa-plus');
    const minusbuttons = document.querySelectorAll('.fa-minus');
    var qntdProdutoInput = document.querySelectorAll('.qntd-produto');
    
    addbuttons.forEach((button, i) => {
        button.addEventListener('click', function increment() {
            const qntdMax = qntdProdutoInput[i].getAttribute('data-estoque');
            if (parseInt(qntdProdutoInput[i].value) < parseInt(qntdMax)) {
                qntdProdutoInput[i].value = parseInt(qntdProdutoInput[i].value) + 1;
                RenderCompraDetails();
            }
        });
    });
    
    minusbuttons.forEach((button, i) => {
        button.addEventListener('click', function decrement() {
            if (parseInt(qntdProdutoInput[i].value) > 1) {
                qntdProdutoInput[i].value = parseInt(qntdProdutoInput[i].value) - 1;
                RenderCompraDetails();
            }
        
        });
    });

    cuponBtn.addEventListener('click', () => {

        var cupomInput = document.getElementById('promotionCodeInput');
        var discountText = document.getElementById('discount-text');
        var aviso = document.getElementById('aviso-cupom');

        var code = cupomInput.value.toUpperCase().trim()
        if (code === "BOAOJUICE" || code === "BRENOSUPER") {
            var valor = parseFloat(valorTotalContainer.textContent.slice(2));
            valor = (valor - (valor / 15)).toFixed(2);
            valorTotalContainer.textContent = "R$" + valor;
            discountText.style.display = "inline"
            cuponBtn.textContent = "Cupom aplicado";
            cupomInput.value = "";
            aviso.style.display = "none";
        }
        else if (!(cuponBtn.textContent == "Cupom aplicado")){
            aviso.textContent = "Código para cupom inválido!"
            aviso.style.display = "inline";
        }
    })

})


