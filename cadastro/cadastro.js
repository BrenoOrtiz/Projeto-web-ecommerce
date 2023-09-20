async function cadastrar() {
    // Validação dos dados antes de fazer o fetch
    var valid = true;
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var senha = document.getElementById('senha');
    var cpf = document.getElementById('cpf');

    const campos = [nome, email, senha, cpf];
    
    // verficando se todos os inputs foram preenchidos
    for (var i = 0; i < campos.length; i++) {
        if (campos[i].value == "") {
            var id_display_erro = campos[i].getAttribute('data-erro');
            var erro_display = document.getElementById(id_display_erro); 
            campos[i].style.outline = "1px solid red"
            erro_display.textContent = "Campo Vazio"
            erro_display.style.display = "inline";
            erro_display.style.animation = "erro 1.5s ease";
            valid = false;
            
        }
    }

    /*
    var formulario = document.getElementById("form");
    var dados = new FormData(formulario);
    await fetch('cadastro.php', {
        method: 'POST',
        body: dados
    });
    */
}

function update(input) { 
    // função que retira o display de erro de validação quando algo é digitado no input
    input.style.outline = "none";
    var id_display_erro = input.getAttribute('data-erro');
    var erro_display = document.getElementById(id_display_erro)
    erro_display.style.display = "none";
}