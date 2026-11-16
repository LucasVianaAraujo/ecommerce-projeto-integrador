function entrarAdmin() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;
  if (loginAdmin(email, senha)) {
    window.location.href = "../admin-produtos-lista/produtos-lista.html";
  } else {
    alert("Credenciais inválidas!");
  }
  return false;
}

function verificarCamposAdmin() {
  var email = document.getElementById("email").value.trim();
  var senha = document.getElementById("senha").value.trim();
  document.getElementById("botao-entrar").disabled = email == "" || senha == "";
}

if (adminLogado()) {
  window.location.href = "../admin-produtos-lista/produtos-lista.html";
}
document.getElementById("email").addEventListener("input", verificarCamposAdmin);
document.getElementById("senha").addEventListener("input", verificarCamposAdmin);
verificarCamposAdmin();
