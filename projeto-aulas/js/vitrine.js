// =====================================================
// vitrine.js - Home, Produtos, Categorias e Detalhe do produto
// Conteúdo das aulas: DOM (getElementById, innerHTML, style),
// template literals, for, sort/filter/find com arrow function,
// localStorage, fetch + then/catch (ViaCEP), try/catch/throw.
// =====================================================

var produtoAtual = null;

// ---------- cartões de produto ----------
function criarCartaoProduto(produto) {
  return `<a href="exibir-produto.html" class="Produto" onclick="selecionarProduto(${produto.id})">
    <div class="ProdutoImagem"><img src="images/all-star.jpg" alt="${produto.nome}" height="100"></div>
    <p>${produto.nome}</p>
    <strong>${formatarPreco(produto.preco)}</strong>
  </a>`;
}

// Guarda qual produto foi clicado (a página de detalhe lê esse valor)
function selecionarProduto(id) {
  localStorage.setItem("produtoSelecionado", id);
}

// ---------- HOME ----------
function mostrarProdutosEmAlta() {
  var container = document.getElementById("lista-produtos");
  var produtos = lerLista("produtos");
  if (produtos.length == 0) {
    container.innerHTML = "<p>Nenhum produto cadastrado ainda.</p>";
    return;
  }
  var html = "";
  for (var i = 0; i < produtos.length && i < 12; i++) {
    html += criarCartaoProduto(produtos[i]);
  }
  container.innerHTML = html;
}

// Newsletter: valida o e-mail e guarda na lista "newsletter"
function assinarNewsletter() {
  var campo = document.getElementById("email-newsletter");
  try {
    var email = campo.value.trim();
    validarEmail(email);
    var lista = lerLista("newsletter");
    if (lista.some(e => e === email.toLowerCase())) {
      throw "Este e-mail já está cadastrado.";
    }
    lista.push(email.toLowerCase());
    salvarLista("newsletter", lista);
    campo.value = "";
    mostrarMensagem("mensagem-newsletter", "Obrigado! Você receberá nossas novidades.", "green");
  } catch (erro) {
    mostrarMensagem("mensagem-newsletter", erro, "red");
  }
}

// ---------- PRODUTOS ----------
var termoBusca = "";

function aplicarFiltros() {
  var container = document.getElementById("lista-produtos");
  var ordem = document.getElementById("ordenacao").value;

  // filtra pelo termo (nome, marca ou descrição)
  var lista = lerLista("produtos").filter(p =>
    semAcento(p.nome + " " + p.marca + " " + p.descricao).indexOf(semAcento(termoBusca)) >= 0
  );

  // ordena
  var textoOrdem = "";
  if (ordem == "barato") {
    lista.sort((a, b) => a.preco - b.preco);
    textoOrdem = "Mais barato";
  } else if (ordem == "caro") {
    lista.sort((a, b) => b.preco - a.preco);
    textoOrdem = "Mais caro";
  } else if (ordem == "nome") {
    lista.sort((a, b) => (a.nome > b.nome ? 1 : -1));
    textoOrdem = "Nome (A-Z)";
  }

  // título da página
  var titulo = document.getElementById("titulo-produtos");
  if (termoBusca != "") {
    titulo.innerHTML = `Resultados para "${termoBusca}" (${lista.length})`;
  } else {
    titulo.innerHTML = `Todos os produtos (${lista.length})`;
  }

  // etiqueta do filtro ativo
  var filtroAtivo = document.getElementById("filtro-ativo");
  if (textoOrdem != "") {
    filtroAtivo.innerHTML = `<button type="button" onclick="limparOrdenacao()">× ${textoOrdem}</button>`;
  } else {
    filtroAtivo.innerHTML = "";
  }

  // lista
  if (lista.length == 0) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }
  var html = "";
  lista.forEach(produto => {
    html += criarCartaoProduto(produto);
  });
  container.innerHTML = html;
}

function limparOrdenacao() {
  document.getElementById("ordenacao").value = "";
  aplicarFiltros();
}

// ---------- CATEGORIAS ----------
function abrirCategoria() {
  localStorage.setItem("busca", "");
}

// ---------- DETALHE DO PRODUTO ----------
function carregarProduto() {
  var id = Number(localStorage.getItem("produtoSelecionado"));
  produtoAtual = lerLista("produtos").find(p => p.id === id);
  if (produtoAtual == undefined) {
    document.getElementById("Produto").innerHTML =
      '<p>Produto não encontrado. <a href="produtos.html">Ver produtos</a></p>';
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

// Marca uma opção (cor ou tamanho) e desmarca as outras do mesmo grupo
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
    var carrinho = lerLista("carrinho");
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
    salvarLista("carrinho", carrinho);
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
    window.location.href = "carrinho.html";
  }
}

// Checkbox "Calcular frete" mostra/esconde o campo de CEP
function alternarFrete() {
  var marcado = document.getElementById("marcar-frete").checked;
  document.getElementById("AreaFrete").style.display = marcado ? "block" : "none";
}

// Consulta o CEP na API ViaCEP (fetch + promises, como na aula)
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

// ---------- inicialização (só roda o que existir na página) ----------
function iniciarVitrine() {
  var temLista = document.getElementById("lista-produtos") != null;

  if (temLista && document.getElementById("ordenacao") != null) {
    // página Produtos: lê a busca feita no cabeçalho uma única vez
    var buscaSalva = localStorage.getItem("busca");
    if (buscaSalva != null) {
      termoBusca = buscaSalva;
      localStorage.removeItem("busca");
    }
    aplicarFiltros();
  } else if (temLista) {
    mostrarProdutosEmAlta();
  }

  if (document.getElementById("nome-produto") != null) {
    carregarProduto();
  }
}

iniciarVitrine();
