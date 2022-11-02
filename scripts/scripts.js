
let AllQuizzes = [];


/*Código para buscar todos os Quizzes*/
const PromisseGetQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
PromisseGetQuizz.then(ValidAllQuizzesResponse)

function ValidAllQuizzesResponse(response){
    AllQuizzes = response.data;
    console.log(AllQuizzes)
    RenderAllQUizzes()
}

function RenderAllQUizzes(){
    const AllQuizzList = document.querySelector(".premade_quizzes")

    for (let i = 0; i < AllQuizzes.length; i++ ){
        let ChosenQuizz = AllQuizzes[i]
        AllQuizzList.innerHTML += 
        `   

        <div class="quizz_box">
            <img src="${ChosenQuizz.image}" class="quizz-pic">
            <span> ${ChosenQuizz.title}</span>                    
        </div>

        `
    }
}

