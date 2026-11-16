var produtosIniciais = [
  { id: 1, nome: "Tênis Logus Preto", marca: "Logus", preco: 230, descricao: "Tênis preto" },
  { id: 2, nome: "Tênis Adidas", marca: "Adidas", preco: 250, descricao: "Tênis Adidas" },
  { id: 3, nome: "All Star Cano Alto", marca: "Converse", preco: 199.9, descricao: "Tênis casual de lona" },
  { id: 4, nome: "Tênis Esportivo Corrida", marca: "Nike", preco: 289.9, descricao: "Tênis leve para corrida" },
  { id: 5, nome: "Tênis Casual Urbano", marca: "Vans", preco: 189.9, descricao: "Tênis casual para o dia a dia" },
  { id: 6, nome: "Tênis Infantil Colorido", marca: "Kidy", preco: 119.9, descricao: "Tênis infantil confortável" }
];

function salvarProdutos(lista) {
  localStorage.setItem("produtos", JSON.stringify(lista));
}

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

var produtoService = {
  listar: function () {
    if (localStorage.getItem("produtos") == null) {
      salvarProdutos(produtosIniciais);
    }
    return JSON.parse(localStorage.getItem("produtos"));
  },

  incluir: function (produto) {
    var lista = produtoService.listar();
    produto.id = lista.reduce((maior, p) => (p.id > maior ? p.id : maior), 0) + 1;
    lista.push(produto);
    salvarProdutos(lista);
    return produto;
  },

  excluir: function (id) {
    salvarProdutos(produtoService.listar().filter(p => p.id !== id));
  },

  buscarPorId: function (id) {
    return produtoService.listar().find(p => p.id === id);
  },

  editar: function (produto) {
    var lista = produtoService.listar();
    var original = lista.find(p => p.id === produto.id);
    original.nome = produto.nome;
    original.marca = produto.marca;
    original.preco = produto.preco;
    original.descricao = produto.descricao;
    salvarProdutos(lista);
    return original;
  }
};
