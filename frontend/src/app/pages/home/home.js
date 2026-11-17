let produtos = [
  { 
    id: 1, 
    nome: "Tênis Converse All Star", 
    preco: 219.90, 
    descricao: "Marca: Converse | Cabedal em lona de algodão resistente, palmilha macia e solado de borracha vulcanizada antiderrapante.", 
    imagem: "../../../../public/images/all-star.jpg" 
  },
  { 
    id: 2, 
    nome: "Tênis Nike Revolution Branco", 
    preco: 299.90, 
    descricao: "Marca: Nike | Cabedal em mesh respirável, entressola em espuma macia para amortecimento leve em corridas e caminhadas.", 
    imagem: "https://imgcentauro-a.akamaihd.net/1024x1024/99599631A20.jpg" 
  },
  { 
    id: 3, 
    nome: "Tênis Ecko Skate Urbano", 
    preco: 249.90, 
    descricao: "Marca: Ecko | Acabamento reforçado, lingueta acolchoada e solado caixa alta em borracha natural com alta aderência.", 
    imagem: "https://imgcentauro-a.akamaihd.net/1024x1024/9972VG41A3.jpg" 
  },
  { 
    id: 4, 
    nome: "Tênis New Balance 520v9", 
    preco: 329.90, 
    descricao: "Marca: New Balance | Tecido knit respirável que evita superaquecimento, leveza extrema e amortecimento para treinos diários.", 
    imagem: "https://tfdfjz.vtexassets.com/arquivos/ids/371835/tenis-esportivo-new-balance-feminino-520v9-preto-520v9-1.jpg?v=639072015197630000" 
  }
];

localStorage.setItem("produtos", JSON.stringify(produtos));

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