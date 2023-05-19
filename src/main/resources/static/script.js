const URL_BASE = "http://localhost:8080";

async function carregarLembretesDaAPI() {
  const getLembretesEndpoint = URL_BASE + '/lembretes';
  const lembretes = await fetch(getLembretesEndpoint, { method: 'GET'})
  .then(response => response.json())
  .catch((erro) => {
    console.error("Erro ao enviar dados para API:", erro);
    alert("Ops! Algo deu errado. Por favor, tente novamente.");
  });

  return lembretes;
}

//Cria objeto de data manualmente para evitar problemas com TimeZone
function criarObjetoDeData(dataEmString = "") {
    const [ano, mes, dia] = dataEmString.split("-");
    const data = new Date();
    data.setDate(dia);
    data.setMonth(mes - 1);
    data.setFullYear(ano);
    return data;
}

function configurarFormulario() {
  const postLembretesEndpoint = URL_BASE + "/lembretes";
  const formulario = document.getElementById("formulario");
  const inputNome = document.getElementById("nome");
  const inputData = document.getElementById("data");
  
  // Impede que o usuário selecione uma data no passado
  inputData.setAttribute('min', new Date().toISOString().split('T')[0]); 

  formulario.addEventListener("submit", async function (e) {
    e.preventDefault();
    const nome = inputNome.value;  
    const data = formatarDataParaPortugues(criarObjetoDeData(inputData.value));

    //Envia dados do formulário para a API
    try {
        await fetch(postLembretesEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, data }),
          });
    } catch (error) {
        console.error("Erro ao enviar dados para API:", error);
        alert("Ops! Algo deu errado. Por favor, tente novamente.");   
    }

    //Recupera lista atualizada e renderiza os lembretes novamente
    const listaDeDias = document.querySelector(".lista-de-dias");
    listaDeDias.innerHTML = '';
    const todosOsLembretes = await carregarLembretesDaAPI();
    renderizarLembretes(todosOsLembretes);
  });
}

async function deletarLembrete(lembreteId) {
  const deleteLembreteEndpoint = URL_BASE + "/lembretes/" + lembreteId;
  await fetch(deleteLembreteEndpoint, { method: "DELETE" });

  const elementoLembrete = document.getElementById(lembreteId);
  const listaDeLembretesDoDia = elementoLembrete.parentElement;
  elementoLembrete.remove();

  //Deleta lista de lembretes do dia caso todos os lembretes daquele dia sejam deletados
  if (listaDeLembretesDoDia.children.length == 0) {
    listaDeLembretesDoDia.parentElement.remove();
  }
}

// Função responsável por criar os elementos na tela
function renderizarLembretes(lembretes = []) {
  const gruposDeLembretes = agruparLembretesPorData(lembretes);
  const listaDeDias = document.querySelector(".lista-de-dias");
  for (let data in gruposDeLembretes) {
    const elementoData = document.createElement("p");
    const dataNoFormatoPtBR = formatarDataParaPortugues(criarObjetoDeData(data));
    elementoData.textContent = dataNoFormatoPtBR.toString();
    elementoData.classList.add("data");

    const listaDeLembretesDoDia = document.createElement("ul");
    listaDeLembretesDoDia.classList.add("lista-de-lembretes");
    for (let lembrete of gruposDeLembretes[data]) {
      const elementoLembrete = document.createElement("li");
      const botaoDeletar = document.createElement("button");
      botaoDeletar.textContent = "X";
      botaoDeletar.onclick = () => deletarLembrete(lembrete.id);
      elementoLembrete.textContent = lembrete.nome;
      elementoLembrete.id = lembrete.id;
      elementoLembrete.appendChild(botaoDeletar);
      listaDeLembretesDoDia.appendChild(elementoLembrete);
    }

    const itemDia = document.createElement("li");
    itemDia.appendChild(elementoData);
    itemDia.appendChild(listaDeLembretesDoDia);
    listaDeDias.appendChild(itemDia);
  }
}

function formatarDataParaPortugues(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear());
    
    return `${dia}-${mes}-${ano}`;
}

function agruparLembretesPorData(lembretes = []) {
  // Ordena lembretes por data
  lembretes.sort((a, b) => {
    const data1 = new Date(a.data);
    const data2 = new Date(b.data);
    return data1.getTime() - data2.getTime();
  });

  //Agrupa os lembretes por dia em um objeto
  //As chaves do objeto são as datas, e os valores são arrays com os lembretes daquela data
  const gruposDeLembretes = {};
  for (let lembrete of lembretes) {
    const data = lembrete.data;

    if (gruposDeLembretes[data] === undefined) {
      gruposDeLembretes[data] = [lembrete];
    } else {
      gruposDeLembretes[data].push(lembrete);
    }
  }

  return gruposDeLembretes;
}

async function iniciarTela() {
    const lembretes = await carregarLembretesDaAPI();
    renderizarLembretes(lembretes);
    configurarFormulario();
}

iniciarTela();
