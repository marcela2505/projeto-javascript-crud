const getUsuarios = () => JSON.parse(localStorage.getItem("usuarios") || "[]");
const salvarUsuarios = (usuarios) => localStorage.setItem("usuarios", JSON.stringify(usuarios));

// Cadastro
function validarCPF(cpf) {
  return /^\d{11}$/.test(cpf);
}

const formCadastro = document.getElementById("cadastro-form");
if (formCadastro) {
  formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const dataNasc = document.getElementById("data-nasc").value;
    const usuarios = getUsuarios();

    if (usuarios.find(u => u.email === email)) {
      document.getElementById("cadastro-erro").textContent = "E-mail já cadastrado!";
      return;
    }

    if (usuarios.find(u => u.cpf === cpf)) {
      document.getElementById("cadastro-erro").textContent = "CPF já cadastrado!";
      return;
    }    

    if (!validarCPF(cpf)) {
      document.getElementById("cadastro-erro").textContent = "CPF inválido (use 11 dígitos numéricos)";
      return;
    }

    if (senha.length < 4) {
      document.getElementById("cadastro-erro").textContent = "Senha deve ter pelo menos 4 dígitos";
      return;
    }
    
    const novoUsuario = {
      nome, email, senha, cpf, dataNasc,
      dataRegistro: new Date().toISOString().split("T")[0]
    };    

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);
    window.location.href = "index.html";
  });
}

// Login
function toggleSenha(id, icon) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    icon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    icon.setAttribute('data-lucide', 'eye');
  }
  lucide.createIcons();
}

const formLogin = document.getElementById("login-form");
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;
    const usuarios = getUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      window.location.href = "listagem.html";
    } else {
      document.getElementById("login-erro").textContent = "Login inválido";
    }
  });
}

// Listagem
const tabela = document.getElementById("tabela-usuarios");
const render = () => {
  const usuarios = getUsuarios();
  const filtro = document.getElementById("filtro").value.toLowerCase();
  tabela.innerHTML = "<tr><th>Nome</th><th>Email</th><th>Ações</th></tr>" +
    usuarios.filter(u => u.nome.toLowerCase().includes(filtro)).map((u, i) => `
      <tr>
        <td>${u.nome}</td><td>${u.email}</td>
        <td>
          <button onclick="editar(${i})">Editar</button>
          <button onclick="excluir(${i})">Excluir</button>
        </td>
      </tr>
    `).join("");
};
if (tabela) {
  window.editar = (i) => {
    const usuarios = getUsuarios();
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[i]));
    window.location.href = "perfil.html";
  };
  window.excluir = (i) => {
    const usuarios = getUsuarios();
    usuarios.splice(i, 1);
    salvarUsuarios(usuarios);
    render();
  };
  document.getElementById("filtro").addEventListener("input", render);
  render();
}

// Perfil
const formPerfil = document.getElementById("perfil-form");
if (formPerfil) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuario) {
    window.location.href = "index.html";
  } else {
    document.getElementById("perfil-nome").value = usuario.nome;
    document.getElementById("perfil-email").value = usuario.email;
    document.getElementById("perfil-cpf").value = usuario.cpf;
    document.getElementById("perfil-data-nasc").value = usuario.dataNasc;

    formPerfil.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuarios = getUsuarios();
      const index = usuarios.findIndex(u => u.email === usuario.email);
      usuarios[index].nome = document.getElementById("perfil-nome").value;
      usuarios[index].dataNasc = document.getElementById("perfil-data-nasc").value;
      salvarUsuarios(usuarios);
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarios[index]));
      alert("Perfil atualizado!");
    });
  }
}

// Consumo de API Pública
function buscarEndereco() {
  const cep = document.getElementById("cep").value;
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(dados => {
      if (dados.erro) {
        document.getElementById("endereco").innerHTML = "CEP não encontrado.";
        document.getElementById("mapa-link").innerHTML = "";
      } else {
        document.getElementById("endereco").innerHTML = `
          <p><strong>Logradouro:</strong> ${dados.logradouro}</p>
          <p><strong>Bairro:</strong> ${dados.bairro}</p>
          <p><strong>Cidade:</strong> ${dados.localidade}</p>
          <p><strong>Estado:</strong> ${dados.uf}</p>
          <hr>
        `;
        const enderecoCompleto = `${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}`;
        const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(enderecoCompleto)}`;
        document.getElementById("mapa-link").innerHTML = `<a href="${mapUrl}" target="_blank">Ver no Google Maps</a>`;
      }
    })
    .catch(() => {
      document.getElementById("endereco").innerHTML = "Erro ao buscar o CEP.";
      document.getElementById("mapa-link").innerHTML = "";
    });
}