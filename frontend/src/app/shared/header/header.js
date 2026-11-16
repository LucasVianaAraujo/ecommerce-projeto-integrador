var campoComFoco = false;

function atualizarContadorCarrinho() {
  var span = document.getElementById("contador-carrinho");
  if (span == null) {
    return;
  }
  var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
  var total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  span.innerHTML = total > 0 ? "(" + total + ")" : "";
}

function ajustarLinkConta() {
  var link = document.getElementById("link-conta");
  if (link != null && buscarUsuarioLogado() != null) {
    link.href = "../pefil-user/pefil-user.html";
  }
}

function abrirBusca() {
  document.getElementById("busca-container").classList.add("open");
  document.getElementById("header-container").classList.add("search-active");
}

function fecharBusca() {
  var campo = document.getElementById("campo-busca");
  if (campoComFoco || campo.value.trim() !== "") {
    return;
  }
  document.getElementById("busca-container").classList.remove("open");
  document.getElementById("header-container").classList.remove("search-active");
}

function buscarProdutos() {
  var termo = document.getElementById("campo-busca").value.trim();
  localStorage.setItem("busca", termo);
  window.location.href = "../produtos/produtos.html";
}

function iniciarCabecalho() {
  var container = document.getElementById("busca-container");
  var campo = document.getElementById("campo-busca");
  container.addEventListener("mouseover", abrirBusca);
  container.addEventListener("mouseout", fecharBusca);
  campo.addEventListener("focus", function () {
    campoComFoco = true;
    abrirBusca();
  });
  campo.addEventListener("blur", function () {
    campoComFoco = false;
    fecharBusca();
  });
  campo.addEventListener("keydown", function (evento) {
    if (evento.key == "Enter") {
      buscarProdutos();
    }
  });
}

iniciarCabecalho();
atualizarContadorCarrinho();
ajustarLinkConta();
