function mostrarCarrinho() {
  var itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
  var lista = document.getElementById("lista-itens");
  var html = "";
  var total = 0;

  for (var i = 0; i < itens.length; i++) {
    total += itens[i].preco;
    html += `
      <div class="item">
        <div class="item-info">
          <h2>${itens[i].nome}</h2>
          <p class="item-variacao">${itens[i].variacao}</p>
          <button type="button" class="link" onclick="removerItem(${i})">Remover</button>
        </div>
        <div class="item-preco">
          <strong>R$ ${itens[i].preco.toFixed(2)}</strong>
        </div>
      </div>
    `;
  }

  if (itens.length == 0) {
    html = "<p>Seu carrinho está vazio.</p>";
  }

  lista.innerHTML = html;
  document.getElementById("qtd-itens").innerHTML = itens.length + " item(ns)";
  document.getElementById("valor-total").innerHTML = "R$ " + total.toFixed(2);
}

function removerItem(indice) {
  var itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
  itens.splice(indice, 1);
  localStorage.setItem("carrinho", JSON.stringify(itens));
  mostrarCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  mostrarCarrinho();
}

function finalizarCompra() {
  alert("Compra finalizada com sucesso!");
  limparCarrinho();
}

mostrarCarrinho();