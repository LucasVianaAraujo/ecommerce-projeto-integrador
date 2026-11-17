function entrarAdmin() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  if (email == "admin@oldshoes.com" && senha == "1234") {
    window.location.href = "../admin-produtos-lista/produtos-lista.html";
  } else {
    alert("Login ou senha inválidos! Use admin@oldshoes.com e 1234");
  }

  return false;
}