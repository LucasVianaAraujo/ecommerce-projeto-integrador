function entrar() {
  try {
    var email = document.getElementById("email").value.trim().toLowerCase();
    var senha = document.getElementById("senha").value;
    if (email == "" || senha == "") {
      throw "Preencha o e-mail e a senha.";
    }
    var usuario = lerLista("usuarios").find(u => u.email === email && u.senha === senha);
    if (usuario == undefined) {
      throw "E-mail ou senha incorretos.";
    }
    localStorage.setItem("usuarioLogado", usuario.email);
    window.location.href = "perfil.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
  return false;
}

function cadastrar() {
  try {
    var nome = document.getElementById("nome").value.trim();
    var email = document.getElementById("email").value.trim().toLowerCase();
    var senha = document.getElementById("senha").value;
    var confirma = document.getElementById("confirma-senha").value;

    if (nome == "") {
      throw "O nome deve ser preenchido!";
    }
    validarEmail(email);
    if (senha.length < 6) {
      throw "A senha deve ter pelo menos 6 caracteres.";
    }
    if (senha !== confirma) {
      throw "As senhas não são iguais.";
    }

    var usuarios = lerLista("usuarios");
    if (usuarios.some(u => u.email === email)) {
      throw "Já existe uma conta com este e-mail.";
    }
    usuarios.push({ nome: nome, email: email, senha: senha, dica: "" });
    salvarLista("usuarios", usuarios);

    alert("Cadastro realizado com sucesso! Faça seu login.");
    window.location.href = "login.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
  return false;
}

function mostrarDica() {
  var email = document.getElementById("email").value.trim().toLowerCase();
  var usuario = lerLista("usuarios").find(u => u.email === email);
  var texto = "";
  if (email == "") {
    texto = "Digite o e-mail para ver a dica.";
  } else if (usuario == undefined) {
    texto = "Nenhum cadastro encontrado para este e-mail.";
  } else if (usuario.dica == "") {
    texto = "Este usuário não cadastrou uma dica.";
  } else {
    texto = usuario.dica;
  }
  document.getElementById("dica-conteudo").innerHTML = texto;
}

function redefinirSenha() {
  try {
    var email = document.getElementById("email").value.trim().toLowerCase();
    var novaSenha = document.getElementById("nova-senha").value;
    var confirma = document.getElementById("confirma-nova-senha").value;

    var usuarios = lerLista("usuarios");
    var usuario = usuarios.find(u => u.email === email);
    if (usuario == undefined) {
      throw "Nenhum cadastro encontrado para este e-mail.";
    }
    if (novaSenha.length < 6) {
      throw "A senha deve ter pelo menos 6 caracteres.";
    }
    if (novaSenha !== confirma) {
      throw "As senhas não são iguais.";
    }
    usuario.senha = novaSenha;
    salvarLista("usuarios", usuarios);

    alert("Senha redefinida com sucesso!");
    window.location.href = "login.html";
  } catch (erro) {
    mostrarMensagem("mensagem", erro, "red");
  }
  return false;
}

function sair() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

function salvarDica() {
  var usuario = buscarUsuarioLogado();
  var dica = document.getElementById("dica-recuperacao").value.trim();
  var usuarios = lerLista("usuarios");
  usuarios.find(u => u.email === usuario.email).dica = dica;
  salvarLista("usuarios", usuarios);
  mostrarMensagem("mensagem-dica", "Dica guardada com sucesso!", "green");
}

function editarNome() {
  var usuario = buscarUsuarioLogado();
  var novoNome = prompt("Digite seu nome:", usuario.nome);
  if (novoNome == null || novoNome.trim() == "") {
    return;
  }
  var usuarios = lerLista("usuarios");
  usuarios.find(u => u.email === usuario.email).nome = novoNome.trim();
  salvarLista("usuarios", usuarios);
  document.getElementById("perfil-nome").innerHTML = novoNome.trim();
}

function cancelarPedido(id) {
  if (!confirm("Deseja realmente cancelar este pedido?")) {
    return;
  }
  var pedidos = lerLista("pedidos");
  pedidos.find(p => p.id === id).status = "Cancelado";
  salvarLista("pedidos", pedidos);
  mostrarPedidos();
}

function mostrarPedidos() {
  var usuario = buscarUsuarioLogado();
  var lista = document.getElementById("lista-pedidos");
  var meus = lerLista("pedidos").filter(p => p.email === usuario.email);
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

function iniciarPerfil() {
  var usuario = buscarUsuarioLogado();
  if (usuario == null) {
    window.location.href = "login.html";
    return;
  }
  document.getElementById("perfil-nome").innerHTML = usuario.nome;
  document.getElementById("perfil-email").innerHTML = usuario.email;
  document.getElementById("dica-recuperacao").value = usuario.dica;
  mostrarPedidos();
}

if (document.getElementById("perfil-email") != null) {
  iniciarPerfil();
}

if (document.getElementById("nova-senha") != null) {
  document.getElementById("email").addEventListener("input", mostrarDica);
  mostrarDica();
}
