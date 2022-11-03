
let AllQuizzes = [];     /*Variável contendo todos os quizzes*/
let CreatedQuizz = {};  /*Variável contendo objeto para enviar o quizz*/
let CreatedQuizzHelp = {};  /*Variável para adcionar ao objeto para enviar o quizz*/






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
    const AllQuizzList = document.querySelector(".premade_quizzes")

    for (let i = 0; i < AllQuizzes.length; i++ ){
        let ChosenQuizz = AllQuizzes[i]
        AllQuizzList.innerHTML += 
        `   
        <div class="quizz_box">
            <div class="gradient"> </div>
            <img src="${ChosenQuizz.image}" class="quizz-pic">
            <span> ${ChosenQuizz.title}</span>                    
        </div>
        `
    }
}





/*Código para criar um  quizz parte 1*/
function StartQuizz(){

    const QuizzTitle = document.querySelector(".quizz_title").value
    const QuizzImageUrl = document.querySelector(".quizz_url").value
    const QuizzQuestionCount = document.querySelector(".quizz_questions").value
    const QuizzLevels = document.querySelector(".quizz_level").value
    
        CreatedQuizz = { 
        title: QuizzTitle,
        image: QuizzImageUrl,
    }
    console.log(CreatedQuizz)
        /*Código para esconder a primeira tela e mostrar a segunda*/
        const CurrentPage = document.querySelector(".first_screen");
        CurrentPage.classList.add("hidden")
        const NextPage = document.querySelector(".second_screen")
        NextPage.classList.remove("hidden")
}   
