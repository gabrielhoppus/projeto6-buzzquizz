let CreatedQuizz = {};  /*Variável contendo objeto para enviar o quizz*/
let CreatedQuizzHelp = {};  /*Variável para adcionar ao objeto para enviar o quizz*/
let QuizzQuestionCount = 0; /*Variável para contar numero de questoes ao criar o quizz*/
let QuizzLevels = 0; /*Variável para contar numero de niveis ao criar o quizz*/
let QuizzTitle = ''
let QuizzImageUrl = ''
let quizData = {
    title: "",
    image: "",
    questions: [],
    levels: []
    }

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

/*Código para criar um  quizz parte 1*/
function StartQuizz(){
    QuizzTitle = document.querySelector(".quizz_title").value
    QuizzImageUrl = document.querySelector(".quizz_url").value
    QuizzQuestionCount = document.querySelector(".quizz_questions").value
    QuizzLevels = document.querySelector(".quizz_level").value
    quizData.title = QuizzTitle;
    quizData.image = QuizzImageUrl
        
    /*Condiçao em que todos os valores sao válidos*/
    /*If tá funcionando eu arrumei testei (gabriel)*/
    if( QuizzTitle.length > 20      && 
        QuizzTitle.length < 65      &&
        isValidUrl(QuizzImageUrl)   && 
        QuizzQuestionCount >= 3     &&  
        QuizzLevels >= 2) {
    /*Código para esconder a primeira tela e mostrar a segunda tela*/
        const CurrentPage = document.querySelector(".first_screen");
        CurrentPage.classList.add("hidden")
        const NextPage = document.querySelector(".second_screen")
        NextPage.classList.remove("hidden")
        RenderNumberOfQuestions()


        for (let i = 0; i < QuizzQuestionCount; i++){
            quizData.questions.push(
                {
                    title: "",
                    color: "",
                    answers: [
                        {
                            text: "",
                            image: "",
                            isCorrectAnswer: true
                        },
                        {
                            text: "",
                            image: "",
                            isCorrectAnswer: false
                        }
                    ]
                })
        }
        
        for (let i = 0; i < QuizzLevels; i++){
            quizData.levels.push(
                {
                    title: "",
                    image: "",
                    text: "",
                    minValue: 0
                })
        }
        return QuizzTitle, QuizzImageUrl
}
    else{
        alert("Algum dos parametros está incorreto, preencha corretamente.")
    }  
}   

/*Código para renderizar a página de criaçao de perguntas da terceira tela*/
function RenderNumberOfQuestions(){
    let SecondPageList = document.querySelector(".second_screen_questions")

    for(let i = 0 ; i < QuizzQuestionCount; i++ ){
        SecondPageList.innerHTML += `  
        <div class="input_container_question">  
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
                <input class="quizz_input correct_img" type="text" id="RightUrl" placeholder="URL da imagem">
                <span>Respostas incorretas</span>
                <input class="quizz_input quizz_incorrect first" id="firstIncorrect" type="text" placeholder="Resposta incorreta 1">
                <input class="quizz_input incorrect_img first_image" type="text" id="firstImage"  placeholder="URL da imagem 1">
                <input class="quizz_input quizz_incorrect second" id="secondIncorrect"  type="text" placeholder="Resposta incorreta 2">
                <input class="quizz_input incorrect_img second_image" type="text" id="secondImage" placeholder="URL da imagem 2">
                <input class="quizz_input quizz_incorrect third" id="thirdIncorrect"  type="text" placeholder="Resposta incorreta 3">
                <input class="quizz_input incorrect_img third_image" type="text" id="thirdImage" placeholder="URL da imagem 3">   
            </div>
        </div>`  
    }
}

let QuestionAproved = false
let BackgroundAproved = false
let RightAnswerAproved = false
let RightUrlAproved = false
let WrongAnswerAproved = false
let WrongUrlAproved = false

