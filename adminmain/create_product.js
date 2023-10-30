async function create() {
    var form = document.getElementById('form');
    var dados = new FormData(form);

    var avisoContainer = document.querySelector('.aviso');
    var aviso = document.getElementById('aviso-text');
    var overlay = document.getElementById('all-content');

    var promise = await fetch('create_product.php', {
        method: 'POST',
        body: dados
    })

    var response = await promise.json();

    aviso.textContent = response;
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