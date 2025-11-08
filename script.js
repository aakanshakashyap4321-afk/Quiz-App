// Quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language is mainly used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  },
  {
    question: "Who founded Microsoft?",
    options: ["Elon Musk", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
    answer: "Bill Gates"
  },
   {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "HyperText Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

// Elements
const startPage = document.getElementById("start-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const restartFinalBtn = document.getElementById("restart-final-btn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");

// Load Question
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("div");
    btn.textContent = option;
    btn.classList.add("option");
    btn.addEventListener("click", () => selectAnswer(option, btn));
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

// Select Answer
function selectAnswer(selected, btn) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    score++;
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    Array.from(optionsEl.children).forEach(opt => {
      if (opt.textContent === correct) opt.classList.add("correct");
    });
  }
  Array.from(optionsEl.children).forEach(opt => opt.style.pointerEvents = "none");
  nextBtn.style.display = "inline-block";
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show Result
function showResult() {
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  resultEl.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
}

// Restart Quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  quizPage.classList.remove("hidden");
  resultPage.classList.add("hidden");
  startPage.classList.add("hidden");
  loadQuestion();
}

// Event Listeners
startBtn.addEventListener("click", () => {
  startPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  restartQuiz();
});
restartBtn.addEventListener("click", restartQuiz);
restartFinalBtn.addEventListener("click", restartQuiz);
