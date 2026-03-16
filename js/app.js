import { Cliente, ClienteService } from "./classes.js";
import {
  obterDadosFormulario,
  camposPreenchidos,
  limparFormulario,
  buscarClientePorId,
  contarClientes,
  extrairNomes,
  mostrarToast
} from "./utils.js";

const formCliente = document.getElementById("formCliente");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const btnCarregar = document.getElementById("btnCarregar");
const listaClientes = document.getElementById("listaClientes");
const modeloCliente = document.getElementById("modeloCliente");
const totalClientes = document.getElementById("totalClientes");

const clienteService = new ClienteService();

let clientesCarregados = [];

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
      clientesCarregados = clientes;

      clientes.forEach((cliente) => {
        renderizarCliente(cliente);
      });

      const total = contarClientes(clientes);
      const nomes = extrairNomes(clientes);

      totalClientes.textContent = `Total de clientes: ${total}`;
      mostrarToast(`Nomes: ${nomes.join(", ")}`);
    })
    .catch((erro) => {
      console.error("Erro ao listar clientes:", erro);
      mostrarToast("Erro ao carregar clientes.");
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
    mostrarToast("Preencha todos os campos.");
    return;
  }

  const novoCliente = new Cliente(nome, email);

  clienteService
    .criarCliente(novoCliente)
    .then(() => {
      limparFormulario(inputNome, inputEmail);
      mostrarToast("Cliente cadastrado com sucesso.");
      listarClientes();
    })
    .catch((erro) => {
      console.error("Erro ao cadastrar cliente:", erro);
      mostrarToast("Erro ao cadastrar cliente.");
    });
}

function excluirCliente(id) {
  const clienteEncontrado = buscarClientePorId(clientesCarregados, id);

  clienteService
    .removerCliente(id)
    .then(() => {
      const nomeCliente = clienteEncontrado ? clienteEncontrado.nome : "Cliente";
      mostrarToast(`${nomeCliente} foi excluído.`);
      listarClientes();
    })
    .catch((erro) => {
      console.error("Erro ao excluir cliente:", erro);
      mostrarToast("Erro ao excluir cliente.");
    });
}

function limparLista() {
  document.querySelectorAll(".cliente-renderizado").forEach((cliente) => {
    cliente.remove();
  });
}