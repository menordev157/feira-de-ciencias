
// ======================================
// ENTRADA DO SITE
// ======================================

const introScreen = document.getElementById("introScreen");
const site = document.getElementById("site");
const enterButton = document.getElementById("enterButton");

enterButton.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  site.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// ======================================
// NAVEGAÇÃO ENTRE AS PÁGINAS
// ======================================

const navButtons = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");

function showPage(pageId) {
  const selectedPage = document.getElementById(pageId);

  if (!selectedPage) return;

  pages.forEach(page => {
    page.classList.remove("active");
  });

  selectedPage.classList.add("active");

  navButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });

  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

document.querySelectorAll("[data-page]").forEach(button => {
  if (button.classList.contains("nav-link")) return;

  button.addEventListener("click", event => {
    event.preventDefault();
    showPage(button.dataset.page);
  });
});


// ======================================
// MENU PARA CELULAR
// ======================================

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});


// ======================================
// QUIZ ECO FUTURE
// ======================================

const questions = [
  {
    question: "Qual é o principal objetivo do reaproveitamento de materiais?",
    answers: [
      "Aumentar a produção de lixo",
      "Dar uma nova utilidade aos materiais",
      "Desperdiçar recursos naturais",
      "Descartar todos os objetos"
    ],
    correct: 1,
    explanation:
      "Reaproveitar significa utilizar novamente um material, prolongando sua vida útil e evitando desperdícios."
  },

  {
    question: "O que significa economia circular?",
    answers: [
      "Produzir e descartar rapidamente",
      "Utilizar recursos sem planejamento",
      "Manter materiais em uso pelo maior tempo possível",
      "Aumentar o consumo de produtos descartáveis"
    ],
    correct: 2,
    explanation:
      "A economia circular procura manter produtos e materiais em uso, reduzindo resíduos e aproveitando melhor os recursos."
  },

  {
    question: "Qual alternativa representa um dos 5 Rs da sustentabilidade?",
    answers: [
      "Desperdiçar",
      "Repensar",
      "Ignorar",
      "Descartar"
    ],
    correct: 1,
    explanation:
      "Repensar, reduzir, reaproveitar, reciclar e recusar são os 5 Rs trabalhados na educação ambiental."
  },

  {
    question: "O que deve ser analisado durante o desenvolvimento de um produto sustentável?",
    answers: [
      "Somente sua aparência",
      "Apenas o tamanho",
      "Funcionalidade, resistência, segurança e custo",
      "Somente a quantidade de materiais"
    ],
    correct: 2,
    explanation:
      "O Projeto 7 propõe avaliar funcionalidade, resistência, segurança, custo, durabilidade, sustentabilidade e destino final."
  },

  {
    question: "Qual é uma das quatro propostas do Projeto 10?",
    answers: [
      "Aumentar o desperdício de água",
      "Ignorar os custos da empresa",
      "Inovação tecnológica",
      "Eliminar o monitoramento"
    ],
    correct: 2,
    explanation:
      "O Projeto 10 trabalha com economia circular, materiais sustentáveis, soluções ambientais e inovação tecnológica."
  },

  {
    question: "Por que uma empresa deve acompanhar indicadores ambientais?",
    answers: [
      "Para esconder seus resultados",
      "Para avaliar se suas ações estão trazendo melhorias",
      "Para aumentar o consumo de recursos",
      "Para deixar de planejar"
    ],
    correct: 1,
    explanation:
      "Indicadores ajudam a acompanhar consumo de água e energia, geração de resíduos e resultados das ações."
  },

  {
    question: "Qual atitude representa consumo consciente?",
    answers: [
      "Comprar sem necessidade",
      "Descartar objetos que ainda funcionam",
      "Refletir antes de comprar e evitar desperdícios",
      "Utilizar produtos descartáveis sempre"
    ],
    correct: 2,
    explanation:
      "O consumo consciente envolve avaliar necessidades, evitar desperdícios e escolher produtos de forma responsável."
  }
];


// ======================================
// ELEMENTOS DO QUIZ
// ======================================

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionCounter = document.getElementById("questionCounter");
const scoreLabel = document.getElementById("scoreLabel");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");

const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("resultPanel");


// ======================================
// MOSTRAR PERGUNTA
// ======================================

function loadQuestion() {
  const question = questions[currentQuestion];

  answered = false;

  questionCounter.textContent =
    `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;

  scoreLabel.textContent = `PONTOS: ${score}`;

  progressFill.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  questionText.textContent = question.question;

  answersContainer.innerHTML = "";
  feedback.textContent = "";

  nextButton.disabled = true;

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answersContainer.appendChild(button);
  });
}


// ======================================
// SELECIONAR RESPOSTA
// ======================================

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];

  const buttons =
    answersContainer.querySelectorAll(".answer-button");

  const isCorrect =
    selectedIndex === question.correct;

  if (isCorrect) {
    score++;

    feedback.textContent =
      `Resposta correta! ${question.explanation}`;
  } else {
    feedback.textContent =
      `Resposta incorreta. A resposta correta é: ${question.answers[question.correct]}. ${question.explanation}`;
  }

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.correct) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  scoreLabel.textContent = `PONTOS: ${score}`;

  nextButton.disabled = false;
}


// ======================================
// PRÓXIMA PERGUNTA
// ======================================

nextButton.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});


// ======================================
// RESULTADO FINAL
// ======================================

function showResult() {
  quizPanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");

  progressFill.style.width = "100%";

  const resultTitle =
    document.getElementById("resultTitle");

  const resultText =
    document.getElementById("resultText");

  if (score === 7) {
    resultTitle.textContent = "Excelente! Você acertou tudo!";
  } else if (score >= 5) {
    resultTitle.textContent = "Muito bem! Ótimo resultado!";
  } else if (score >= 3) {
    resultTitle.textContent = "Bom trabalho! Continue aprendendo!";
  } else {
    resultTitle.textContent = "Continue aprendendo!";
  }

  resultText.textContent =
    `Você acertou ${score} de ${questions.length} perguntas. ` +
    "A sustentabilidade começa com conhecimento e se transforma em atitude.";
}


// ======================================
// REINICIAR QUIZ
// ======================================

document
  .getElementById("restartQuiz")
  .addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    resultPanel.classList.add("hidden");
    quizPanel.classList.remove("hidden");

    loadQuestion();
  });


// ======================================
// INICIAR
// ======================================

loadQuestion();



