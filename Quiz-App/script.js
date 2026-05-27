let questions = [
    {
       "question": "Wer hat HTML erfunden",
       "answer_1": "Robbie Williams",
       "answer_2": "Lady Gaga",
       "answer_3": "Tim Berners-Lee",
       "answer_4": "Justin Bieber",
       "right_answer": 3,
    },

    {   
        "question": "Was bedeutet CPU",
        "answer_1": "Cost per unit",
        "answer_2": "Conversion per unit",
        "answer_3": "Central processing university",
        "answer_4": "Cenral processing unit",
        "right_answer": 4,
    },

    {
        "question": "Wie wird CSS vollständig ausgeschrieben",
        "answer_1": "Contact search subscription",
        "answer_2": "Cascading style sheets",
        "answer_3": "Correlating style search",
        "answer_4": "Controlling search suprise",
        "right_answer": 2,
    },

    {
        "question": "Was ist eine MAC Adresse",
        "answer_1": "Media acess control",
        "answer_2": "More adress control",
        "answer_3": "Medium assist control",
        "answer_4": "Moderate acess controll",
        "right_answer": 1,
    },

];

let rightQuestions = 0;

let currentQuestion = 0;

let AUDIO_SUCCESS = new Audio('audio/right.wav'); // sound wurde als variable definiert.

let AUDIO_FAIL = new Audio('audio/wrong.wav'); // sound wurde als variable definiert.

function init() {
    document.getElementById('all-questions').innerHTML = questions.length; //hiermit holen wir uns die länge des arrays questions

    showQuestion();
}

function showQuestion() {

    if(currentQuestion >= questions.length) {
    // show end screen
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none'; // wenn currentquestion den gleichen wert wie die länge von dem json array hat wird enstprechendes display zugefügt zum Anzeigen oder ausblenden.

    document.getElementById('amount-of-questions').innerHTML = questions.length; // Länge des array also Zahl der Fragen wird angezeigt.
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions; // Variable wird gesetzt damit die richtigen Fragen Zusammengezählt werden können mit ++ Befehl.
    document.getElementById('header-image').src = 'img/trophy.png'; // img sird mit diesem Befehl geändert.
    }
    else { // Show Question
    
    let percent = (currentQuestion + 1) / questions.length * 100; // Zahl wird ausgerechnet für % +1 weil wir im array bei null anfangen und sonst nie 100% in Progress Bar erreichen.
    percent = Math.round(percent); // Ein Befehl um Zahlen zu runden.

    document.getElementById('progress-bar').innerHTML = `${percent}%`; // Variable wird eingesetzt.
    document.getElementById('progress-bar').style = `width:${percent}%`; // Wir ändern so den style nach und nahc mit der Variable.

    console.log('Fortschritt', percent);

    let question = questions[currentQuestion]; //Variable wird gesetzt damit wir auslesen können questions ist array und currentQuestion haben wir oben mit null definiert.
    
    document.getElementById('question-number').innerHTML = currentQuestion + 1; // Die Null ist definiert und wird immer um eins erhöht in der Funktion nextQuestion.

    document.getElementById('questionText').innerHTML = question['question']; //wir greifen auf die Id questionText und greifen auf container 0 in der section question zu. (Wer hat Html erfunden)
    document.getElementById('answer_1').innerHTML = question['answer_1']; // wir greifen auf die Id zu und haben question dem array zugeteilt mit dem wert current question 0 also nullter container an der stelle answer_1
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];

    }
}

function answer(selection) { // Variable gesetzt damit erkannt wird bei welcher antwort wir sind
    let question = questions[currentQuestion]; // wir greifen auf json array zu auf container 0 questions ist array und currentQuestion hat den Wer Null
    console.log('Selected answer is', selection); // Angeklickte Auswahl wird angezeigt und wurde registriert
    let selectedQuestionNumber = selection.slice(-1); //der letzte Buchstabe bzw Zahl der Auswahl wird gespeichert deswegen selection wo answer_1 usw und auch right_answer im html code drinsteht.
    console.log('selectedQuestionNumber is', selectedQuestionNumber); // hier wird der gespeicherte Wert bzw die Auwahl angezeigt. Damit wir diesen Nachher mit dem richtigen Wert vergleichen können.
    console.log('Current question is', question['right_answer']); // Hier wird der richtige Wert definiert heißt wieder in Container 0 wird auf den Wert right_answer zugegriffen.(Wert drei wie oben definiert)

    let IdOfRightAnswer = `answer_${question['right_answer']}`; //verlinkung der richtigen Variable die oben als question right answer definiert ist damit man nicht answer_3 nehmen muss.

    if(selectedQuestionNumber == question['right_answer']) { // Wenn selectedQuestionNumber den Wert 3 hat dann wird richtig angezeigt, Oder wenn ein anderer Wert vorhanden ist dann wird falsch angezeigt.
        console.log('Richtige Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-success'); //parent note heßt wir ordnen die css Klasse dem höher gestellten generierten html code zu. selection Weil dort answer_3 drinne steht.
        AUDIO_SUCCESS.play(); // Audio wird mit dem befehl play() gespielt audio wurde oben als variable definiert
        rightQuestions++;
    }   else{
        console.log('Falsche Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // klasse wird hinzugefügt damit button rot wird
        document.getElementById(IdOfRightAnswer).parentNode.classList.add('bg-success'); // klasse wird hinzugefügt damit grün wird
        AUDIO_FAIL.play(); // Audio wird mit dem befehl play() gespielt audio wurde oben als variable definiert.
    }
    document.getElementById('next-Button').disabled = false; // next Button die Eigenschaft disabled wird wieder rausgenommen mit false.
}

function nextQuestion() {
    currentQuestion++; // Variable 0 wird um 1 immer erhöht damit nächste Frage aus dem Json aufgrufen werden kann.
    document.getElementById('next-Button').disabled = true; // Button wird bei der nächsten Frage wieder disabled damit man nicht ohne Antwort weiter klicken kann.
    resetAnswerButtons(); // Die Antwroten werden mit dieser Funktion resettet bzw ausgegraut siehe untere Funktion
    showQuestion(); // die Näcshte Frage wird angezeigt als letztes, damit alles buttons usw resettet sind. Rein Logische Abfolge.
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger'); // entfernt die vorgefertigte klasse mit farbe rot
    document.getElementById('answer_1').parentNode.classList.remove('bg-success'); // entfernt die vorgefertigte klasse mit farbe grün
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/Pencil.jpg'; // Bild wird wieder zurückgesetzt
    document.getElementById('questionBody').style = ''; // Question Body wieder anzeigen
    document.getElementById('endScreen').style = 'display: none'; // End Screen ausblenden

    rightQuestions = 0; // right questions wird wieder auf null gesetzt damit richtige Antworten wieder gezählt werden können.
    currentQuestion = 0; // current question wird wieder auf null gesetzt damit die erste Frage wieder angezeigt wird. Da wir dort eine Variable gesetzt haben die sich mit onclick um 1 immer erhöht.
    init();

}