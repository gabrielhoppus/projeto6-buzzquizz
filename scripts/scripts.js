let AllQuizzes = [];     /*Variável contendo todos os quizzes*/


/*Código para buscar todos os Quizzes*/
const PromisseGetQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
PromisseGetQuizz.then(ValidAllQuizzesResponse)

function ValidAllQuizzesResponse(response){
    AllQuizzes = response.data;
    console.log(AllQuizzes)
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
    }

/*Função que manda o id para a url da página de resposta de quiz */
function getQuizz(id){
    const message = encodeURIComponent(id);
    location.href='./html/answer_quiz.html?name=' + message
}