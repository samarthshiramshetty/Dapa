// Define the questions and expected answers
const questions = [
    {
        category: 'Category 1',
        questions: [
            {
                audio: 'question1.mp3',
                image: 'question1.png',
                expectedAnswer: 'Cap'
            },
            {
                audio: 'question2.mp3',
                image: 'question2.png',
                expectedAnswer: 'Wave'
            }
        ]
    },
    {
        category: 'Category 2',
        questions: [
            {
                audio: 'question3.mp3',
                image: 'question3.png',
                expectedAnswer: 'Airplane'
            },
            {
                audio: 'question4.mp3',
                image: 'question4.png',
                expectedAnswer: 'Answer D'
            }
        ]
    },
    {
        category: 'Category 3',
        questions: [
            {
                audio: 'question5.mp3',
                image: 'question5.png',
                expectedAnswer: 'Option Z'
            },
            {
                audio: 'question6.mp3',
                image: 'question6.png',
                expectedAnswer: 'Answer 4'
            }
        ]
    }
];

// Define variables
let currentCategory = 0;
let currentQuestion = 0;
let timeLeft = 8;
let timer;
let incorrectAnswers = 0;
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
const startSpeechBtn = document.getElementById('start-speech-btn');
const resultContainer = document.getElementById('result-container');
const studentDetails = document.getElementById('student-details');
const finalScore = document.getElementById('final-score');

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
    timeLeft = 8;
    timeLeftElement.textContent = timeLeft;
    startTimer();
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
            const answerTime = 8 - timeLeft;
            if (answerTime <= 3) {
                instantScore++;
                instantScoreElement.textContent = `Instant Score: ${instantScore}`;
            } else if (answerTime > 3 && answerTime <= 8) {
                standardScore++;
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

// Add event listener to the Start button
startBtn.addEventListener('click', startQuiz);

// Add event listener to the Start Speech Recognition button
startSpeechBtn.addEventListener('click', handleSpeechRecognition);

// Add event listener to the Next button
nextBtn.addEventListener('click', nextQuestion);