/*Função que faz as checagens da segunda página */
function CheckIfOkSecondPageOk(){
    /*Checa se cada pergunta está no tamanho requerido*/
    const QuestionText = document.querySelectorAll(".quizz_question")   

    for (let i = 0 ; i < QuestionText.length ; i++){
        if (QuestionText[i].value.length >= 20){
            QuestionAproved = true
            quizData.questions[i].title = QuestionText[i].value

        }
        else{
            QuestionAproved = false
        }
    }

    /* parte para checar se o o valor da cor é válido*/
    const QuestionBackgroundColor = document.querySelectorAll(".quizz_background")
    for (let i = 0 ; i < QuestionBackgroundColor.length ; i++){
        if (QuestionBackgroundColor[i].value.includes("#") && 
            QuestionBackgroundColor[i].value.length === 7 ){
            BackgroundAproved = true
            quizData.questions[i].color = QuestionBackgroundColor[i].value
        }
        else{
            BackgroundAproved = false
        }
    }

    /* parte para checar se a resposta correta é válida*/
    const RightAnswerText = document.querySelectorAll(".quizz_correct")
    for (let i = 0 ; i < RightAnswerText.length ; i++){
        if (RightAnswerText[i].value !== ""){
            RightAnswerAproved = true
            quizData.questions[i].answers[0].text = RightAnswerText[i].value
        }
        else{
            RightAnswerAproved = false
        }
    }

    /* parte para checar se o  url da resposta correta é válido*/
    const RightUrl = document.querySelectorAll(".correct_img")
    for (let i = 0 ; i < RightUrl.length ; i++){
        if (isValidUrl(RightUrl[i].value)){
            RightUrlAproved = true
            quizData.questions[i].answers[0].image = RightUrl[i].value
        }
        else{
            RightUrlAproved = false
        }
    }

    const firstImage = document.querySelectorAll(".first_image");
    const secondImage = document.querySelectorAll(".second_image");
    const thirdImage = document.querySelectorAll(".third_image");
    const firstIncorrect = document.querySelectorAll(".first");
    const secondIncorrect = document.querySelectorAll(".second");
    const thirdIncorrect = document.querySelectorAll(".third");

    for (let i = 0 ; i < firstImage.length ; i++){
        if (firstIncorrect[i].value !== "" && 
            isValidUrl(firstImage[i].value)){
            WrongUrlAproved = true
            WrongAnswerAproved = true
            quizData.questions[i].answers[1].text = firstIncorrect[i].value
            quizData.questions[i].answers[1].image = firstImage[i].value
        }else{
            WrongUrlAproved = false
            WrongAnswerAproved = false
        }
    }

    for (let i = 0 ; i < secondImage.length ; i++){
        if (secondIncorrect[i].value !== ""){
            if (isValidUrl(secondImage[i].value)){
                WrongUrlAproved = true
                WrongAnswerAproved = true
            }else{
                WrongUrlAproved = false
                WrongAnswerAproved = false
            }
        }else if(isValidUrl(secondImage[i].value)){
            if (secondIncorrect[i].value !== ""){
                WrongUrlAproved = true
                WrongAnswerAproved = true
            }else{
                WrongUrlAproved = false
                WrongAnswerAproved = false
            }
        }
        if (WrongUrlAproved === true && WrongAnswerAproved === true){
            quizData.questions[i].answers.push(
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                }
                )
            quizData.questions[i].answers[2].text = secondIncorrect[i].value
            quizData.questions[i].answers[2].image = secondImage[i].value
        }
    }

    for (let i = 0 ; i < thirdImage.length ; i++){
        if (thirdIncorrect[i].value !== ""){
            if (isValidUrl(thirdImage[i].value)){
                WrongUrlAproved = true
                WrongAnswerAproved = true
            }else{
                WrongUrlAproved = false
                WrongAnswerAproved = false
            }
        }else if (isValidUrl(thirdImage[i].value)){
            if (thirdIncorrect[i].value !== ""){
                WrongUrlAproved = true
                WrongAnswerAproved = true
            }else{
                WrongUrlAproved = false
                WrongAnswerAproved = false
            }
        }
        if (WrongUrlAproved === true && WrongAnswerAproved === true){
            quizData.questions[i].answers.push(
                {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                }
                )
            quizData.questions[i].answers[3].text = thirdIncorrect[i].value
            quizData.questions[i].answers[3].image = thirdImage[i].value
        }
    }


    for (let i = 0; i < quizData.questions.length; i++){
            if (quizData.questions[i].answers[2].text == '' ||
                quizData.questions[i].answers[2].image == ''){
                quizData.questions[i].answers.splice(2,2)
            }else if (quizData.questions[i].answers[3].text == '' ||
            quizData.questions[i].answers[3].image == ''){
                quizData.questions[i].answers.splice(3,1)
            }
        }
    



        if (QuestionAproved === true &&
            BackgroundAproved === true &&
            RightAnswerAproved === true &&
            RightUrlAproved === true &&
            WrongAnswerAproved === true &&
            WrongUrlAproved === true ){
            RenderLevelQuantity()
        }
        else{
            alert("Error - Por favor insira informações válidas")
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
        ThirdPageList.innerHTML += `  
        <div class="input_container_question">
            <span>Nível ${i+1}</span>
            <div class="wrap_container">
                <div class="create_question_container">
                    <input class="quizz_input level_title" id="levelText" type="text" placeholder="Título do nível">
                    <input class="quizz_input level_percentage level${i+1}" id="levelPercentage" type="text" placeholder="% de acerto mínima">
                    <input class="quizz_input level_url" id="levelUrl" type="text" placeholder="URL da imagem do nível">
                    <input class="quizz_input level_description" id="levelDescription" type="text" placeholder="Descrição do nível">
                </div>
            </div>       
        </div>`  
    }
    document.querySelector(".level1").placeholder = "0%";
}

