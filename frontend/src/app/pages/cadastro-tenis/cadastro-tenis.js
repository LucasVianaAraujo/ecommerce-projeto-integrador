function salvarProduto() {
  var nome = document.getElementById("nome").value;
  var preco = Number(document.getElementById("preco").value);
  var descricao = document.getElementById("descricao").value;

  if (nome == "" || preco <= 0 || descricao == "") {
    document.getElementById("mensagem").innerHTML = "Preencha todos os campos corretamente!";
    return;
  }

  var produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

  var novoProduto = {
    id: produtos.length + 1,
    nome: nome,
    preco: preco,
    descricao: descricao
  };

  produtos.push(novoProduto);
  localStorage.setItem("produtos", JSON.stringify(produtos));

  alert("Produto cadastrado com sucesso!");
  window.location.href = "../admin-produtos-lista/produtos-lista.html";
}

function cancelarFormulario() {
  window.location.href = "../admin-produtos-lista/produtos-lista.html";
}