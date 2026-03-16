import { Cliente, ClienteService } from "./classes.js";
import {
  obterDadosFormulario,
  camposPreenchidos,
  limparFormulario,
  buscarClientePorId,
  contarClientes,
  extrairNomes
} from "./utils.js";

const formCliente = document.getElementById("formCliente");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const btnCarregar = document.getElementById("btnCarregar");
const listaClientes = document.getElementById("listaClientes");
const modeloCliente = document.getElementById("modeloCliente");

const clienteService = new ClienteService();

formCliente.addEventListener("submit", cadastrarCliente);
btnCarregar.addEventListener("click", listarClientes);

iniciarApp();

function iniciarApp() {
  listarClientes();
}

function listarClientes() {
  limparLista();

  clienteService
    .obterClientes()
    .then((clientes) => {
      clientes.forEach((cliente) => {
        renderizarCliente(cliente);
      });
    })
    .catch((erro) => {
      console.error("Erro ao listar clientes:", erro);
    });
}

function renderizarCliente(cliente) {
  const itemCliente = modeloCliente.cloneNode(true);

  itemCliente.removeAttribute("id");
  itemCliente.style.display = "flex";
  itemCliente.classList.add("cliente-renderizado");

  itemCliente.querySelector(".nome-cliente").textContent = cliente.nome;
  itemCliente.querySelector(".email-cliente").textContent = cliente.email;

  itemCliente
    .querySelector("button[name='btn-excluir']")
    .addEventListener("click", () => excluirCliente(cliente._id));

  listaClientes.appendChild(itemCliente);
}

function cadastrarCliente(event) {
  event.preventDefault();

  const { nome, email } = obterDadosFormulario(inputNome, inputEmail);

  if (!camposPreenchidos(nome, email)) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const novoCliente = new Cliente(nome, email);

  clienteService
    .criarCliente(novoCliente)
    .then(() => {
      limparFormulario(inputNome, inputEmail);
      listarClientes();
    })
    .catch((erro) => {
      console.error("Erro ao cadastrar cliente:", erro);
    });
}

function excluirCliente(id) {
  clienteService
    .removerCliente(id)
    .then(() => {
      listarClientes();
    })
    .catch((erro) => {
      console.error("Erro ao excluir cliente:", erro);
    });
}

function limparLista() {
  document.querySelectorAll(".cliente-renderizado").forEach((cliente) => {
    cliente.remove();
  });
}