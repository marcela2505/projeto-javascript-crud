# Projeto CRUD com LocalStorage e Consumo de API (ViaCEP)

Este projeto é um sistema CRUD (Create, Read, Update, Delete) simples em HTML, CSS e JavaScript, que simula um banco de dados utilizando `localStorage` e também consome dados da API pública **ViaCEP**.

## Funcionalidades

### 1. Página de Login
- Validação de campos (e-mail e senha)
- Armazenamento da sessão no `localStorage`
- Alternância de visibilidade da senha com ícone de olho

### 2. Página de Cadastro
- Formulário com campos: Nome, E-mail, Senha, CPF, Data de Nascimento e CEP
- Validações:
  - E-mail válido e único
  - CPF válido e único
  - Senha com pelo menos 4 dígitos
  - CEP válido com preenchimento automático de endereço
- Feedback visual para erros e sucesso

### 3. Página de Listagem
- Tabela com todos os usuários cadastrados
- Filtros por nome
- Botões para editar e excluir usuários
- Botões lado a lado com layout responsivo

### 4. Página de Perfil
- Exibe os dados do usuário logado
- Permite editar e salvar alterações no `localStorage`

### 5. Página de Consumo de API
- Busca de endereço por CEP usando a API ViaCEP
- Exibição dos dados em formato de lista
- Exibe localização no Google Maps com botão “Ver no Google Maps”

## Tecnologias Utilizadas
- HTML5
- CSS3 (responsivo e visual limpo)
- JavaScript
- LocalStorage (simulação de banco de dados)
- API pública: [ViaCEP](https://viacep.com.br)

## Licença

Este projeto está licenciado sob a MIT License.
