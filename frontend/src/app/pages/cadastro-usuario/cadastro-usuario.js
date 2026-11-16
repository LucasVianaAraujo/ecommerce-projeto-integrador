function cadastrar() {
  try {
    var nome = document.getElementById("nome").value.trim();
    var email = document.getElementById("email").value.trim().toLowerCase();
    var senha = document.getElementById("senha").value;
    var confirma = document.getElementById("confirma-senha").value;

    if (nome == "") {
      throw "O nome deve ser preenchido!";
    }
    validarEmail(email);
    if (senha.length < 6) {
      throw "A senha deve ter pelo menos 6 caracteres.";
    }
    if (senha !== confirma) {
      throw "As senhas não são iguais.";
    }

    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.some(u => u.email === email)) {
      throw "Já existe uma conta com este e-mail.";
    }
    usuarios.push({ nome: nome, email: email, senha: senha, dica: "" });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso! Faça seu login.");
    window.location.href = "../login/login.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
  return false;
}
