
let AllQuizzes = [];


/*Código para buscar todos os Quizzes*/
const PromisseGetQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
PromisseGetQuizz.then(ValidAllQuizzesResponse)

function ValidAllQuizzesResponse(response){
    AllQuizzes = response.data;
    console.log(AllQuizzes)
}

function RenderAllQUizzes(){
    const AllQuizzList = document.querySelector(".all-quizzes")
    AllQuizzList.innerHTML = "";


    for (let i = 0; i > AllQuizzes.length; i++ ){



        
    }






}
