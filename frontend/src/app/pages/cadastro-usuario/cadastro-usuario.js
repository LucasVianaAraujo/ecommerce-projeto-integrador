function cadastrar() {
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;
  var confirma = document.getElementById("confirma-senha").value;

  if (nome == "" || email == "" || senha == "") {
    document.getElementById("mensagem").innerHTML = "Preencha todos os campos!";
    return false;
  }

  if (senha != confirma) {
    document.getElementById("mensagem").innerHTML = "As senhas não são iguais.";
    return false;
  }

  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push({ nome: nome, email: email, senha: senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "../login/login.html";
  return false;
}