async function autenticar(){
    var formulario = document.getElementById("formdata");
    var dados = new FormData(formulario);
    var promise = await fetch('php/login.php', {
        method: 'POST',
        body: dados
    });

    var response = await promise.json();  // De acordo com response mostrar mensagem de autenticação
    var mensagem_erro = document.getElementById('mensagem-erro');
    var form_container = document.getElementById('form-container');

    if (response == 'Autenticado') { 
        window.location.href = '../usermain/index.html';
    }
    else {
        mensagem_erro.textContent = response;
        mensagem_erro.style.color = "#FF6347";
        form_container.style.outline = "solid 1px #ff6347"; 
    }

}