// console.log("Hello world from Game!");
const question = document.getElementById('question');

const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);

let currentQuestion = {};
let acceptingAnswers = true;
score = 0;
questionCounter = 0;
availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put Javascript code in?",
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,

    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

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
        // goto the end page
        return window.location.assign("/end.html");
    }

    questionCounter++;
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
        console.log(selectedAnswer);
        getNewQuestion();
    });
});

startGame();