// =====================================================
// carrinho.js - página do carrinho
// Conteúdo das aulas: localStorage + JSON, reduce/map/filter/forEach,
// template literals, innerHTML, splice, confirm/alert, objetos.
// =====================================================

var FRETE_GRATIS_A_PARTIR_DE = 200;
var VALOR_FRETE = 19.9;
var CUPONS = { BEMVINDO10: 0.1, PROMO20: 0.2 };
var CORES_MINIATURA = ["#2f3e46", "#c9b79c", "#52796f", "#8d5a44", "#4a5d7a"];

var erroCupom = "";

function lerCarrinho() {
  return lerLista("carrinho");
}

function lerCupom() {
  return localStorage.getItem("cupom");
}

// ---------- cálculos ----------
function calcularSubtotal(itens) {
  return itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

function calcularDesconto(subtotal) {
  var cupom = lerCupom();
  if (cupom == null) {
    return 0;
  }
  return subtotal * CUPONS[cupom];
}

function calcularFrete(itens, subtotal, desconto) {
  if (itens.length == 0) {
    return 0;
  }
  return subtotal - desconto >= FRETE_GRATIS_A_PARTIR_DE ? 0 : VALOR_FRETE;
}

// ---------- ações ----------
function alterarQuantidade(indice, delta) {
  var itens = lerCarrinho();
  var novaQuantidade = itens[indice].quantidade + delta;
  if (novaQuantidade < 1) {
    novaQuantidade = 1;
  }
  if (novaQuantidade > 99) {
    novaQuantidade = 99;
  }
  itens[indice].quantidade = novaQuantidade;
  salvarLista("carrinho", itens);
  mostrarCarrinho();
}

function removerItem(indice) {
  var itens = lerCarrinho();
  itens.splice(indice, 1);
  salvarLista("carrinho", itens);
  mostrarCarrinho();
}

function limparCarrinho() {
  if (confirm("Deseja esvaziar o carrinho?")) {
    localStorage.removeItem("carrinho");
    localStorage.removeItem("cupom");
    mostrarCarrinho();
  }
}

function aplicarCupom() {
  var codigo = document.getElementById("cupom").value.trim().toUpperCase();
  if (codigo == "") {
    erroCupom = "Digite um código de cupom.";
  } else if (CUPONS[codigo] == undefined) {
    erroCupom = "Cupom inválido.";
  } else {
    localStorage.setItem("cupom", codigo);
    erroCupom = "";
  }
  mostrarCarrinho();
}

function removerCupom() {
  localStorage.removeItem("cupom");
  erroCupom = "";
  mostrarCarrinho();
}

// Finaliza: gera um pedido, guarda no localStorage e esvazia o carrinho
function finalizarCompra() {
  var usuario = buscarUsuarioLogado();
  if (usuario == null) {
    alert("Faça login para finalizar a compra.");
    window.location.href = "login.html";
    return;
  }
  var itens = lerCarrinho();
  var subtotal = calcularSubtotal(itens);
  var desconto = calcularDesconto(subtotal);
  var total = subtotal - desconto + calcularFrete(itens, subtotal, desconto);

  var pedidos = lerLista("pedidos");
  var novoId = pedidos.reduce((maior, p) => (p.id > maior ? p.id : maior), 0) + 1;
  pedidos.push({
    id: novoId,
    email: usuario.email,
    itens: itens,
    total: total,
    status: "Em andamento"
  });
  salvarLista("pedidos", pedidos);

  localStorage.removeItem("carrinho");
  localStorage.removeItem("cupom");
  alert("Compra finalizada! Pedido #" + novoId + " criado.");
  window.location.href = "perfil.html";
}

// ---------- desenho da página ----------
function criarLinhaItem(item, indice) {
  var cor = CORES_MINIATURA[indice % CORES_MINIATURA.length];
  var precoCada = "";
  if (item.quantidade > 1) {
    precoCada = `<small>${formatarPreco(item.preco)} cada</small>`;
  }
  return `<div class="item">
    <div class="item-miniatura" style="background-color: ${cor}">${item.nome.charAt(0)}</div>
    <div class="item-info">
      <h2>${item.nome}</h2>
      <p class="item-variacao">${item.variacao}</p>
      <button type="button" class="link" onclick="removerItem(${indice})">Remover</button>
    </div>
    <div class="quantidade">
      <button type="button" onclick="alterarQuantidade(${indice}, -1)">−</button>
      <span>${item.quantidade}</span>
      <button type="button" onclick="alterarQuantidade(${indice}, 1)">+</button>
    </div>
    <div class="item-preco">
      <strong>${formatarPreco(item.preco * item.quantidade)}</strong>
      ${precoCada}
    </div>
  </div>`;
}

function mostrarCarrinho() {
  var conteudo = document.getElementById("carrinho-conteudo");
  var itens = lerCarrinho();
  atualizarContadorCarrinho();

  if (itens.length == 0) {
    conteudo.innerHTML = `<div class="vazio">
      <h2>Seu carrinho está vazio</h2>
      <p>Adicione produtos para ver o resumo do pedido aqui.</p>
      <a class="botao botao-principal" href="produtos.html">Continuar comprando</a>
    </div>`;
    return;
  }

  var totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0);
  var subtotal = calcularSubtotal(itens);
  var desconto = calcularDesconto(subtotal);
  var frete = calcularFrete(itens, subtotal, desconto);
  var total = subtotal - desconto + frete;
  var baseFrete = subtotal - desconto;
  var falta = Math.max(0, FRETE_GRATIS_A_PARTIR_DE - baseFrete);
  var progresso = Math.min(100, (baseFrete / FRETE_GRATIS_A_PARTIR_DE) * 100);

  var linhas = "";
  itens.forEach((item, indice) => {
    linhas += criarLinhaItem(item, indice);
  });

  var textoFrete = "";
  if (falta > 0) {
    textoFrete = `<p>Faltam <strong>${formatarPreco(falta)}</strong> para o frete grátis.</p>`;
  } else {
    textoFrete = "<p><strong>Você ganhou frete grátis.</strong></p>";
  }

  var blocoCupom = "";
  var cupom = lerCupom();
  if (cupom != null) {
    blocoCupom = `<div class="cupom-aplicado">
      <span>${cupom} aplicado</span>
      <button type="button" class="link" onclick="removerCupom()">Remover</button>
    </div>`;
  } else {
    blocoCupom = `<div class="cupom-linha">
      <input type="text" id="cupom" placeholder="Ex.: BEMVINDO10">
      <button type="button" class="botao" onclick="aplicarCupom()">Aplicar</button>
    </div>`;
    if (erroCupom != "") {
      blocoCupom += `<p class="cupom-erro">${erroCupom}</p>`;
    }
  }

  var linhaDesconto = "";
  if (desconto > 0) {
    linhaDesconto = `<div class="totais-desconto"><dt>Desconto</dt><dd>− ${formatarPreco(desconto)}</dd></div>`;
  }

  conteudo.innerHTML = `<div class="carrinho-cabecalho">
      <h1>Seu carrinho</h1>
      <p>${totalItens} ${totalItens === 1 ? "item" : "itens"}</p>
    </div>
    <div class="carrinho-layout">
      <div class="itens">
        ${linhas}
        <button type="button" class="link link-cinza" onclick="limparCarrinho()">Esvaziar carrinho</button>
      </div>
      <div class="resumo">
        <h2>Resumo do pedido</h2>
        <div class="frete">
          ${textoFrete}
          <div class="progresso"><span style="width: ${progresso}%"></span></div>
        </div>
        <div class="cupom">
          <label for="cupom">Cupom de desconto</label>
          ${blocoCupom}
        </div>
        <dl class="totais">
          <div><dt>Subtotal</dt><dd>${formatarPreco(subtotal)}</dd></div>
          ${linhaDesconto}
          <div><dt>Frete</dt><dd>${frete === 0 ? "Grátis" : formatarPreco(frete)}</dd></div>
          <div class="totais-total"><dt>Total</dt><dd>${formatarPreco(total)}</dd></div>
        </dl>
        <button type="button" class="botao botao-principal botao-bloco" onclick="finalizarCompra()">Finalizar compra</button>
        <a class="resumo-voltar" href="produtos.html">Continuar comprando</a>
      </div>
    </div>`;
}

if (document.getElementById("carrinho-conteudo") != null) {
  mostrarCarrinho();
}
