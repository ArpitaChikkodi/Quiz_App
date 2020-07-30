// console.log("Hello world from Game!");
const question = document.getElementById('question');

const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

const progressBarFillText = document.getElementById('progressBarFill');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = true;
score = 0;
questionCounter = 0;
availableQuestions = [];

let questions = [];

// OpenTrivia DB API
fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
.then(res => {
    // console.log(res);
    return res.json();
}).then( loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        // -1 because index begins from 0
        answerChoices.splice(formattedQuestion.answer - 1, 0, 
            loadedQuestion.correct_answer);

        answerChoices.forEach((choice,index) => {
            // to display as choice1, choice2 (+1 because here index starts from 0)
            formattedQuestion["choice" + (index+1)] = choice;
        })

        return formattedQuestion;
    });
    
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
    game.classList.remove("hidden");
    loader.classList.add("hidden");
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