
let AllQuizzes = [];     /*Variável contendo todos os quizzes*/
let CreatedQuizz = {};  /*Variável contendo objeto para enviar o quizz*/
let CreatedQuizzHelp = {};  /*Variável para adcionar ao objeto para enviar o quizz*/



let QuizzQuestionCount = ""; /*Variável para contar numero de questoes ao criar o quizz*/
let QuizzLevels = ""; /*Variável para contar numero de niveis ao criar o quizz*/



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
    QuizzQuestionCount = document.querySelector(".quizz_questions").value
    QuizzLevels = document.querySelector(".quizz_level").value
    
        CreatedQuizz = { 
        title: QuizzTitle,
        image: QuizzImageUrl,
    }
        /*Código para esconder a primeira tela e mostrar a segunda*/
        const CurrentPage = document.querySelector(".first_screen");
        CurrentPage.classList.add("hidden")
        const NextPage = document.querySelector(".second_screen")
        NextPage.classList.remove("hidden")
        RenderNumberOfQuestions()
}   


function RenderNumberOfQuestions(){
    let SecondPageList = document.querySelector(".second_screen_questions")

    for(let i = 0 ; i < QuizzQuestionCount; i++ ){

        SecondPageList.innerHTML +=

        `  
        <div class="input_container_question" onclick="SecondPageUnwrapContainer(this)" >
        
        <div class="hidden_container">
            <span>Pergunta ${i+1}</span>
            <img class="expand_questions" src="../assets/expand.png"  >
        </div>
        <div class="wrap_container " >
            <div class="create_question_container">
            <input class="quizz_input quizz_question" type="text" placeholder="Texto da pergunta">
            <input class="quizz_input quizz_background" type="text" placeholder="Cor de fundo da pergunta">
            </div>
            <span>Resposta correta</span>
            <input class="quizz_input quizz_correct " type="text" placeholder="Resposta correta">
            <input class="quizz_input quizz_img" type="text" placeholder="URL da imagem">
            <span>Respostas incorretas</span>
            <input class="quizz_input quizz_incorrect first" type="text" placeholder="Resposta incorreta 1">
            <input class="quizz_input quizz_img" type="text" placeholder="URL da imagem 1">
            <input class="quizz_input quizz_incorrect second" type="text" placeholder="Resposta incorreta 2">
            <input class="quizz_input quizz_img" type="text" placeholder="URL da imagem 2">
            <input class="quizz_input quizz_incorrect third" type="text" placeholder="Resposta incorreta 3">
            <input class="quizz_input quizz_img" type="text" placeholder="URL da imagem 3">   
        </div>
    </div>
        `  
    }
}




function RenderLevelQuantity(){

    const NextPage = document.querySelector(".second_screen")
    NextPage.classList.add("hidden")
    const NextPage2 = document.querySelector(".third_screen")
    NextPage2.classList.remove("hidden")

    let ThirdPageList = document.querySelector(".third_screen_questions")

    for(let i = 0 ; i < QuizzLevels; i++ ){

        ThirdPageList.innerHTML +=

        `  
        <div class="input_container_question">
        <span>Nível ${i+1}</span>
        <div class="wrap_container">
            <div class="create_question_container">
                <input class="quizz_input level_title" type="text" placeholder="Título do nível">
                <input class="quizz_input level_percentage" type="text" placeholder="% de acerto mínima">
                <input class="quizz_input level_url" type="text" placeholder="URL da imagem do nível">
                <input class="quizz_input level_description" type="text" placeholder="Descrição do nível">
            </div>
        </div>       
    </div>
        `  
    }

}




/*function SecondPageUnwrapContainer(Unwraper){
    
    Unwraper.childNodes[3].classList.toggle('hidden')
    console.log(UnwraperHelper)
    
}   */
