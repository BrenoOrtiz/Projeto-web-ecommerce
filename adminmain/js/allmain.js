// Função que abre e fecha a sidebar das paginas adminmain
function toggleSidebar() {
    var image = document.getElementById('menu-icon-content');
    var sidebar = document.getElementById('sidebar');

    sidebar.classList.toggle('closed');
    
    if (sidebar.classList.contains('closed')) {
        image.style.display = 'block';
    }
    else {
        image.style.display = 'none';
    }
    
}
// função que verifica se o usuário admin está autenticado
async function verificarAuth() {
    var promiseAuth = await fetch('php/verifyAuthAdm.php', {
        method: 'GET'
    })
    var authResponse = await promiseAuth.json();
    if (authResponse != "Autenticado") {
        window.location.href = 'loginAdm.html';
    }
}

verificarAuth();

// Função que desloga o usuário admin
async function deslogar() {
    await fetch('php/logoutAdm.php', {
        method: 'GET'
    })
    
    window.location.href = "../usermain/index.html";
}


