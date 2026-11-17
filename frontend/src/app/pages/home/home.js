var produtos = [
  { id: 1, nome: "Tênis All Star Clássico", preco: 199.90, descricao: "Tênis casual de lona super confortável." },
  { id: 2, nome: "Tênis Esportivo Run", preco: 249.90, descricao: "Ideal para corridas e caminhadas diárias." },
  { id: 3, nome: "Tênis Urbano Preto", preco: 229.90, descricao: "Design moderno para o dia a dia." },
  { id: 4, nome: "Tênis Skate Street", preco: 279.90, descricao: "Solado reforçado e alta durabilidade." }
];

if (localStorage.getItem("produtos") == null) {
  localStorage.setItem("produtos", JSON.stringify(produtos));
} else {
  produtos = JSON.parse(localStorage.getItem("produtos"));
}

var container = document.getElementById("lista-produtos");
var html = "";

for (var i = 0; i < produtos.length; i++) {
  html += `
    <a href="../exibir-produto/exibir-produto.html" class="Produto" onclick="selecionarProduto(${produtos[i].id})">
      <div class="ProdutoImagem"><img src="../../../../public/images/all-star.jpg" alt="${produtos[i].nome}" height="100"></div>
      <p>${produtos[i].nome}</p>
      <strong>R$ ${produtos[i].preco.toFixed(2)}</strong>
    </a>
  `;
}

container.innerHTML = html;

function selecionarProduto(id) {
  localStorage.setItem("produtoSelecionado", id);
}