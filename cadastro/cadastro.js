async function calvo(){
    var formulario = document.getElementById("formdata");
    var dados = new FormData(formulario);
    await fetch('cadastro.php', {
        method: 'POST',
        body: dados
    });
}