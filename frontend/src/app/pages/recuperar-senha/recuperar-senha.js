function mostrarDica() {
  var email = document.getElementById("email").value.trim().toLowerCase();
  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  var usuario = usuarios.find(u => u.email === email);
  var texto = "";
  if (email == "") {
    texto = "Digite o e-mail para ver a dica.";
  } else if (usuario == undefined) {
    texto = "Nenhum cadastro encontrado para este e-mail.";
  } else if (usuario.dica == "") {
    texto = "Este usuário não cadastrou uma dica.";
  } else {
    texto = usuario.dica;
  }
  document.getElementById("dica-conteudo").innerHTML = texto;
}

function redefinirSenha() {
  try {
    var email = document.getElementById("email").value.trim().toLowerCase();
    var novaSenha = document.getElementById("nova-senha").value;
    var confirma = document.getElementById("confirma-nova-senha").value;

    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    var usuario = usuarios.find(u => u.email === email);
    if (usuario == undefined) {
      throw "Nenhum cadastro encontrado para este e-mail.";
    }
    if (novaSenha.length < 6) {
      throw "A senha deve ter pelo menos 6 caracteres.";
    }
    if (novaSenha !== confirma) {
      throw "As senhas não são iguais.";
    }
    usuario.senha = novaSenha;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Senha redefinida com sucesso!");
    window.location.href = "../login/login.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
  return false;
}

document.getElementById("email").addEventListener("input", mostrarDica);
mostrarDica();
