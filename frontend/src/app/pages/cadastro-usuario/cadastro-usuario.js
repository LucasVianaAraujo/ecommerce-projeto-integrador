function cadastrar() {
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let confirma = document.getElementById("confirma-senha").value;

  if (nome == "" || email == "" || senha == "") {
    document.getElementById("mensagem").innerHTML = "Preencha todos os campos!";
    return false;
  }

  if (senha != confirma) {
    document.getElementById("mensagem").innerHTML = "As senhas não são iguais.";
    return false;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.push({ nome: nome, email: email, senha: senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  window.location.href = "../login/login.html";
  return false;
}