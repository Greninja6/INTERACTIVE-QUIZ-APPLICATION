const allQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "JQuery", "CSS"],
        answer: "CSS"
    },
    {
        question: "Which language is used for web scripting?",
        options: ["Java", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "Which HTML tag is used to link CSS?",
        options: ["<css>", "<style>", "<link>"],
        answer: "<link>"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "<!-- -->", "#"],
        answer: "//"
    },
    {
        question: "Which HTML tag is used to write JavaScript?",
        options: ["<js>", "<script>", "<javascript>"],
        answer: "<script>"
    },
    {
        question: "Which property changes text color in CSS?",
        options: ["font-color", "color", "text-color"],
        answer: "color"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font"],
        answer: "style"
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        options: ["<a>", "<link>", "<href>"],
        answer: "<a>"
    },
    {
        question: "Which keyword is used to declare a variable in JS?",
        options: ["var", "int", "define"],
        answer: "var"
    },
    {
        question: "Which HTML tag is used to insert an image?",
        options: ["<img>", "<image>", "<src>"],
        answer: "<img>"
    },
    {
        question: "Which HTML tag is used for table rows?",
        options: ["<td>", "<tr>", "<th>"],
        answer: "<tr>"
    },
    {
        question: "Which keyword stops a loop in JavaScript?",
        options: ["stop", "break", "exit"],
        answer: "break"
    },
    {
        question: "Which HTML tag defines a form?",
        options: ["<input>", "<form>", "<field>"],
        answer: "<form>"
    },
    {
        question: "Which CSS property aligns text?",
        options: ["align", "text-align", "position"],
        answer: "text-align"
    }
];


let quizData = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
const QUESTIONS_PER_QUIZ = 5;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
    quizData = shuffle([...allQuestions]).slice(0, QUESTIONS_PER_QUIZ);
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    answered = false;

    document.getElementById("feedback").innerText = "";
    document.getElementById("score").innerText =
        `Score: ${score} | Question ${currentQuestion + 1}/${quizData.length}`;

    const q = quizData[currentQuestion];
    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, option);
        optionsDiv.appendChild(btn);
    });
}


function checkAnswer(button, selected) {
    if (answered) return;
    answered = true;

    const correct = quizData[currentQuestion].answer;
    const options = document.querySelectorAll(".option");

    options.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        button.style.backgroundColor = "#bbf7d0";
        document.getElementById("feedback").innerText = "Correct!";
        score++;
    } else {
        button.style.backgroundColor = "#fecaca";
        document.getElementById("feedback").innerText = "Wrong!";

        options.forEach(btn => {
            if (btn.innerText === correct) {
                btn.style.backgroundColor = "#bbf7d0";
            }
        });
    }
}

function nextQuestion() {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        document.querySelector(".quiz-container").innerHTML = `
            <h2>Quiz Completed</h2>
            <p>Your Score: ${score} / ${quizData.length}</p>
            <button onclick="restartQuiz()">Restart Quiz</button>
        `;
    }
}

function restartQuiz() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2 id="question"></h2>
        <div id="options"></div>
        <p id="feedback"></p>
        <p id="score"></p>
        <button onclick="nextQuestion()">Next</button>
    `;
    startQuiz();
}

startQuiz();
