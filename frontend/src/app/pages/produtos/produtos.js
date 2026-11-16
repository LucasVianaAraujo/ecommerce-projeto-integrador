var termoBusca = "";

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

function semAcento(texto) {
  var comAcento = "áàâãäéèêëíìîïóòôõöúùûüç";
  var semAcentos = "aaaaaeeeeiiiiooooouuuuc";
  var resultado = "";
  texto = texto.toLowerCase();
  for (var i = 0; i < texto.length; i++) {
    var posicao = comAcento.indexOf(texto.charAt(i));
    resultado += posicao >= 0 ? semAcentos.charAt(posicao) : texto.charAt(i);
  }
  return resultado;
}

function aplicarFiltros() {
  var container = document.getElementById("lista-produtos");
  var ordem = document.getElementById("ordenacao").value;

  var lista = produtoService.listar().filter(p =>
    semAcento(p.nome + " " + p.marca + " " + p.descricao).indexOf(semAcento(termoBusca)) >= 0
  );

  var textoOrdem = "";
  if (ordem == "barato") {
    lista.sort((a, b) => a.preco - b.preco);
    textoOrdem = "Mais barato";
  } else if (ordem == "caro") {
    lista.sort((a, b) => b.preco - a.preco);
    textoOrdem = "Mais caro";
  } else if (ordem == "nome") {
    lista.sort((a, b) => (a.nome > b.nome ? 1 : -1));
    textoOrdem = "Nome (A-Z)";
  }

  var titulo = document.getElementById("titulo-produtos");
  if (termoBusca != "") {
    titulo.innerHTML = `Resultados para "${termoBusca}" (${lista.length})`;
  } else {
    titulo.innerHTML = `Todos os produtos (${lista.length})`;
  }

  var filtroAtivo = document.getElementById("filtro-ativo");
  if (textoOrdem != "") {
    filtroAtivo.innerHTML = `<button type="button" onclick="limparOrdenacao()">× ${textoOrdem}</button>`;
  } else {
    filtroAtivo.innerHTML = "";
  }

  if (lista.length == 0) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }
  var html = "";
  lista.forEach(produto => {
    html += criarCartaoProduto(produto);
  });
  container.innerHTML = html;
}

function limparOrdenacao() {
  document.getElementById("ordenacao").value = "";
  aplicarFiltros();
}

var buscaSalva = localStorage.getItem("busca");
if (buscaSalva != null) {
  termoBusca = buscaSalva;
  localStorage.removeItem("busca");
}
aplicarFiltros();