let levelTextValid = false
let levelPercentageValid = false
let levelUrlValid = false
let levelDescriptionValid = false


function validateLevels(){
    const levelText = document.querySelectorAll(".level_title")        
    for (let i = 0 ; i < levelText.length ; i++){
        if (levelText[i].value.length >= 10){
            levelTextValid = true
            quizData.levels[i].title = levelText[i].value         
        }
        else{
            levelTextValid = false
        }
    }

    const levelPercentage = document.querySelectorAll(".level_percentage")
    for (let i = 0 ; i < levelPercentage.length ; i++){
        levelPercentage[0].value = 0
        if (levelPercentage[i].value >= 0 && 
            levelPercentage[i].value <= 100 &&
            levelPercentage[i].value !== "")
            {
            levelPercentageValid = true
            quizData.levels[i].minValue = Number(levelPercentage[i].value)       
        }else{
            levelPercentageValid = false
        }
    }

    const levelUrl = document.querySelectorAll(".level_url")
    for (let i = 0 ; i < levelUrl.length ; i++){
        if (isValidUrl(levelUrl[i].value)){
            levelUrlValid = true
            quizData.levels[i].image = levelUrl[i].value         
        }
        else{
            levelUrlValid = false
        }
    }

    const levelDescription = document.querySelectorAll(".level_description")
    for (let i = 0 ; i < levelDescription.length ; i++){
        if (levelDescription[i].value.length >= 30){
            levelDescriptionValid = true
            quizData.levels[i].text = levelDescription[i].value
        }
        else{
            levelDescriptionValid = false
        }
    }

    if (levelTextValid === true &&
        levelPercentageValid === true &&
        levelUrlValid === true &&
        levelDescriptionValid === true)
        {
            confirmQuizz()
    }else{
        alert("Error - Por favor insira informações válidas")
    }
}


function confirmQuizz(){
    const thirdPage = document.querySelector(".third_screen")
    thirdPage.classList.add("hidden")
    const finishPage = document.querySelector(".finish_screen")
    finishPage.classList.remove("hidden")
    let finishedInfo = document.querySelector(".finish_box")
    finishedInfo.innerHTML = `
    <img src="${QuizzImageUrl}">
    <span>${QuizzTitle}</span>`
    postQuizz()
}

function postQuizz(){
    let promisseSendQuizz = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizData)
    promisseSendQuizz.then(promisseQuizzOk)
    promisseSendQuizz.catch(promisseQuizzError)
}

function returnHome(){
    const CurrentPage = document.querySelector(".first_screen");
    const finishPage = document.querySelector(".finish_screen");
    const finishedInfo = document.querySelector(".finish_box");
    const SecondPageList = document.querySelector(".second_screen_questions");
    const ThirdPageList = document.querySelector(".third_screen_questions");
    CurrentPage.classList.remove("hidden");
    finishPage.classList.add("hidden");
    finishedInfo.innerHTML = "";
    SecondPageList.innerHTML = "";
    ThirdPageList.innerHTML = "";
    window.location.href='../index.html';
}

let meuQuizzId = ""
let listaIds = ""
let lista = []
let listaIdsSerializada = ""
let listaJson = []

function promisseQuizzOk(response){
    let meuQuizz = response.data; /* objeto do quizz*/
    meuQuizzId = meuQuizz.id; /* id do quiz que vc criou*/
    quizData = {
        title: QuizzTitle,
        image: QuizzImageUrl,
        questions: [],
        levels: []
        };

    lista.push(meuQuizzId)
    listaIds = localStorage.getItem("lista")
    listaJson = JSON.parse(listaIds)
    listaIdsSerializada = JSON.stringify(lista)
    localStorage.setItem("lista", listaIdsSerializada)

    return meuQuizzId
}

function promisseQuizzError(){
    alert("Não foi possível enviar sua mensagem, tente novamente");
    window.location.reload();
    quizData = {
        title: QuizzTitle,
        image: QuizzImageUrl,
        questions: [],
        levels: []
        };
}   


function accessQuizz(){
    const CurrentPage = document.querySelector(".first_screen");
    const finishPage = document.querySelector(".finish_screen");
    const finishedInfo = document.querySelector(".finish_box");
    const SecondPageList = document.querySelector(".second_screen_questions");
    const ThirdPageList = document.querySelector(".third_screen_questions");
    CurrentPage.classList.remove("hidden");
    finishPage.classList.add("hidden");
    finishedInfo.innerHTML = "";
    SecondPageList.innerHTML = "";
    ThirdPageList.innerHTML = "";
    window.location.href='../index.html';
    location.href='../html/answer_quiz.html?name=' + meuQuizzId
}





















/*function SecondPageUnwrapContainer(Unwraper){
    
    Unwraper.childNodes[3].classList.toggle('hidden')
    console.log(UnwraperHelper)
    
}   */