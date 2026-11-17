var idSelecionado = localStorage.getItem("produtoSelecionado");
var produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
var produtoAtual = produtos[0];

for (var i = 0; i < produtos.length; i++) {
  if (produtos[i].id == idSelecionado) {
    produtoAtual = produtos[i];
  }
}

document.getElementById("nome-produto").innerHTML = produtoAtual.nome;
document.getElementById("preco-produto").innerHTML = "R$ " + produtoAtual.preco.toFixed(2);
document.getElementById("descricao-produto").innerHTML = produtoAtual.descricao;
document.getElementById("ImagemPrincipal").innerHTML = `<img src="${produtoAtual.imagem}" alt="${produtoAtual.nome}" height="250">`;

function escolherOpcao(elemento, classeGrupo) {
  var opcoes = document.getElementsByClassName(classeGrupo);
  for (var i = 0; i < opcoes.length; i++) {
    opcoes[i].classList.remove("selecionada");
  }
  elemento.classList.add("selecionada");
}

function adicionarAoCarrinho(irParaCarrinho) {
  var cor = document.querySelector(".OpcaoCor.selecionada").title;
  var tamanho = document.querySelector(".OpcaoTamanho.selecionada").title;

  var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

  carrinho.push({
    nome: produtoAtual.nome,
    preco: produtoAtual.preco,
    variacao: "Tam. " + tamanho + " · " + cor
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  document.getElementById("mensagem-produto").innerHTML = "Produto adicionado ao carrinho!";

  if (irParaCarrinho) {
    window.location.href = "../carrinho/carrinho.html";
  }
}