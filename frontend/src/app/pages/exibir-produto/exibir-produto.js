var produtoAtual = null;

function carregarProduto() {
  var id = Number(localStorage.getItem("produtoSelecionado"));
  produtoAtual = produtoService.buscarPorId(id);
  if (produtoAtual == undefined) {
    document.getElementById("Produto").innerHTML =
      '<p>Produto não encontrado. <a href="../produtos/produtos.html">Ver produtos</a></p>';
    return;
  }
  document.title = produtoAtual.nome + " - OldShoes";
  document.getElementById("nome-produto").innerHTML = produtoAtual.nome;
  document.getElementById("preco-produto").innerHTML = formatarPreco(produtoAtual.preco);
  document.getElementById("parcelas-produto").innerHTML =
    "Ou 3x de " + formatarPreco(produtoAtual.preco / 3);
  document.getElementById("descricao-produto").innerHTML =
    produtoAtual.marca + " - " + produtoAtual.descricao;
}

function escolherOpcao(elemento, classeGrupo) {
  var opcoes = document.getElementsByClassName(classeGrupo);
  for (var i = 0; i < opcoes.length; i++) {
    opcoes[i].classList.remove("selecionada");
  }
  elemento.classList.add("selecionada");
}

function lerOpcaoSelecionada(classeGrupo) {
  var opcoes = document.getElementsByClassName(classeGrupo);
  for (var i = 0; i < opcoes.length; i++) {
    if (opcoes[i].className.indexOf("selecionada") >= 0) {
      return opcoes[i].title;
    }
  }
  throw "Escolha a cor e o tamanho.";
}

function adicionarAoCarrinho() {
  try {
    var cor = lerOpcaoSelecionada("OpcaoCor");
    var tamanho = lerOpcaoSelecionada("OpcaoTamanho");
    var variacao = "Tam. " + tamanho + " · " + cor;
    var carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    var existente = carrinho.find(i => i.id === produtoAtual.id && i.variacao === variacao);
    if (existente != undefined) {
      existente.quantidade = existente.quantidade + 1;
    } else {
      carrinho.push({
        id: produtoAtual.id,
        nome: produtoAtual.nome,
        variacao: variacao,
        preco: produtoAtual.preco,
        quantidade: 1
      });
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
    mostrarMensagem("mensagem-produto", "Produto adicionado ao carrinho!", "green");
    return true;
  } catch (erro) {
    mostrarMensagem("mensagem-produto", erro, "red");
    return false;
  }
}

function comprarAgora() {
  if (adicionarAoCarrinho()) {
    window.location.href = "../carrinho/carrinho.html";
  }
}

function alternarFrete() {
  var marcado = document.getElementById("marcar-frete").checked;
  document.getElementById("AreaFrete").style.display = marcado ? "block" : "none";
}

function consultarCep() {
  var cep = document.getElementById("campo-cep").value.trim().replace("-", "");
  if (cep.length != 8 || isNaN(cep)) {
    mostrarMensagem("resultado-frete", "Digite um CEP com 8 números.", "red");
    return;
  }
  mostrarMensagem("resultado-frete", "Consultando...", "black");
  fetch("https://viacep.com.br/ws/" + cep + "/json/")
    .then(response => response.json())
    .then(dados => {
      if (dados.erro) {
        mostrarMensagem("resultado-frete", "CEP não encontrado.", "red");
      } else {
        mostrarMensagem(
          "resultado-frete",
          `Entrega para ${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}. Frete grátis acima de R$ 200,00.`,
          "black"
        );
      }
    })
    .catch(erro => {
      mostrarMensagem("resultado-frete", "Não foi possível consultar o CEP.", "red");
    });
}

carregarProduto();
