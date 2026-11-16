function loginAdmin(email, senha) {
  if (email.trim() !== "" && senha.trim() !== "") {
    localStorage.setItem("adminLogado", "true");
    return true;
  }
  return false;
}

function logoutAdmin() {
  localStorage.removeItem("adminLogado");
}

function adminLogado() {
  return localStorage.getItem("adminLogado") === "true";
}

function buscarUsuarioLogado() {
  var email = localStorage.getItem("usuarioLogado");
  if (email == null) {
    return null;
  }
  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  var usuario = usuarios.find(u => u.email === email);
  if (usuario == undefined) {
    return null;
  }
  return usuario;
}

function validarEmail(email) {
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
    throw "Digite um e-mail válido!";
  }
}

function mostrarMensagem(id, texto, cor) {
  var elemento = document.getElementById(id);
  if (elemento != null) {
    elemento.style.color = cor;
    elemento.innerHTML = texto;
  }
}

function alternarSenha(idCampo, botao) {
  var campo = document.getElementById(idCampo);
  if (campo.type == "password") {
    campo.type = "text";
    botao.innerHTML = "Ocultar";
  } else {
    campo.type = "password";
    botao.innerHTML = "Mostrar";
  }
}
