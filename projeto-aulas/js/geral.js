// =====================================================
// geral.js - comportamento do cabeçalho (todas as páginas)
// Conteúdo das aulas: addEventListener, eventos de mouse/foco,
// classList, window.location.href, reduce.
// =====================================================

var campoComFoco = false;

// Mostra a quantidade de itens do carrinho ao lado do link "Carrinho"
function atualizarContadorCarrinho() {
  var span = document.getElementById("contador-carrinho");
  if (span == null) {
    return;
  }
  var total = lerLista("carrinho").reduce((soma, item) => soma + item.quantidade, 0);
  span.innerHTML = total > 0 ? "(" + total + ")" : "";
}

// "Minha conta" leva ao perfil se houver usuário logado, senão ao login
function ajustarLinkConta() {
  var link = document.getElementById("link-conta");
  if (link != null && buscarUsuarioLogado() != null) {
    link.href = "perfil.html";
  }
}

// ----- barra de busca expansível -----
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

// Guarda o termo digitado e abre a página de produtos
function buscarProdutos() {
  var termo = document.getElementById("campo-busca").value.trim();
  localStorage.setItem("busca", termo);
  window.location.href = "produtos.html";
}

function iniciarCabecalho() {
  var container = document.getElementById("busca-container");
  var campo = document.getElementById("campo-busca");
  if (container == null || campo == null) {
    return;
  }
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
