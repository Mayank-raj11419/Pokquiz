function none_display() {
    document.querySelectorAll(
        "#startpage, #diffpage, #quizpage, #resultpage"
    ).forEach(sec => sec.style.display = "none")
}


const startPage = document.getElementById("startpage");
const diffPage = document.getElementById("diffpage");
const quizPage = document.getElementById("quizpage");
const resultPage = document.getElementById("resultpage");


const startBtn = document.getElementById("strquiz");


const diffOptions = document.querySelectorAll("#diffpage ul li");


const question = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const text4 = document.getElementById("text4");

const nextBtn = document.getElementById("next");

// Question number
const quesNo = document.querySelectorAll(".que-no");

// Result page
const scoreText = document.querySelector(".scorecard span span");
const backBtn = document.querySelector(".back");


var diffinput = 0;
var a = 1;

function getSelectedAnswer() {
    const options = document.querySelectorAll('input[name="option"]');

    for (let opt of options) {
        if (opt.checked) return opt.value;
    }
    return null;
}

var total_score = 0;

var op_to_text = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3
};

function* randomNumbers() {
    for (let i = 0; i < 11; i++) {
        yield Math.floor(Math.random() * 100) + 1;
    }
}

const numbers = [...randomNumbers()];

let quizData = [];

fetch("pokemon_quiz_500_clean.json")
    .then(response => response.json())
    .then(data => {
        quizData = data;
        console.log(quizData);
    })
    .catch(err => console.error("Error loading JSON:", err));



function loadDifficulty(level) {
    currentDifficulty = level;
    currentQuestions = quizData[level];
    currentIndex = numbers[a];

    loadQuestion();
}

function loadQuestion() {
    const q = currentQuestions[currentIndex];

    question.innerText = q.question;

    text1.innerText = q.options[0];
    text2.innerText = q.options[1];
    text3.innerText = q.options[2];
    text4.innerText = q.options[3];

    quesNo.forEach(q=> q.innerText=a);


}

function checkAnswer() {
    const selected = getSelectedAnswer();
    if (!selected) return;

    const q = currentQuestions[currentIndex];

    const selectedIndex = op_to_text[selected];
    const selectedText = q.options[selectedIndex];

    if (selectedText === q.answer) {
        total_score += 10;
    }
    else{
        total_score -= 3;
    }
}




startBtn.addEventListener("click", () => {
    none_display();
    diffPage.style.display = "flex";
});


diffOptions.forEach(option => {
    option.addEventListener("click", () => {
        none_display();

        diffinput = option.innerHTML;

        quizPage.style.display = "flex";
        loadDifficulty(diffinput);
        loadQuestion();
    });
});

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();

    checkAnswer();

    a++;

    if (a <= 10) {
        currentIndex = numbers[a];
        loadQuestion();
    } else {
        none_display();
        resultPage.style.display = "flex";

        scoreText.innerText = total_score;
    }
});

backBtn.addEventListener("click", () => {
    none_display();
    startPage.style.display = "flex";

    total_score = 0;
    a = 1;
});

