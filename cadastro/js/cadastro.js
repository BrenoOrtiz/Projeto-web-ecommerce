async function cadastrar() {
    // Validação dos dados antes de fazer o fetch
    var isvalid = true;
    var inputs = document.querySelectorAll('input');

    // Validando se campos estão vazios
    inputs.forEach((input) => {
        input.value = input.value.trimStart()
        if (input.value.length == 0) {
            isvalid = false;
        }
    })

    if (isvalid) {
        // Validando campo nome
        var inputNome = inputs[0];
        var regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;  // Expressão regular que representa um padrão nome(letras A-Z e a-z com acento e espaço)
        if (!regexNome.test(inputNome.value)) {
            var erro = document.getElementById("erro-nome");
            erro.style.display = "inline";
            erro.textContent = "Este campo não pode conter números ou caracteres especiais(@!#)"
            erro.style.animation = "erro 1s ease"
            inputNome.style.outline = "1px solid #FF6347";
            isvalid = false;
        }
        // Removendo espaços no fim da string e duplos ou maiores no campo nome
        inputNome.value = inputNome.value.replace(/ +/g, " ");
        inputNome.value = inputNome.value.trimEnd();

        //Validando campo email
        var inputEmail = inputs[1];
        var regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,4}$/;  // Expressão regular que representa padrão email(example@email.com)
        if (!regexEmail.test(inputEmail.value)) {
            var erro = document.getElementById("erro-email");
            erro.style.display = "inline";
            erro.textContent = "Endereço de email inválido"
            erro.style.animation = "erro 1s ease"
            inputEmail.style.outline = "1px solid #FF6347";
            isvalid = false;
        }
        // Removendo os espaços no fim do campo email
        inputEmail.value = inputEmail.value.trimEnd();
        
        //Validando campo senha
        var inputSenha = inputs[2];
        var regexSenha = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;  // Expressão regular que representa padrão senha(pelo menos uma letra maiúscula e minuscula e mínimo de 8 caracteres)
        if (!regexSenha.test(inputSenha.value)) {
            var erro = document.getElementById("erro-senha");
            erro.style.display = "inline";
            erro.textContent = "Este campo deve conter mínimo de 8 caracteres e letra maiúscula"
            erro.style.animation = "erro 1s ease"
            inputSenha.style.outline = "1px solid #FF6347";
            isvalid = false;
        }
        // Removendo os espaços no fim do campo senha
        inputSenha.value = inputSenha.value.trimEnd();

        // Validando campo CPF
        var inputCPF = inputs[3];
        var regexCPF = /^[0-9]{11}$/; 
        if (!regexCPF.test(inputCPF.value)) {
            var erro = document.getElementById("erro-cpf");
            erro.style.display = "inline";
            erro.textContent = "Este CPF é inválido"
            erro.style.animation = "erro 1s ease"
            inputCPF.style.outline = "1px solid #FF6347";
            isvalid = false;
        }
    } else {
        var mensagem_erro = document.getElementById('mensagem-erro');
        mensagem_erro.style.display = "inline";
        mensagem_erro.style.animation = "erro 1s ease";
        mensagem_erro.textContent = "O formulário não pode ser enviado. Por favor, preencha todos os campos obrigatórios."
    }
    
    // Caso campos estejam validados realizar o fetch
    if (isvalid) {
        var formulario = document.getElementById("form");
        var dados = new FormData(formulario);
        var promise = await fetch('php/cadastro.php', {
            method: 'POST',
            body: dados
        });

        var response = await promise.json();
        if (response == "Os Dados foram inseridos com sucesso") {
            // Realizando login automaticamente se usuário realizou cadastro corretamente
            await fetch('../login/php/login.php', {
                method: 'POST',
                body: dados
            })
            window.location.href = "../usermain/index.html";
        } else {
            // Mensagem erro quando email ou cpf ja estão cadastrados
            var mensagem_erro = document.getElementById('mensagem-erro');
            mensagem_erro.style.display = "inline";
            mensagem_erro.style.animation = "erro 1s ease";
            mensagem_erro.textContent = response;
            
        }

    }
       
}

function update(input) { 
    // função que retira o display de erro de validação quando algo é digitado no input
    input.style.outline = "none";
    var id_display_erro = input.getAttribute('data-erro');
    document.querySelector('.form-container').style.outline = "none";
    document.getElementById('mensagem-erro').style.display = "none";
    document.getElementById(id_display_erro).style.display = "none";
      
}
