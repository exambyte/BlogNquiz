let quizData = [];

const questions = document.getElementById('qtn');
const option_1 = document.getElementById('option1');
const option_2 = document.getElementById('option2');
const option_3 = document.getElementById('option3');
const option_4 = document.getElementById('option4');
const submit = document.getElementById('submit');
const answers = document.querySelectorAll('.answer');
const showScore = document.querySelector('#showScore');
const previousBtn = document.getElementById('go-back');
const questionArea = document.getElementById('question-area');


let questionCount = 0;
let score = 0;
let inputsId = [];

const startQuiz = () => {
    if(questionCount === 0){
        previousBtn.style.display = "none";
    }
    else if(questionCount === window.quizData.length-1){
        submit.innerText = "Submit";
    }
    else{
        previousBtn.style.display = "block";
        submit.style.display = "block";
    }
    const question_data = window.quizData[questionCount];
    questions.innerText = question_data.question;
    option_1.innerText = question_data.option1;
    option_2.innerText = question_data.option2;
    option_3.innerText = question_data.option3;
    option_4.innerText = question_data.option4;
}

function getCheckAnswer() {
    let answer;
    answers.forEach((currentAnswer) => {
        if (currentAnswer.checked) {
            answer = currentAnswer.id;
        }

    });
    return answer;
}

const deSelectOptions = () => {
    answers.forEach((currentAnswer) => {
        currentAnswer.checked = false;
    })
}


const previousSelection = () => {
    let inputId = inputsId[questionCount];
    document.getElementById(inputId).checked = true;
}


previousBtn.addEventListener('click', () => {
    questionCount -= 1;
    startQuiz();
    let inputId = inputsId[questionCount];
    document.getElementById(inputId).checked = true;

});

const isAlreadySelected = (checkAnswer) => {
    // debugger;
    if (inputsId[questionCount] === undefined) {
        return 0;
    }
    else {
        if (window.quizData[questionCount].answer === checkAnswer) {
            score++;
            return 1;
        }
        else {
            score--;
            return 1;
        }
    }
}


const checkRepeatedAnswer = (checkAnswer) => {
    if (checkAnswer === inputsId[questionCount]) {
        return 0;
    }
    else {
        if (isAlreadySelected(checkAnswer) == 0) {
            inputsId[questionCount] = checkAnswer;
            return 1;
        }
        else {
            inputsId[questionCount] = checkAnswer;
            return 0;
        }
    }

}


submit.addEventListener('click', () => {
    const checkAnswer = getCheckAnswer();
    if (checkRepeatedAnswer(checkAnswer) != 0) {
        // inputsId.push(checkAnswer);
        console.log(inputsId);
        if (checkAnswer === window.quizData[questionCount].answer) {
            score++;
            console.log(score);
        }
    }
    questionCount += 1;
    if (questionCount < window.quizData.length && questionCount >= inputsId.length) {
        deSelectOptions();
        startQuiz();
    }
    else if (questionCount < window.quizData.length && questionCount < inputsId.length) {
        startQuiz();
        previousSelection();
    }
    else {
        questionArea.style.display='none';
        questions.style.display='none';
        showScore.innerHTML = `
               <h3> Your Score:  ${score}/${window.quizData.length} </h3>
               <button class="btn" onclick="location.reload()">Restart</button>
               <h3> Correct: ${score}&nbsp&nbsp&nbsp&nbspIncorrect: ${window.quizData.length - score} </h3>
            `;

        // showScore.classList.remove('scoreArea');
    }

});







const getTestData = async () => {
    let queryString = window.location.href;
    console.log(queryString);
    let slug = queryString.substring(26);
    console.log(slug);
    try {
        const res = await fetch(`/getTestData/${slug}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const data = await res.json();
        if (data) {
            console.log(data);
            window.quizData = data[0].questions;
            console.log(quizData);
            console.log(window.quizData);
            startQuiz();
        }

    } catch (err) {
        console.log(err);
    }
}

getTestData();



