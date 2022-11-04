
    /*funçao para testar se url é válido */
	const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i'); 
    return !!urlPattern.test(urlString);

    }


let AllQuizzes = [];     /*Variável contendo todos os quizzes*/
let CreatedQuizz = {};  /*Variável contendo objeto para enviar o quizz*/
let CreatedQuizzHelp = {};  /*Variável para adcionar ao objeto para enviar o quizz*/



let QuizzQuestionCount = 0; /*Variável para contar numero de questoes ao criar o quizz*/
let QuizzLevels = 0; /*Variável para contar numero de niveis ao criar o quizz*/





/*Código para buscar todos os Quizzes*/
const PromisseGetQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
PromisseGetQuizz.then(ValidAllQuizzesResponse)

function ValidAllQuizzesResponse(response){
    AllQuizzes = response.data;
    RenderAllQUizzes()
}


/*Código para renderizar todos os quizzes*/
function RenderAllQUizzes(){
    if(window.location.pathname.startsWith('/index')){
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
        
        /*Condiçao em que todos os valores sao válidos*/
        if(QuizzTitle.length > 20  && isValidUrl(QuizzImageUrl) && QuizzQuestionCount >= 3 &&  QuizzLevels >= 2) {
            
        /*Código para esconder a primeira tela e mostrar a segunda tela*/
        const CurrentPage = document.querySelector(".first_screen");
        CurrentPage.classList.add("hidden")
        const NextPage = document.querySelector(".second_screen")
        NextPage.classList.remove("hidden")
        RenderNumberOfQuestions()
}
    else{
        alert("algum dos parametros está incorreto, preencha corretamente.")
    }

}   

        /*Código para renderizar a página de criaçao de perguntas da terceira tela*/
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
            <input class="quizz_input quizz_question" id="QuestionText" type="text" placeholder="Texto da pergunta">
            <input class="quizz_input quizz_background" id="QuestionBackgroundColor" type="text" placeholder="Cor de fundo da pergunta">
            </div>
            <span>Resposta correta</span>
            <input class="quizz_input quizz_correct " id="RightAnswerText" type="text" placeholder="Resposta correta">
            <input class="quizz_input quizz_img" type="text" id="RightUrl" placeholder="URL da imagem">
            <span>Respostas incorretas</span>
            <input class="quizz_input quizz_incorrect first" id="WrongAnswer" type="text" placeholder="Resposta incorreta 1">
            <input class="quizz_input quizz_img" type="text" id="WrongUrl"  placeholder="URL da imagem 1">
            <input class="quizz_input quizz_incorrect second" id="WrongAnswer"  type="text" placeholder="Resposta incorreta 2">
            <input class="quizz_input quizz_img" type="text" id="WrongUrl" placeholder="URL da imagem 2">
            <input class="quizz_input quizz_incorrect third" id="WrongAnswer"  type="text" placeholder="Resposta incorreta 3">
            <input class="quizz_input quizz_img" type="text" id="WrongUrl" placeholder="URL da imagem 3">   
        </div>
    </div>
        `  
    }
}

function CheckIfOkSecondPageOk(){
    let QuestionAproved = 0
    let BackgroundAproved = 0
    let RightAnswerAproved = 0
    let RightUrlAproved = 0


    /* parte para chegar se a pergunta é válida*/
    const QuestionText = document.querySelectorAll("#QuestionText")
    console.log(QuestionText)
        
        for (let i = 0 ; i < QuestionText.length ; i++){
            if (QuestionText[i].value.length < 20){
                alert("erro QuestionAproved")
            }
            else{
                QuestionAproved = 1
            }
        }
        /* parte para chegar se o  background é válido*/
        const QuestionBackgroundColor = document.querySelectorAll("#QuestionBackgroundColor")
        console.log(QuestionBackgroundColor)
        for (let i = 0 ; i < QuestionBackgroundColor.length ; i++){
            if (QuestionBackgroundColor[i].value.includes("#") && QuestionBackgroundColor[i].value.length == 7 ){
                BackgroundAproved = 1
            }
            else{
                BackgroundAproved = 0
                alert("erro BackgroundAproved")
            }
        }
        /* parte para chegar se a resposta correta é válida*/
        const RightAnswerText = document.querySelectorAll("#RightAnswerText")
        console.log(RightAnswerText)

        for (let i = 0 ; i < RightAnswerText.length ; i++){
            if (RightAnswerText[i].value === ""){
                alert("erro RightAnswerAproved")
            }
            else{
                RightAnswerAproved = 1
            }
        }

        /* parte para chegar se o  url da resposta correta é válido*/
        const RightUrl = document.querySelectorAll("#RightUrl")
        console.log(RightUrl)
        for (let i = 0 ; i < RightUrl.length ; i++){
            if ( isValidUrl(QuizzImageUrl[i].value) ){
                RightUrlAproved = 1
            }
            else{
                RightUrlAproved = 0
                alert("erro RightUrlAproved")
            }
        }

}















        /*Código para renderizar a página de criaçao de niveis da terceira tela*/
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

    
}   */

/*Função que manda o id para a url da página de resposta de quiz */
function getQuizz(id){
    const message = encodeURIComponent(id);
    location.href='./html/answer_quiz.html?name=' + message
}