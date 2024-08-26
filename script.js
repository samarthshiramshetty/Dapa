// Define the questions and expected answers
const questions = [
    {
        category: 'Category 1',
        questions: [
            {
                audio: 'cap.mp3',
                image: 'cap.png',
                expectedAnswer: 'Cap',
                scored: false
            },
            {
                audio: 'cap1.mp3',
                image: 'cap.png',
                expectedAnswer: 'App',
                scored: true
            },
            {
                audio: 'sit.mp3',
                image: 'sit.png',
                expectedAnswer: 'Sit',
                scored: false
            },
            {
                audio: 'sit1.mp3',
                image: 'sit.png',
                expectedAnswer: 'it',
                scored: true
            },
            {
                audio: 'bear.mp3',
                image: 'bear.png',
                expectedAnswer: 'Bear',
                scored: false
            },
            {
                audio: 'bear1.mp3',
                image: 'bear.png',
                expectedAnswer: 'air',
                scored: true
            },
            {
                audio: 'paid.mp3',
                image: 'paid.png',
                expectedAnswer: 'paid',
                scored: false
            },
            {
                audio: 'paid1.mp3',
                image: 'paid.png',
                expectedAnswer: 'aid',
                scored: true
            },
            {
                audio: 'rake.mp3',
                image: 'rake.png',
                expectedAnswer: 'rake',
                scored: false
            },
            {
                audio: 'rake1.mp3',
                image: 'rake.png',
                expectedAnswer: 'Take',
                scored: true
            },
            {
                audio: 'farm.mp3',
                image: 'farm.png',
                expectedAnswer: 'farm',
                scored: false
            },
            {
                audio: 'farm1.mp3',
                image: 'farm.png',
                expectedAnswer: 'far',
                scored: true
            }
        ]
    },
    {
        category: 'Category 2',
        questions: [
            {
                audio: 'seed.mp3',
                image: 'seed.png',
                expectedAnswer: 'seed',
                scored: false
            },
            {
                audio: 'seed1.mp3',
                image: 'seed.png',
                expectedAnswer: 'seem',
                scored: true
            },
            {
                audio: 'beak.mp3',
                image: 'beak.png',
                expectedAnswer: 'beak',
                scored: false
            },
            {
                audio: 'beak1.mp3',
                image: 'beak.png',
                expectedAnswer: 'b',
                scored: true
            },
            {
                audio: 'train.mp3',
                image: 'train.png',
                expectedAnswer: 'train',
                scored: false
            },
            {
                audio: 'train1.mp3',
                image: 'train.png',
                expectedAnswer: 'tray',
                scored: true
            },
            {
                audio: 'wave.mp3',
                image: 'wave.png',
                expectedAnswer: 'wave',
                scored: false
            },
            {
                audio: 'wave1.mp3',
                image: 'wave.png',
                expectedAnswer: 'wade',
                scored: true
            },
            {
                audio: 'hat.mp3',
                image: 'hat.png',
                expectedAnswer: 'hat',
                scored: false
            },
            {
                audio: 'hat1.mp3',
                image: 'hat.png',
                expectedAnswer: 'ha ha',
                scored: true
            },
            {
                audio: 'pot.mp3',
                image: 'pot.png',
                expectedAnswer: 'pot',
                scored: false
            },
            {
                audio: 'pot1.mp3',
                image: 'pot.png',
                expectedAnswer: 'pat',
                scored: true
            },
            {
                audio: 'bag.mp3',
                image: 'bag.png',
                expectedAnswer: 'bag',
                scored: false
            },
            {
                audio: 'bag1.mp3',
                image: 'bag.png',
                expectedAnswer: 'bit',
                scored: true
            },
            {
                audio: 'bat.mp3',
                image: 'bat.png',
                expectedAnswer: 'bat',
                scored: false
            },
            {
                audio: 'bat1.mp3',
                image: 'bat.png',
                expectedAnswer: 'bit',
                scored: true
            }
        ]
    },
    {
        category: 'Category 3',
        questions: [
            {
                audio: 'bride.mp3',
                image: 'bride.png',
                expectedAnswer: 'Bride',
                scored: false
            },
            {
                audio: 'bride1.mp3',
                image: 'bride.png',
                expectedAnswer: 'ride',
                scored: true
            },
            {
                audio: 'glad.mp3',
                image: 'glad.png',
                expectedAnswer: 'glad',
                scored: false
            },
            {
                audio: 'glad1.mp3',
                image: 'glad.png',
                expectedAnswer: 'lad',
                scored: true
            },
            {
                audio: 'crate.mp3',
                image: 'crate.png',
                expectedAnswer: 'crate',
                scored: false
            },
            {
                audio: 'crate1.mp3',
                image: 'crate.png',
                expectedAnswer: 'ate',
                scored: true
            },
            {
                audio: 'broom.mp3',
                image: 'broom.png',
                expectedAnswer: 'Broom',
                scored: false
            },
            {
                audio: 'broom1.mp3',
                image: 'broom.png',
                expectedAnswer: 'room',
                scored: true
            },
            {
                audio: 'grass.mp3',
                image: 'grass.png',
                expectedAnswer: 'grass',
                scored: false
            },
            {
                audio: 'grass1.mp3',
                image: 'grass.png',
                expectedAnswer: 'grove',
                scored: true
            },
            {
                audio: 'smell.mp3',
                image: 'smell.png',
                expectedAnswer: 'smell',
                scored: false
            },
            {
                audio: 'smell1.mp3',
                image: 'smell.png',
                expectedAnswer: 'spell',
                scored: true
            },
            {
                audio: 'swim.mp3',
                image: 'swim.png',
                expectedAnswer: 'swim',
                scored: false
            },
            {
                audio: 'swim1.mp3',
                image: 'swim.png',
                expectedAnswer: 'swear',
                scored: true
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
const loadingElement = document.getElementById('loading');
const errorMessageElement = document.getElementById('error-message');

// Initialize category scores
const categoryScores = [
    { instant: 0, standard: 0, wrong: 0 },
    { instant: 0, standard: 0, wrong: 0 },
    { instant: 0, standard: 0, wrong: 0 }
];

// Function to show loading indicator
function showLoading() {
    loadingElement.style.display = 'block';
}

// Function to hide loading indicator
function hideLoading() {
    loadingElement.style.display = 'none';
}

// Function to show error message
function showError(message) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

// Function to hide error message
function hideError() {
    errorMessageElement.style.display = 'none';
}

// Function to start the quiz
function startQuiz() {
    studentName = document.getElementById('student-name').value;
    if (studentName) {
        uniqueNumber = Math.floor(Math.random() * 1000000);
        startContainer.style.display = 'none';
        quizContent.style.display = 'block';
        renderQuestion();
    } else {
        showError('Please enter your name');
    }
}

// Function to render the question and options
function renderQuestion() {
    showLoading();
    hideError();
    const category = questions[currentCategory];
    const question = category.questions[currentQuestion];
    audioElement.src = question.audio;
    imageElement.src = question.image;

    timeLeft = 10;
    timeLeftElement.textContent = timeLeft;
    
    audioElement.oncanplaythrough = function() {
        hideLoading();
        audioElement.play().then(() => {
            startTimer();
            handleSpeechRecognition();
        }).catch(error => {
            console.error("Error playing audio: ", error);
            showError("Error playing audio. Please try again.");
        });
    };

    audioElement.onerror = function() {
        console.error("Error loading audio file: " + audioElement.src);
        showError("Error loading audio. Please try again.");
        hideLoading();
    };

    console.log("Current category:", currentCategory);
    console.log("Current question:", currentQuestion);
}

// Function to handle speech recognition
// Function to handle speech recognition
function handleSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        showError("Your browser doesn't support speech recognition. Please use a modern browser like Chrome.");
        return;
    }

    const category = questions[currentCategory];
    const question = category.questions[currentQuestion];
    const expectedAnswer = question.expectedAnswer.toLowerCase();

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
        speechResult.textContent = transcript;
        console.log("Speech result:", transcript);

        if (transcript.includes(expectedAnswer)) {
            stopTimer();
            const answerTime = 10 - timeLeft;
            
            // Check if it's an even-numbered question (scored)
            if (question.scored) {
                console.log("Correct answer for scored question");
                if (answerTime <= 3) {
                    instantScore++;
                    categoryScores[currentCategory].instant++;
                    instantScoreElement.textContent = `Instant Score: ${instantScore}`;
                    console.log("Instant score updated:", instantScore);
                } else if (answerTime > 5 && answerTime <= 10) {
                    standardScore++;
                    categoryScores[currentCategory].standard++;
                    standardScoreElement.textContent = `Standard Score: ${standardScore}`;
                    console.log("Standard score updated:", standardScore);
                }
            } else {
                console.log("Correct answer for non-scored question");
            }
            
            recognition.stop();
            // Automatically move to the next question
            setTimeout(nextQuestion, 1000); // Wait 1 second before moving to the next question
        }
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error: " + event.error);
        if (event.error === 'not-allowed') {
            document.getElementById('mic-instructions').style.display = 'block';
        }
        showError("Speech recognition error. Please try again.");
    };

    recognition.start();
}

// Function to start the timer
// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft === 0) {
            stopTimer();
            const question = questions[currentCategory].questions[currentQuestion];
            if (question.scored) {
                wrongScore++;
                categoryScores[currentCategory].wrong++;
                wrongScoreElement.textContent = `Wrong Score: ${wrongScore}`;
                console.log("Wrong score updated:", wrongScore);
            } else {
                console.log("Time's up for non-scored question");
            }
            setTimeout(nextQuestion, 1000); // Wait 1 second before moving to the next question
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
document.getElementById('generate-report-btn').addEventListener('click', generateReport);
