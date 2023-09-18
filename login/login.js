async function calvo(){
    var formulario = document.getElementById("formdata");
    var dados = new FormData(formulario);
    await fetch('login.php', {
        method: 'POST',
        body: dados
    });
}