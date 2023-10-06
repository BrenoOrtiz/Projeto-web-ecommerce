async function autenticar(){
    var formulario = document.getElementById("formdata");
    var dados = new FormData(formulario);
    var promise = await fetch('php/login.php', {
        method: 'POST',
        body: dados
    });

    var response = await promise.json();  // De acordo com response mostrar mensagem de autenticação
    
}