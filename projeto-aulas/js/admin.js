function entrarAdmin() {
  try {
    var email = document.getElementById("email").value.trim();
    var senha = document.getElementById("senha").value.trim();
    if (email == "" || senha == "") {
      throw "Credenciais inválidas!";
    }
    localStorage.setItem("adminLogado", "true");
    window.location.href = "admin-produtos.html";
  } catch (erro) {
    alert(erro);
  }
  return false;
}

function verificarCamposAdmin() {
  var email = document.getElementById("email").value.trim();
  var senha = document.getElementById("senha").value.trim();
  document.getElementById("botao-entrar").disabled = email == "" || senha == "";
}

function sairAdmin() {
  localStorage.removeItem("adminLogado");
  window.location.href = "admin.html";
}

function protegerAdmin() {
  if (!adminLogado()) {
    window.location.href = "admin.html";
    return false;
  }
  return true;
}

function listarProdutosAdmin() {
  var corpo = document.getElementById("corpo-tabela");
  var produtos = lerLista("produtos");
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
    var restantes = lerLista("produtos").filter(p => p.id !== id);
    salvarLista("produtos", restantes);
    listarProdutosAdmin();
  }
}

function novoProduto() {
  localStorage.removeItem("produtoEditando");
  window.location.href = "admin-produto-form.html";
}

function editarProduto(id) {
  localStorage.setItem("produtoEditando", id);
  window.location.href = "admin-produto-form.html";
}

function carregarFormulario() {
  var id = localStorage.getItem("produtoEditando");
  if (id == null) {
    return;
  }
  var produto = lerLista("produtos").find(p => p.id === Number(id));
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

    var produtos = lerLista("produtos");
    var idEditando = localStorage.getItem("produtoEditando");

    if (idEditando != null) {
      var produto = produtos.find(p => p.id === Number(idEditando));
      produto.nome = nome;
      produto.marca = marca;
      produto.preco = preco;
      produto.descricao = descricao;
      salvarLista("produtos", produtos);
      localStorage.removeItem("produtoEditando");
    } else {
      var novoId = produtos.reduce((maior, p) => (p.id > maior ? p.id : maior), 0) + 1;
      produtos.push({ id: novoId, nome: nome, marca: marca, preco: preco, descricao: descricao });
      salvarLista("produtos", produtos);
      alert("Produto " + nome + " cadastrado com sucesso!");
    }
    window.location.href = "admin-produtos.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
}

function cancelarFormulario() {
  localStorage.removeItem("produtoEditando");
  window.location.href = "admin-produtos.html";
}

if (document.getElementById("corpo-tabela") != null) {
  if (protegerAdmin()) {
    listarProdutosAdmin();
  }
}

if (document.getElementById("titulo-form") != null) {
  if (protegerAdmin()) {
    carregarFormulario();
  }
}

if (document.getElementById("botao-entrar") != null) {
  if (adminLogado()) {
    window.location.href = "admin-produtos.html";
  }
  document.getElementById("email").addEventListener("input", verificarCamposAdmin);
  document.getElementById("senha").addEventListener("input", verificarCamposAdmin);
  verificarCamposAdmin();
}
