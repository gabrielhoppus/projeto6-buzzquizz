let quizID = ""
let promise = null
let titleSelected = document.querySelector('.quiz_top');
let quizQuestions = document.querySelector('.question_container')
let questions = []
let answer = []
let a = []

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

function RenderQuizz(){
    questions = quizInfo.questions
    for (let i = 0; i < questions.length; i++){
        answer.push(questions[i].answers); 
    }

    titleSelected.innerHTML = `
    <img src="${quizInfo.image}">
    <p>${quizInfo.title}</p>
    `;
    
    for (let i = 0; i < questions.length; i++){
        quizQuestions.innerHTML += 
        `<div class="question_header" style="background-color:${questions[i].color}">
            <span>${questions[i].title}</span>        
        </div>`
        
        for(let j = 0; j < answer.length; j++){
            quizQuestions.innerHTML += `  
            <div class="answers">          
                <div class="question_answer">
                    <img src="${questions[i].answers[j].image}">
                    <p>${questions[i].answers[j].text}</p>
                </div>   
            </div>         
        `;
        }
    }
}