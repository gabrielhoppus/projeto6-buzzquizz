let quizID = ""
let promise = null
let titleSelected = document.querySelector('.quiz_top');
let quizQuestions = document.querySelector('.question');
let resultQuizz = document.querySelector('.result_container');
let container;
let attempts = 0;
let success = 0;
let questions = []
let answer = []
let a = []
let click = 0;

function Comparator(){
    return Math.random() - 0.5;
}



/*Função que pega a id da url da página e faz a requisição dos dados */
function getId(){
    quizID = window.location.href.split('=')[1]
    promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizID}`)
    promise.then(deuCerto);
    promise.catch(deuruim);
    return quizID
}

function deuCerto(resposta){
    quizInfo = resposta.data;
    RenderQuizz();
}

function deuruim(){
    alert("error")
}

function RenderQuizz(){
    questions = quizInfo.questions;
   
    for (let i = 0; i < questions.length; i++){
        answer.push(questions[i].answers); 
    }

    titleSelected.innerHTML = `
    <div class="shader"></div>
    <img src="${quizInfo.image}">
    <p>${quizInfo.title}</p>
    `;
    

    
    for (let i = 0; i < questions.length; i++){
    questions[i].answers.sort(Comparator)
        quizQuestions.innerHTML += 
        `<div class="divider now">
            <div class="question_header" style="background-color:${questions[i].color}">
                <span>${questions[i].title}</span>        
            </div>
            <div class="answers">
            </div>
        </div>
        `
        list = answer[i]
        let container = document.querySelectorAll('.answers');

        for(let j = 0; j < list.length; j++){
        if(list[j].isCorrectAnswer === true){
            container[i].innerHTML += `   
                    
                <div class="question_answer correct hidden" onclick="addChoice(this)">
                    <img src="${questions[i].answers[j].image}">
                    <p>${questions[i].answers[j].text}</p>
                </div>
        `;
        } else{
            container[i].innerHTML += `   
                <div class="question_answer incorrect hidden" onclick="addChoice(this)">
                    <img src="${questions[i].answers[j].image}">
                    <p>${questions[i].answers[j].text}</p>
                </div>   
        `;
        }
        }
    }
}

function addChoice(selected){
    currentQuestion = document.querySelector(".now")
    currentQuestion.classList.remove("now")
    selected.classList.add('selected');
    if(selected.classList.contains('correct')){
    success++;
    }
    attempts++;
    let options = selected.parentNode.parentNode.querySelectorAll('.question_answer');
    let scroll = selected.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.question_answer');
    for (let i = 0; i < options.length; i++){
        if(!options[i].classList.contains('selected')){
            options[i].classList.add('imgOpacity');
            options[i].classList.remove('hidden');
        }
}
setTimeout(scrollQuestion,2000);
setTimeout(upLevel,2000);
}

function scrollQuestion(){
    const nowElement = document.querySelector('.now');
    nowElement.scrollIntoView();
}

function quizzReload(){
    window.location.reload()
}

function upLevel(){
if(attempts === quizInfo.questions.length) {
        const result = Math.round((success/attempts)*100);

        for(let i = quizInfo.levels.length - 1; i > -1; i--) {
            if (result >= quizInfo.levels[i].minValue) {

        resultQuizz.innerHTML += `
            <div class="result_header">
                        <p>${result}% de acerto: ${quizInfo.levels[i].title}</p>
                    </div>
                    <div class="result_body">
                        <img src="${quizInfo.levels[i].image}">
                        <p>${quizInfo.levels[i].text}</p>
                    </div>

                    <div class="final_container">
                <button class="restart_btn" onclick="quizzReload();">Reiniciar Quizz</button>
                <span class="home_btn" onclick="location.href='../index.html'">Voltar pra home</span>
            </div>
            `;

const final = document.querySelector('.result_container');

function scrollResult() {
    final.scrollIntoView();
}

setTimeout(scrollResult, 2000);

break;
            }
        }
    }
}



