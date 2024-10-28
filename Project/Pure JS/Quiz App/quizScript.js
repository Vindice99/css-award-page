let data;
let currentQuestionIndex = 0;
let score = 0;
let numberOfQuestion = 0;
let wrongQuestion = false;
let showingScoreBoard = false; 

fetch('questions.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;  // Data is now loaded into this variable
    console.log(data);
    startQuiz();  // Start quiz AFTER data is loaded
  })
  .catch(error => console.error('Error loading JSON:', error));

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const scoreBoardButton = document.getElementById("leader-board-btn");

function startQuiz() {
    currentQuestionIndex = getRandomInt(data.length - 10);  // Ensure data length >= 10
    score = 0;
    numberOfQuestion = 0;
    wrongQuestion = false;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";  // Hide initially
    showQuestion();
}

function showQuestion() {
    let currentQuestion = data[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    answerButton.innerHTML = '';

    ["A", "B", "C", "D"].forEach(option => {
        const button = document.createElement("button");
        button.innerHTML = currentQuestion[option];
        button.classList.add("btn");
        answerButton.appendChild(button);

         // Add click event listener for each button to check answer
         button.addEventListener('click', () => checkAnswer(option, button));
    });
}

function showScoreBoard() {
    questionElement.innerHTML = "THE SCORE BOARD";
    answerButton.innerHTML = "";

    // Get the stored records from localStorage
    let records = JSON.parse(localStorage.getItem("quizRecords")) || [];
    
    // Sort records by time (most recent first)
    records.sort((a, b) => new Date(b.time) - new Date(a.time));
  
    // Get top 5 most recent records
    let topRecords = records.slice(0, 5);

    //Display the record
    answerButton.innerHTML = topRecords.map(record => `Score: ${record.variable} at ${record.time}`).join("<br>");
}

scoreBoardButton.addEventListener('click', () => {
    if(!showingScoreBoard)
    {
        showScoreBoard();
        scoreBoardButton.innerHTML = "Back to Quiz";  // Change the button text
        showingScoreBoard = true;  // Set the state to indicate scoreboard is being shown
    }
    else{
        showQuestion()
        scoreBoardButton.innerHTML = "Score"
        showingScoreBoard = false
    }

});

function checkAnswer(selectedOption, button) {
    let correctAnswer = data[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        if (!wrongQuestion) {
            score++;
        }
        // Move to the next question
        nextButton.style.display = "block";
        button.style.backgroundColor = "green"; 

        // Disable all buttons after a correct answer is selected 
        const allButtons = document.querySelectorAll("#answer-button button");
        allButtons.forEach(btn => btn.disabled = true);
    } else {
        wrongQuestion = true;
        button.style.backgroundColor = "red"; 
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    numberOfQuestion++;
    wrongQuestion = false;
    
    if (numberOfQuestion < 5) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    questionElement.innerHTML = "Congratulations!";
    answerButton.innerHTML = `Quiz Finished! Your Score: ${score}`;
    nextButton.innerHTML = "Restart";

    nextButton.addEventListener('click', () => {
        let newRecord = {
            variable: score, // Save the score
            time: new Date().toLocaleString() // Save the timestamp
        };

        // Get existing records from localStorage
        let records = JSON.parse(localStorage.getItem("quizRecords")) || [];

        // Add new record
        records.push(newRecord);

        // Save updated records back to localStorage
        localStorage.setItem("quizRecords", JSON.stringify(records));

        console.log("Record saved:", newRecord);

        // Reset quiz
        startQuiz();
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
