export function obterDadosFormulario(inputNome, inputEmail) {
  return {
    nome: inputNome.value.trim(),
    email: inputEmail.value.trim()
  };
}

export function camposPreenchidos(nome, email) {
  return nome !== "" && email !== "";
}

export function limparFormulario(inputNome, inputEmail) {
  inputNome.value = "";
  inputEmail.value = "";
}

export function buscarClientePorId(clientes, id) {
  return clientes.find((cliente) => cliente._id === id);
}

export function contarClientes(clientes) {
  return clientes.reduce((total) => total + 1, 0);
}

export function extrairNomes(clientes) {
  return clientes.map((cliente) => cliente.nome);
}