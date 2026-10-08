export class Produto {
  constructor(
    public id: number,
    public modelo: string,
    public marca: string,
    public preco: number,
    public descricao: string,
  ) {
 
    this.preco = Math.round(preco * 100) / 100;
  }

  precoFormatado() {
    return this.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }


  static calcularTotal(produtos: Produto[]) {
    let total = 0;
    for (const produto of produtos) {
      total += produto.preco;
    }
    return Math.round(total * 100) / 100;
  }
}

const produtosSalvos = JSON.parse(localStorage.getItem('produtos') || '[]');

export const listaProdutos: Produto[] = produtosSalvos.map(
  (p: Produto) => new Produto(p.id, p.modelo, p.marca, p.preco, p.descricao),
);

function salvar() {
  localStorage.setItem('produtos', JSON.stringify(listaProdutos));
}

export function buscarProduto(id: number) {
  return listaProdutos.find((produto) => produto.id === id);
}

export function cadastrarProduto(modelo: string, marca: string, preco: number, descricao: string) {
  let id = 1;
  if (listaProdutos.length > 0) {
    id = listaProdutos[listaProdutos.length - 1].id + 1;
  }
  listaProdutos.push(new Produto(id, modelo, marca, preco, descricao));
  salvar();
}

export function editarProduto(id: number, modelo: string, marca: string, preco: number, descricao: string) {
  const posicao = listaProdutos.findIndex((produto) => produto.id === id);
  if (posicao >= 0) {
    listaProdutos[posicao] = new Produto(id, modelo, marca, preco, descricao);
    salvar();
  }
}

export function excluirProduto(id: number) {
  const posicao = listaProdutos.findIndex((produto) => produto.id === id);
  if (posicao >= 0) {
    listaProdutos.splice(posicao, 1);
    salvar();
  }
}
