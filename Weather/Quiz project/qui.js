//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: " A score of 111 by a batsman or a team is known by many as a “Nelson.”",
        options: ["Na", "Undefined", "False", "True"],
        correct: "True",
    },
    {
        id: "1",
        question: "In which year were the first laws of cricket believed to have been written?",
        options: ["1765", "1806", "1774", "2002"],
        correct: "1774",
    },
    {
        id: "2",
        question: "Which cricketer has highest no of centuries in international cricket?",
        options: ["Sachin Tendulkar", "Gayle", "Dhoni", "Shanaka"],
        correct: "Sachin Tendulkar",
    },

    {
      id: "3",
      question: "Which cricketer has highest no of Sixes in international cricket?",
      options: ["Rohit Sharma", "Gayle", "Dhoni", "Shanaka"],
      correct: "Rohit Sharma",
  },

  {
    id: "4",
    question: "Which cricketer was well known as captain cool",
    options: ["Kane", "Rahane", "Dhoni", "Bhuvi"],
    correct: "Dhoni",
},
{
  id: "5",
  question: "For how many days is a Test match scheduled??",
  options: ["10overs", "20overs", "5 days", "2 days"],
  correct: "5 days",
},

    
    
    {
        id: "6",
        question: "What is the name given to the biennial international Test cricket series played between England and Australia?",
        options: ["Gavaskar trophy","Ashes","Rashford","T10 trophy"],
        correct: "Ashes",
    },
    {
        id: "7",
        question: "Harold (“Dickie”) Bird is best known for his career in cricket as:",
        options: ["Batsman", "Bowler", "Fielder", "Umpire"],
        correct: "Fielder",
    },
    {
        id: "8",
        question: "What is the slang term given to a ball that is bowled so well that it is considered unplayable by the batsman?",
        options: ["inswinger", "Halfvolley", "jaffa", "over"],
        correct: "jaffa",
    },
    {
        id: "9",
        question: "Cricket umpires use a large variety of signals to make sure that the correct scores are kept. What does it mean if an umpire raises both arms straight above his head?",
        options: ["The batsman has scored six runs.", "The bowler has bowled a no-ball.", "The batsman is out.", "The bowler has bowled a wide"],
        correct: "The batsman has scored six runs.",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};