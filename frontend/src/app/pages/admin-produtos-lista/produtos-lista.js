function listarProdutosAdmin() {
  var corpo = document.getElementById("corpo-tabela");
  var produtos = produtoService.listar();
  if (produtos.length == 0) {
    corpo.innerHTML = '<tr><td colspan="5">Nenhum produto cadastrado.</td></tr>';
    return;
  }
  var html = "";
  produtos.forEach(produto => {
    html += `<tr>
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>${produto.marca}</td>
      <td>${formatarPreco(produto.preco)}</td>
      <td class="acoes">
        <button type="button" class="botao-editar" onclick="editarProduto(${produto.id})">Editar</button>
        <button type="button" class="botao-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
      </td>
    </tr>`;
  });
  corpo.innerHTML = html;
}

function excluirProduto(id) {
  if (confirm("Deseja realmente excluir o produto?")) {
    produtoService.excluir(id);
    listarProdutosAdmin();
  }
}

function novoProduto() {
  localStorage.removeItem("produtoEditando");
  window.location.href = "../cadastro-tenis/cadastro-tenis.html";
}

function editarProduto(id) {
  localStorage.setItem("produtoEditando", id);
  window.location.href = "../cadastro-tenis/cadastro-tenis.html";
}

function sairAdmin() {
  logoutAdmin();
  window.location.href = "../admin/admin.html";
}

if (!adminLogado()) {
  window.location.href = "../admin/admin.html";
} else {
  listarProdutosAdmin();
}
