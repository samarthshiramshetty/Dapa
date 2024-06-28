// Define the questions and expected answers
const questions = [
    {
        category: 'Category 1',
        questions: [
            {
                audio: 'cowboy.mp3',
                image: 'cowboy.png',
                expectedAnswer: 'cowboy'
            },
            {
                audio: 'airplane.mp3',
                image: 'airplane.png',
                expectedAnswer: 'Airplane'
            },
            {
                audio: 'cap.mp3',
                image: 'cap.png',
                expectedAnswer: 'cap'
            },
            {
                audio: 'sit.mp3',
                image: 'sit.png',
                expectedAnswer: 'sit'
            },
            {
                audio: 'bear.mp3',
                image: 'bear.png',
                expectedAnswer: 'bear'
            },
            {
                audio: 'paid.mp3',
                image: 'paid.png',
                expectedAnswer: 'paid'
            },
            {
                audio: 'rake.mp3',
                image: 'rake.png',
                expectedAnswer: 'rake'
            },
            {
                audio: 'farm.mp3',
                image: 'farm.png',
                expectedAnswer: 'farm'
            }
        ]
    },
    {
        category: 'Category 2',
        questions: [
            {
                audio: 'seed.mp3',
                image: 'seed.png',
                expectedAnswer: 'seed'
            },
            {
                audio: 'beak.mp3',
                image: 'beak.png',
                expectedAnswer: 'beak'
            },
            {
                audio: 'train.mp3',
                image: 'train.png',
                expectedAnswer: 'train'
            },
            {
                audio: 'wave.mp3',
                image: 'wave.png',
                expectedAnswer: 'wave'
            },
            {
                audio: 'hat.mp3',
                image: 'hat.png',
                expectedAnswer: 'hat'
            },
            {
                audio: 'pot.mp3',
                image: 'pot.png',
                expectedAnswer: 'pot'
            },
            {
                audio: 'bag.mp3',
                image: 'bag.png',
                expectedAnswer: 'bag'
            },
            {
                audio: 'bat.mp3',
                image: 'bat.png',
                expectedAnswer: 'bat'
            }
        ]
    },
    {
        category: 'Category 3',
        questions: [
            {
                audio: 'bride.mp3',
                image: 'bride.png',
                expectedAnswer: 'Bride'
            },
            {
                audio: 'glad.mp3',
                image: 'glad.png',
                expectedAnswer: 'glad'
            },
            {
                audio: 'crate.mp3',
                image: 'crate.png',
                expectedAnswer: 'crate'
            },
            {
                audio: 'broom.mp3',
                image: 'broom.png',
                expectedAnswer: 'broom'
            },
            {
                audio: 'grass.mp3',
                image: 'grass.png',
                expectedAnswer: 'grass'
            },
            {
                audio: 'smell.mp3',
                image: 'smell.png',
                expectedAnswer: 'smell'
            },
            {
                audio: 'skip.mp3',
                image: 'skip.png',
                expectedAnswer: 'skip'
            },
            {
                audio: 'swim.mp3',
                image: 'swim.png',
                expectedAnswer: 'swim'
            }
        ]
    }
];

// Define variables
let currentCategory = 0;
let currentQuestion = 0;
let timeLeft = 10;
let timer;
let instantScore = 0;
let standardScore = 0;
let wrongScore = 0;
let recognition;
let studentName = '';
let uniqueNumber;

// Get DOM elements
const audioElement = document.getElementById('question-audio');
const imageElement = document.getElementById('question-image');
const speechContainer = document.getElementById('speech-container');
const speechResult = document.getElementById('speech-result');
const nextBtn = document.getElementById('next-btn');
const timeLeftElement = document.getElementById('time-left');
const instantScoreElement = document.getElementById('instant-score');
const standardScoreElement = document.getElementById('standard-score');
const wrongScoreElement = document.getElementById('wrong-score');
const startBtn = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const quizContent = document.getElementById('quiz-content');
const resultContainer = document.getElementById('result-container');
const studentDetails = document.getElementById('student-details');
const finalScore = document.getElementById('final-score');

