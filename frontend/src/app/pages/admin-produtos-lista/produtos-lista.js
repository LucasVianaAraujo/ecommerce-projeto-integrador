function listarProdutosAdmin() {
  var corpo = document.getElementById("corpo-tabela");
  var produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

  if (produtos.length == 0) {
    corpo.innerHTML = '<tr><td colspan="5">Nenhum produto cadastrado.</td></tr>';
    return;
  }

  var html = "";
  for (var i = 0; i < produtos.length; i++) {
    html += `
      <tr>
        <td>${produtos[i].id}</td>
        <td>${produtos[i].nome}</td>
        <td>${produtos[i].descricao}</td>
        <td>R$ ${produtos[i].preco.toFixed(2)}</td>
        <td class="acoes">
          <button type="button" class="botao-excluir" onclick="excluirProduto(${i})">Excluir</button>
        </td>
      </tr>
    `;
  }

  corpo.innerHTML = html;
}

function excluirProduto(indice) {
  var produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
  produtos.splice(indice, 1);
  localStorage.setItem("produtos", JSON.stringify(produtos));
  listarProdutosAdmin();
}

function sairAdmin() {
  window.location.href = "../admin/admin.html";
}

listarProdutosAdmin();

function novoProduto() {
  window.location.href = "../cadastro-tenis/cadastro-tenis.html";
}