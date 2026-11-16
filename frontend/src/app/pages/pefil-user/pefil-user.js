function sair() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "../login/login.html";
}

function salvarDica() {
  var usuario = buscarUsuarioLogado();
  var dica = document.getElementById("dica-recuperacao").value.trim();
  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.find(u => u.email === usuario.email).dica = dica;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarMensagem("mensagem-dica", "Dica guardada com sucesso!", "green");
}

function editarNome() {
  var usuario = buscarUsuarioLogado();
  var novoNome = prompt("Digite seu nome:", usuario.nome);
  if (novoNome == null || novoNome.trim() == "") {
    return;
  }
  var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  usuarios.find(u => u.email === usuario.email).nome = novoNome.trim();
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  document.getElementById("perfil-nome").innerHTML = novoNome.trim();
}

function cancelarPedido(id) {
  if (!confirm("Deseja realmente cancelar este pedido?")) {
    return;
  }
  var pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  pedidos.find(p => p.id === id).status = "Cancelado";
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  mostrarPedidos();
}

function mostrarPedidos() {
  var usuario = buscarUsuarioLogado();
  var lista = document.getElementById("lista-pedidos");
  var pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
  var meus = pedidos.filter(p => p.email === usuario.email);
  if (meus.length == 0) {
    lista.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>";
    return;
  }
  var html = "";
  meus.forEach(pedido => {
    var qtd = pedido.itens.reduce((soma, i) => soma + i.quantidade, 0);
    var botao = "";
    if (pedido.status == "Em andamento") {
      botao = `<button type="button" class="btn-cancelar-pedido" onclick="cancelarPedido(${pedido.id})">Cancelar Pedido</button>`;
    }
    html += `<div class="card-pedido">
      <div class="pedido-info">
        <strong>Pedido #${pedido.id}</strong> - ${qtd} ${qtd === 1 ? "item" : "itens"} - ${formatarPreco(pedido.total)}<br>
        Situação: ${pedido.status}
      </div>
      ${botao}
    </div>`;
  });
  lista.innerHTML = html;
}

var usuarioPerfil = buscarUsuarioLogado();
if (usuarioPerfil == null) {
  window.location.href = "../login/login.html";
} else {
  document.getElementById("perfil-nome").innerHTML = usuarioPerfil.nome;
  document.getElementById("perfil-email").innerHTML = usuarioPerfil.email;
  document.getElementById("dica-recuperacao").value = usuarioPerfil.dica;
  mostrarPedidos();
}
