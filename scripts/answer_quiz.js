let quizID = ""
let promise = null
let titleSelected = document.querySelector('.quiz_top');
let quizQuestions = document.querySelector('.question');
let container;

let questions = []
let answer = []
let a = []

function Comparator(){
    return Math.random() - 0.5;
}



/*Função que pega a id da url da página e faz a requisição dos dados */
function getId(){
    quizID = window.location.href.split('=')[1]
    promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizID}`)
    promise.then(deuCerto);
    promise.catch(deuruim);
}

function deuCerto(resposta){
    quizInfo = resposta.data;
    RenderQuizz();
}

function deuruim(){
    alert("error")
}

function randomizeList(){
    //função para randomizar os elementos do jogo
    const randomCount = 0.5;
    return Math.random() - randomCount;
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
        `<div class="divider">
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
                    
                <div class="question_answer correct hidden now" onclick="addChoice(this)">
                    <img src="${questions[i].answers[j].image}">
                    <p>${questions[i].answers[j].text}</p>
                </div>   
          
        `;
        } else{
            container[i].innerHTML += `   
                             
                <div class="question_answer incorrect hidden now" onclick="addChoice(this)">
                    <img src="${questions[i].answers[j].image}">
                    <p>${questions[i].answers[j].text}</p>
                </div>   
                   
        `;
        }
        }
    }
}

function addChoice(selected){
   selected.classList.add('selected');
  
   let options = selected.parentNode.parentNode.querySelectorAll('.question_answer');
   console.log(options);
   let scroll = selected.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.question_answer');
   console.log(options);
   for (let i = 0; i < options.length; i++){
    if(!options[i].classList.contains('selected')){
        options[i].classList.add('imgOpacity');
        options[i].classList.remove('hidden');
        scroll[i].classList.remove('now');
    }else{
        scroll[i].classList.remove('now');
    }
}
setTimeout(rollQuestion,2000);
}

function rollQuestion(){
    const nowElement = document.querySelector('.now');
    nowElement.scrollIntoView();
}