// Initialize category scores
const categoryScores = [
    { instant: 0, standard: 0, wrong: 0 },
    { instant: 0, standard: 0, wrong: 0 },
    { instant: 0, standard: 0, wrong: 0 }
];

// Function to start the quiz
function startQuiz() {
    studentName = document.getElementById('student-name').value;
    if (studentName) {
        uniqueNumber = Math.floor(Math.random() * 1000000);
        startContainer.style.display = 'none';
        quizContent.style.display = 'block';
        renderQuestion();
    } else {
        alert('Please enter your name');
    }
}

// Function to render the question and options
function renderQuestion() {
    const category = questions[currentCategory];
    const question = category.questions[currentQuestion];
    audioElement.src = question.audio;
    imageElement.src = question.image;

    nextBtn.disabled = true;
    timeLeft = 10;
    timeLeftElement.textContent = timeLeft;
    audioElement.play();
    startTimer();
    handleSpeechRecognition();
}

// Function to handle speech recognition
function handleSpeechRecognition() {
    const category = questions[currentCategory];
    const question = category.questions[currentQuestion];
    const expectedAnswer = question.expectedAnswer.toLowerCase();

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
        speechResult.textContent = transcript;

        if (transcript.includes(expectedAnswer)) {
            stopTimer();
            const answerTime = 10 - timeLeft;
            if (answerTime <= 3) {
                instantScore++;
                categoryScores[currentCategory].instant++;
                instantScoreElement.textContent = `Instant Score: ${instantScore}`;
            } else if (answerTime > 3 && answerTime <= 10) {
                standardScore++;
                categoryScores[currentCategory].standard++;
                standardScoreElement.textContent = `Standard Score: ${standardScore}`;
            }
            nextBtn.disabled = false;
            recognition.stop();
        }
    };

    recognition.start();
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft === 0) {
            stopTimer();
            wrongScore++;
            categoryScores[currentCategory].wrong++;
            wrongScoreElement.textContent = `Wrong Score: ${wrongScore}`;
            nextQuestion();
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to move to the next question or category
function nextQuestion() {
    currentQuestion++;
    const category = questions[currentCategory];
    if (currentQuestion < category.questions.length) {
        renderQuestion();
    } else {
        currentCategory++;
        if (currentCategory < questions.length) {
            currentQuestion = 0;
            renderQuestion();
        } else {
            showResult();
        }
    }
}

// Function to show the result
function showResult() {
    quizContent.style.display = 'none';
    resultContainer.style.display = 'block';
    studentDetails.textContent = `Name: ${studentName} | Unique Number: ${uniqueNumber}`;
    finalScore.textContent = `Instant Score: ${instantScore} | Standard Score: ${standardScore} | Wrong Score: ${wrongScore}`;
}

// Function to generate the report
function generateReport() {
    const report = `
        Student Name: ${studentName}
        Unique Number: ${uniqueNumber}
        
        Category 1:
        Instant Score: ${categoryScores[0].instant}
        Standard Score: ${categoryScores[0].standard}
        Wrong Score: ${categoryScores[0].wrong}
        
        Category 2:
        Instant Score: ${categoryScores[1].instant}
        Standard Score: ${categoryScores[1].standard}
        Wrong Score: ${categoryScores[1].wrong}
        
        Category 3:
        Instant Score: ${categoryScores[2].instant}
        Standard Score: ${categoryScores[2].standard}
        Wrong Score: ${categoryScores[2].wrong}
        
        Total:
        Instant Score: ${instantScore}
        Standard Score: ${standardScore}
        Wrong Score: ${wrongScore}
    `;
    
    alert(report);
}

// Add event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
document.getElementById('generate-report-btn').addEventListener('click', generateReport);
