function criarCartaoProduto(produto) {
  return `<a href="../exibir-produto/exibir-produto.html" class="Produto" onclick="selecionarProduto(${produto.id})">
    <div class="ProdutoImagem"><img src="../../../../public/images/all-star.jpg" alt="${produto.nome}" height="100"></div>
    <p>${produto.nome}</p>
    <strong>${formatarPreco(produto.preco)}</strong>
  </a>`;
}

function selecionarProduto(id) {
  localStorage.setItem("produtoSelecionado", id);
}

function mostrarProdutosEmAlta() {
  var container = document.getElementById("lista-produtos");
  var produtos = produtoService.listar();
  if (produtos.length == 0) {
    container.innerHTML = "<p>Nenhum produto cadastrado ainda.</p>";
    return;
  }
  var html = "";
  for (var i = 0; i < produtos.length && i < 12; i++) {
    html += criarCartaoProduto(produtos[i]);
  }
  container.innerHTML = html;
}

function assinarNewsletter() {
  var campo = document.getElementById("email-newsletter");
  try {
    var email = campo.value.trim();
    validarEmail(email);
    var lista = JSON.parse(localStorage.getItem("newsletter") || "[]");
    if (lista.some(e => e === email.toLowerCase())) {
      throw "Este e-mail já está cadastrado.";
    }
    lista.push(email.toLowerCase());
    localStorage.setItem("newsletter", JSON.stringify(lista));
    campo.value = "";
    mostrarMensagem("mensagem-newsletter", "Obrigado! Você receberá nossas novidades.", "green");
  } catch (erro) {
    mostrarMensagem("mensagem-newsletter", erro, "red");
  }
}

mostrarProdutosEmAlta();
