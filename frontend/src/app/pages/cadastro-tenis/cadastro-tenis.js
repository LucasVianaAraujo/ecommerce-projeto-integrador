function carregarFormulario() {
  var id = localStorage.getItem("produtoEditando");
  if (id == null) {
    return;
  }
  var produto = produtoService.buscarPorId(Number(id));
  if (produto == undefined) {
    alert("Produto não encontrado.");
    localStorage.removeItem("produtoEditando");
    return;
  }
  document.getElementById("titulo-form").innerHTML = "Editar Produto";
  document.getElementById("nome").value = produto.nome;
  document.getElementById("marca").value = produto.marca;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("descricao").value = produto.descricao;
}

function salvarProduto() {
  try {
    var nome = document.getElementById("nome").value.trim();
    var marca = document.getElementById("marca").value.trim();
    var preco = parseFloat(document.getElementById("preco").value.replace(",", "."));
    var descricao = document.getElementById("descricao").value.trim();

    if (nome == "") {
      throw "O nome do produto deve ser preenchido!";
    }
    if (marca == "") {
      throw "A marca deve ser preenchida!";
    }
    if (isNaN(preco) || preco <= 0) {
      throw "Digite um preço válido (maior que zero).";
    }

    var produto = { nome: nome, marca: marca, preco: preco, descricao: descricao };
    var idEditando = localStorage.getItem("produtoEditando");

    if (idEditando != null) {
      produto.id = Number(idEditando);
      produtoService.editar(produto);
      localStorage.removeItem("produtoEditando");
    } else {
      produtoService.incluir(produto);
      alert("Produto " + nome + " cadastrado com sucesso!");
    }
    window.location.href = "../admin-produtos-lista/produtos-lista.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
}

function cancelarFormulario() {
  localStorage.removeItem("produtoEditando");
  window.location.href = "../admin-produtos-lista/produtos-lista.html";
}

if (!adminLogado()) {
  window.location.href = "../admin/admin.html";
} else {
  carregarFormulario();
}
