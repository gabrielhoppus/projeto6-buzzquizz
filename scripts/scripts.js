let AllQuizzes = [];     /*Variável contendo todos os quizzes*/
let createdQuizzes = []
const listaIds = localStorage.getItem("lista")
let lista = JSON.parse(listaIds)

/*Código para buscar todos os Quizzes*/
const PromisseGetQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
PromisseGetQuizz.then(ValidAllQuizzesResponse)

function ValidAllQuizzesResponse(response){
    AllQuizzes = response.data;
    RenderAllQUizzes()
}


/*Código para renderizar todos os quizzes*/
function RenderAllQUizzes(){
    const AllQuizzList = document.querySelector('.premade_quizzes')
    AllQuizzList.innerHTML = ''
    for (let i = 0; i < AllQuizzes.length; i++ ){
        AllQuizzList.innerHTML += 
        `   
        <div id="${AllQuizzes[i].id}" class="quizz_box" onclick="getQuizz(this.id)">
            <div class="gradient"> </div>
            <img src="${AllQuizzes[i].image}" class="quizz-pic">
            <span> ${AllQuizzes[i].title}</span>                    
        </div>
        `
    }
    const noQuiz = document.querySelector('.no_quizzes')
    const yesQuiz = document.querySelector('.yes_quizzes')
    const userQuiz = document.querySelector('.created_quizzes')
    
    if (lista.length !== 0){
        noQuiz.classList.add('hidden')
        yesQuiz.classList.remove('hidden')
    }

    userQuiz.innerHTML = ""

    for (let i = 0; i < lista.length; i++ ){
        const promisseGetUserQuizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${lista[i]}`)
        promisseGetUserQuizz.then(userData)
        userQuiz.innerHTML += `
            <div class="quizz_box">
                <img src="./assets/Rectangle 36.png">
                <span>O quão Potterhead é você?</span>                    
            </div>
        `
    }

}



/*Função que manda o id para a url da página de resposta de quiz */
function getQuizz(id){
    const message = encodeURIComponent(id);
    location.href='./html/answer_quiz.html?name=' + message
}

