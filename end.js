const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
// console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
    // console.log(username.value);
})

saveHighScore = e => {
    // console.log("Clicked the save button!");
    e.preventDefault();

    const score = {
        // checking
        // score: Math.floor(Math.random() * 100),
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);

    // need only top 5 highscores
    highScores.sort( (a,b) =>  b.score - a.score);
        // if b score is greater than a score put b first so sorts in decreasing order
    
    highScores.splice(5);

    // note it stores in string format so JSON is stringyfied
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // go to index.html or home page
    window.location.assign('/');
    // console.log(highScores);
};