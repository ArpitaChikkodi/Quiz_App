// console.log("Hello world from Game!");
const question = document.getElementById('question');

const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

const progressBarFillText = document.getElementById('progressBarFill');

let currentQuestion = {};
let acceptingAnswers = true;
score = 0;
questionCounter = 0;
availableQuestions = [];

let questions = [];

fetch("questions.json")
.then(res => {
    // console.log(res);
    return res.json();
}).then( loadedQuestions => {
    console.log(loadedQuestions);

    questions = loadedQuestions;
    startGame();
})
.catch( err => {
    console.error(err);
})

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score= 0;
    // 3 dots is spread operator=> spread out each of its(questions) items and put them in a new array 
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length===0 || questionCounter >= MAX_QUESTIONS) {

        localStorage.setItem("mostRecentScore", score);
        // goto the end page
        return window.location.assign("/end.html");
    }

    questionCounter++;

    // questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    // progess bar
    progressBarFillText.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);  
    currentQuestion = availableQuestions[questionIndex];
    // question id from index.html
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];

    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e=> {
        // console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
       
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply === 'correct'){
            incrementscore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);

        // console.log(classToApply);
        // console.log(selectedAnswer == currentQuestion.answer);

    });
});

incrementscore = num => {
    score += num;
    scoreText.innerText = score;

};