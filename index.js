const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answer-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click" , startGame)
$nextQuestionButton.addEventListener("click" , displayNextQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0

function startGame(){
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion(){
    resetState()

    if(questions.length == currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answers => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button" , "answer")
        newAnswer.textContent = answers.text
        if (answers.correct) {
            newAnswer.dataset.correct = answers.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click" , selectAnswer)
    })
}

function resetState() {
     while($answersContainer.firstChild){
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")

}
function selectAnswer(event) {
    const answerClicked = event.target

    if(answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect") 
    }

    document.querySelectorAll(".answer").forEach(button => {
        if(button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
   const totalQuestion = questions.length
   const perfomance = Math.floor(totalCorrect *100 / totalQuestion)

   let message = ""

   switch (true) {
    case (perfomance >= 90):
        message = "Excelente :)"
        break
    case (perfomance >= 70):
        message = "Muito bom!"
        break
    case (perfomance >= 50):
        message = "Bom"
        break
        default:
        message = "Pode melhorar" 
   }

   $questionsContainer.innerHTML = 
    `
     <p class="final-message">
        Voce acertou ${totalCorrect} de ${totalQuestion} questões!
        <span>Resultado: ${message}</span>
     <p>
     <button onclick=window.location.reload() class="button">
     Refazer teste
     </button>
    `
}

const questions = [
    {
        question: "Qual a capital da França?",
        answers: [
            {text: "<Paris>" , correct: true},
            {text: "<Brasilia>" , correct: false},
            {text: "<Toquio>" , correct: false},
            {text: "<Pequim>" , correct: false},
        ]

       
    } ,

    {
        question: "Quando foi descoberta o Brasil?",
        answers: [
            {text: "<1980>" , correct: false},
            {text: "<1821>" , correct: false},
            {text: "<1500>" , correct: true},
            {text: "<1945>" , correct: false},
        ]
    } ,

    {
        question: "Quem foi o primeiro presidente do Brasil?",
        answers: [
            {text: "<Getulio Vargas>" , correct: false},
            {text: "<Juscelino Kubitschek>" , correct: false},
            {text: "<Deodoro da Fonseca>" , correct: true},
            {text: "<Pedro Alvares Cabral>" , correct: false},
        ]
    },
       
    {
        question: "Em que ano ocorreu a Proclamação da República no Brasil?",
        answers: [
            {text: "<1888>" , correct: false},
            {text: "<1889>" , correct: true},
            {text: "<1891>" , correct: false},
            {text: "<1900>" , correct: false},
        ]
    },

    {
        question: "Qual civilização antiga construiu as pirâmides de Gizé?",
        answers: [
            {text: "<Romanos>" , correct: false},
            {text: "<Gregos>" , correct: false},
            {text: "<Mesopotamios>" , correct: false},
            {text: "<Egicpios>" , correct: true},
        ]
    },

    {
        question: "Qual foi o principal motivo das Cruzadas na Idade Média?",
        answers: [
            {text: "<Expansão do comércio europeu>" , correct: false},
            {text: "<Conquista de novas terras na Ásia>" , correct: false},
            {text: "<Reconquista da Terra Santa (Jerusalém)>" , correct: true},
            {text: "<Difusão da cultura grega>" , correct: false},
        ]
    },

    {
        question: "Em que ano a Segunda Guerra Mundial terminou?",
        answers: [
            {text: "<1943>" , correct: false},
            {text: "<1944>" , correct: false},
            {text: "<1945>" , correct: true},
            {text: "<1946>" , correct: false},
        ]
    },

    {
        question: "Quem descobriu o Brasil em 1500?",
        answers: [
            {text: "<Cristóvão Colombo>" , correct: false},
            {text: "<Vasco da Gama>" , correct: false},
            {text: "<Pedro Álvares Cabral>" , correct: true},
            {text: "<Fernão de Magalhães>" , correct: false},
        ]
    },

    {
        question: "Qual foi o tratado que dividiu as terras descobertas entre Portugal e Espanha?",
        answers: [
            {text: "<Tratado de Versalhes>" , correct: false},
            {text: "<Tratado de Tordesilhas>" , correct: true},
            {text: "<Tratado de Madrid>" , correct: false},
            {text: "<Tratado de Utrecht>" , correct: false},
        ]
    },
]