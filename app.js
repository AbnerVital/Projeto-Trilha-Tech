const titulo = document.getElementById('titulo');
const botao1 = document.getElementById('botao1');
const botao2 = document.getElementById('botao2');
const buttonsContainer = document.querySelector('.buttons'); // Container dos botões
const content = document.querySelector('.content'); // Div principal

// Estado inicial
titulo.textContent = 'Qual área de Tecnologia você quer seguir?';
botao1.textContent = 'Front-End';
botao2.textContent = 'Back-End';

let estado = "primeiroClique"; // Variável para controle
let botoesSimNaoCriados = false; // Controle de criação dos botões "Sim" e "Não"
let botaoSim = null; // Variável para armazenar o botão "Sim"
let botaoNao = null; // Variável para armazenar o botão "Não"
let respostas = []; // Array para armazenar as respostas do usuário

// Função para desativar e ocultar botões anteriores
function desativarBotoes() {
    botao1.style.display = "none";
    botao2.style.display = "none";
}

// Função para criar um novo botão com estilo igual aos anteriores
function criarBotao(texto, callback) {
    const botao = document.createElement("button");
    botao.textContent = texto;
    botao.style.margin = "10px";
    botao.style.padding = "12px 20px";
    botao.style.fontSize = "20px";
    botao.style.fontWeight = "bold";
    botao.style.borderRadius = "5px";
    botao.style.border = "none";
    botao.style.cursor = "pointer";
    botao.style.backgroundColor = "#3498db";
    botao.style.color = "white";
    botao.style.transition = "opacity 0.3s ease-in-out";
    botao.addEventListener("mouseover", () => botao.style.opacity = "0.8");
    botao.addEventListener("mouseout", () => botao.style.opacity = "1");
    botao.addEventListener("click", callback);
    return botao;
}

// Função para adicionar input e botão de envio
function adicionarInput() {
    // Criando input
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Digite uma tecnologia...";
    inputField.style.marginTop = "20px";
    inputField.style.padding = "10px";
    inputField.style.fontSize = "18px";
    inputField.style.borderRadius = "5px";
    inputField.style.border = "1px solid #ccc";
    inputField.style.width = "80%";
    inputField.style.opacity = "70%"

    // Criando botão de envio
    const enviarBotao = document.createElement("button");
    enviarBotao.textContent = "Enviar";
    enviarBotao.style.marginTop = "10px";
    enviarBotao.style.padding = "10px 15px";
    enviarBotao.style.fontSize = "18px";
    enviarBotao.style.fontWeight = "bold";
    enviarBotao.style.borderRadius = "5px";
    enviarBotao.style.border = "none";
    enviarBotao.style.backgroundColor = "#2ecc71"; // Verde
    enviarBotao.style.color = "white";
    enviarBotao.style.cursor = "pointer";

    // Evento de clique no botão enviar
    enviarBotao.addEventListener("click", () => {
        const valorDigitado = inputField.value;
        if (valorDigitado.trim() !== "") {
            console.log("Usuário digitou:", valorDigitado);
            respostas.push(valorDigitado); // Adiciona a resposta no array

            // Mudar o título para perguntar se o usuário tem mais alguma tecnologia
            titulo.textContent = "Tem mais alguma tecnologia que você gostaria de aprender?";
            inputField.style.display = "none";  // Esconde o input
            enviarBotao.style.display = "none"; // Esconde o botão de enviar

            // Verificar se os botões "Sim" e "Não" já foram criados
            if (!botoesSimNaoCriados) {
                // Criar botões "Sim" e "Não" e os exibir
                const containerSimNao = document.createElement('div');
                containerSimNao.style.display = 'flex'; // Usando flex para alinhar na mesma linha
                containerSimNao.style.justifyContent = 'center'; // Alinhando os botões ao centro

                botaoSim = criarBotao("Sim", () => {
                    inputField.value = ""; // Limpar o campo de input
                    inputField.style.display = "block"; // Mostrar o input novamente
                    enviarBotao.style.display = "block"; // Mostrar o botão de enviar novamente
                    titulo.textContent = "Digite outra tecnologia:";

                    // Esconder os botões "Sim" e "Não"
                    botaoSim.style.display = "none";
                    botaoNao.style.display = "none";
                });

                botaoNao = criarBotao("Não", () => {
                    titulo.textContent = "Obrigado pela sua resposta!";
                    exibirRespostas(); // Exibe as respostas enviadas

                    // Esconder os botões "Sim" e "Não"
                    botaoSim.style.display = "none";
                    botaoNao.style.display = "none";
                });

                // Adicionar os botões "Sim" e "Não" ao container
                containerSimNao.appendChild(botaoSim);
                containerSimNao.appendChild(botaoNao);

                // Adicionar o container com os botões ao content
                content.appendChild(containerSimNao);

                // Marcar que os botões "Sim" e "Não" foram criados
                botoesSimNaoCriados = true;
            } else {
                // Caso os botões já tenham sido criados, apenas ativá-los
                botaoSim.style.display = "inline-block";
                botaoNao.style.display = "inline-block";
            }
        } else {
            alert("Por favor, digite algo antes de enviar.");
        }
    });

    // Adiciona input e botão ao content
    content.appendChild(inputField);
    content.appendChild(enviarBotao);
}

// Função para exibir as respostas como uma lista
function exibirRespostas() {
    // Criar uma lista <ul> para as respostas
    const listaRespostas = document.createElement("ul");
    respostas.forEach(resposta => {
        const li = document.createElement("li");
        li.textContent = resposta;
        listaRespostas.appendChild(li);
    });

    // Adiciona a lista de respostas no conteúdo
    content.appendChild(listaRespostas);
}

// Evento de clique nos botões principais
buttonsContainer.addEventListener('click', (event) => {
    if (estado === "primeiroClique") {
        if (event.target === botao1) {
            titulo.textContent = 'Qual linguagem Front-End você quer aprender?';
            botao1.textContent = 'React';
            botao2.textContent = 'Vue';
        } else if (event.target === botao2) {
            titulo.textContent = 'Qual linguagem Back-End você quer aprender?';
            botao1.textContent = 'C#';
            botao2.textContent = 'Java';
        }
        estado = "segundoClique";

    } else if (estado === "segundoClique") {
        titulo.textContent = 'Você pretende?';
        botao1.textContent = 'Especializar-se na área escolhida';
        botao2.textContent = 'Tornar-se Fullstack';
        estado = "terceiroClique";

    } else if (estado === "terceiroClique") {
        titulo.textContent = 'Digite uma tecnologia que você quer aprender:';
        adicionarInput();
        desativarBotoes();
        estado = "finalizado";
    }
});
