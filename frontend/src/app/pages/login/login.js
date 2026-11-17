function entrar() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  if (email == "" || senha == "") {
    document.getElementById("mensagem").innerHTML = "Preencha o e-mail e a senha.";
    return false;
  }

  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email == email && usuarios[i].senha == senha) {
      localStorage.setItem("usuarioLogado", usuarios[i].nome);
      alert("Login realizado! Bem-vindo, " + usuarios[i].nome);
      window.location.href = "../home/home.html";
      return false;
    }
  }

  document.getElementById("mensagem").innerHTML = "E-mail ou senha incorretos.";
  return false;
}