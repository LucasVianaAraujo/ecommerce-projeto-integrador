// =====================================================
// dados.js - funções de apoio usadas em todas as páginas
// Conteúdo das aulas usado aqui: localStorage, JSON.stringify,
// JSON.parse, arrays (find, filter, reduce), try/catch e throw.
// =====================================================

// Lê uma lista salva no localStorage (volta [] se ainda não existir)
function lerLista(chave) {
  var texto = localStorage.getItem(chave);
  if (texto == null) {
    return [];
  }
  return JSON.parse(texto);
}

// Salva uma lista no localStorage como texto (JSON)
function salvarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

// Transforma 230 em "R$ 230,00"
function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// Cria alguns produtos na primeira visita ao site
function criarProdutosIniciais() {
  if (localStorage.getItem("produtos") == null) {
    var iniciais = [
      { id: 1, nome: "Tênis Logus Preto", marca: "Logus", preco: 230, descricao: "Tênis preto" },
      { id: 2, nome: "Tênis Adidas", marca: "Adidas", preco: 250, descricao: "Tênis Adidas" },
      { id: 3, nome: "All Star Cano Alto", marca: "Converse", preco: 199.9, descricao: "Tênis casual de lona" },
      { id: 4, nome: "Tênis Esportivo Corrida", marca: "Nike", preco: 289.9, descricao: "Tênis leve para corrida" },
      { id: 5, nome: "Tênis Casual Urbano", marca: "Vans", preco: 189.9, descricao: "Tênis casual para o dia a dia" },
      { id: 6, nome: "Tênis Infantil Colorido", marca: "Kidy", preco: 119.9, descricao: "Tênis infantil confortável" }
    ];
    salvarLista("produtos", iniciais);
  }
}

criarProdutosIniciais();

// Valida e-mail com a regra mostrada na aula (@ e ponto) - lança erro se inválido
function validarEmail(email) {
  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
    throw "Digite um e-mail válido!";
  }
}

// Tira os acentos e deixa em minúsculas (para a busca achar "tenis" em "Tênis")
function semAcento(texto) {
  var comAcento = "áàâãäéèêëíìîïóòôõöúùûüç";
  var semAcentos = "aaaaaeeeeiiiiooooouuuuc";
  var resultado = "";
  texto = texto.toLowerCase();
  for (var i = 0; i < texto.length; i++) {
    var posicao = comAcento.indexOf(texto.charAt(i));
    resultado += posicao >= 0 ? semAcentos.charAt(posicao) : texto.charAt(i);
  }
  return resultado;
}

// Devolve o usuário logado (objeto) ou null
function buscarUsuarioLogado() {
  var email = localStorage.getItem("usuarioLogado");
  if (email == null) {
    return null;
  }
  var usuario = lerLista("usuarios").find(u => u.email === email);
  if (usuario == undefined) {
    return null;
  }
  return usuario;
}

function adminLogado() {
  return localStorage.getItem("adminLogado") === "true";
}

// Escreve uma mensagem (erro ou sucesso) em um elemento da página
function mostrarMensagem(id, texto, cor) {
  var elemento = document.getElementById(id);
  if (elemento != null) {
    elemento.style.color = cor;
    elemento.innerHTML = texto;
  }
}

// Mostra/oculta a senha de um campo (botão do "olho")
function alternarSenha(idCampo, botao) {
  var campo = document.getElementById(idCampo);
  if (campo.type == "password") {
    campo.type = "text";
    botao.innerHTML = "Ocultar";
  } else {
    campo.type = "password";
    botao.innerHTML = "Mostrar";
  }
}
