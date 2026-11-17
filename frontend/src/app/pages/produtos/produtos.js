let produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
let container = document.getElementById("lista-produtos");
let html = "";

for (let i = 0; i < produtos.length; i++) {
  html += `
    <a href="../exibir-produto/exibir-produto.html" class="Produto" onclick="selecionarProduto(${produtos[i].id})">
      <div class="ProdutoImagem"><img src="${produtos[i].imagem}" alt="${produtos[i].nome}" height="100"></div>
      <p>${produtos[i].nome}</p>
      <strong>R$ ${produtos[i].preco.toFixed(2)}</strong>
    </a>
  `;
}

container.innerHTML = html;

function selecionarProduto(id) {
  localStorage.setItem("produtoSelecionado", id);
}