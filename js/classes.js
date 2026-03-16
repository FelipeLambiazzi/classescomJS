import { API_URL } from "./config.js";

export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    this.id = id;
  }
}


export class ClienteService {

  obterClientes() {
    return fetch(API_URL)
      .then((resposta) => resposta.json())
      .catch((erro) => {
        console.error("Erro ao obter clientes:", erro);
        return [];
      });
}

  criarCliente(cliente) {
    return fetch(API_URL, {
      method: "POST",
      headers: {  
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    })
    .then((resposta) => resposta.json())
    .catch((erro) => {
      console.error("Erro ao criar cliente:", erro);
      throw erro;
    });
  }

  removerCliente(id) {
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    .catch((erro) => {
      console.error("Erro ao excluir cliente:", erro);
      throw erro;
    });
  } 

  obterClientePorId(id) {
    return fetch(`${API_URL}/${id}`)
      .then((resposta) => resposta.json())
      .catch((erro) => {
        console.error("Erro ao obter cliente por ID:", erro);
        throw erro;
      });
  }

  atualizarCliente(cliente) {
    return fetch(`${API_URL}/${cliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    })
    .catch((erro) => {
      console.error("Erro ao atualizar cliente:", erro);
      throw erro;
    });
  }

}
