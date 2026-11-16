function entrar() {
  try {
    var email = document.getElementById("email").value.trim().toLowerCase();
    var senha = document.getElementById("senha").value;
    if (email == "" || senha == "") {
      throw "Preencha o e-mail e a senha.";
    }
    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    var usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario == undefined) {
      throw "E-mail ou senha incorretos.";
    }
    localStorage.setItem("usuarioLogado", usuario.email);
    window.location.href = "../pefil-user/pefil-user.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
  return false;
}
