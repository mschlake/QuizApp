//storage for questions/answers
const STORE = [
  {
    id: 1,
    question: 'How many English league titles has Manchester United won?',
    answer: [
      '24',
      '17',
      '20',
      '15'
    ],
    rightAnswer:
      '20'
  },
  {
    id: 2,
    question: 'What is the original name of Manchester United?',
    answer: [
      'City of Manchester F.C.',
      'F.C. United of Manchester',
      'Newton Heath L&YR F.C.',
      'Manchester United F.C.'
    ],
    rightAnswer:
      'Newton Heath L&YR F.C.'
  },
  {
    id: 3,
    question: 'What player has the most appearances for Manchester United?',
    answer: [
      'Ryan Giggs',
      'Bobby Charlton',
      'Paul Scholes',
      'Bill Foulkes'
    ],
    rightAnswer:
      'Ryan Giggs'
  },
  {
    id: 4,
    question: 'Who is the all-time leading goal scorer at Manchester United?',
    answer: [
      'Dennis Law',
      'Jack Rowley',
      'Wayne Rooney',
      'George Best'
    ],
    rightAnswer:
      'Wayne Rooney'
  },
  {
    id: 5,
    question: 'How many UEFA Champions League/European Cup titles has Manchester United won?',
    answer: [
      '3',
      '4',
      '5',
      '6'
    ],
    rightAnswer:
      '3'
  },
]

// quiz score and question number variables
let totalCorrect = 0;
let questionCount = 0;

// create elements on page
function startPage(qText, aText, bText) {
  return `<h3 class="questionBlock">${qText}</h3>
      <p>${aText}</p>
      <button type="button" class="redButton" id="startButton">${bText}</button>`
}

// render the front page
function renderFrontPage() {
  const questionText = "How much do you know about the Red Devils?"
  const answerText = "Test your knowledge of Manchester United Football Club"
  const buttonText = "Start Quiz";
  $('#questions').empty();
  $('#questions').append(startPage(questionText, answerText, buttonText));
}

//start the quiz
function startQuiz() {
  $('#startButton').on('click', function (event) {
    $('#questions').empty();
    $('#questions').append(
      (findQuestion()
      ));
  updateQuestionCount();
  });
}

//find question
function findQuestion() {
    if (questionCount < STORE.length) {
      return createQAForm(questionCount);
    } else {
      finalSummaryPage();
    }
  }

//render answers
function renderAnswers(answers=[]){
  let answerString = ""
  for(let i=0;i<answers.length;i++){
    answerString += `<input name="choices" type="radio" value="${answers[i]}" />
      <label for="${answers[i]}">${answers[i]}
      </label>`
  }
  return answerString
}

//create the form for question and answer quiz
function createQAForm() {
  $('#questions').empty();
  $('#questions').html(`<form>
    <section>
      <h3 class ="questionBlock">${STORE[questionCount].question}</h3>
      ${renderAnswers(STORE[questionCount].answer)}
    </section>
  </form>
  <button type="button" class="redButton" id="submitButton">Submit</button>`);
  checkAnswer();
}

// check the selected value vs the right answer and run correct/incorrect function 
function checkAnswer() {
  $('#submitButton').on('click', function (event) {
    event.preventDefault();
    let chosen = $('input:checked')
    let ans = chosen.val();
    let correct = STORE[questionCount].rightAnswer;
    if (ans === correct) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  });
}

//display elements, update score, update question count for correct answer
function correctAnswer() {
  $('#questions').empty();
  $('#questions').html(
    `<h3 class="questionBlock">You're answer was correct!</h3>
      <p>Press the "Next" button to view the next question.</p>
      <button type="button" class="redButton" id="nextButton">Next</button>`
  );
  nextQuestion();
  updateTotalCorrect();
}

//display elements and update question count for correct answer
function incorrectAnswer() {
  $('#questions').empty();
  $('#questions').html(
    `<h3 class="questionBlock">You're answer was incorrect. The correct answer was ${STORE[questionCount].rightAnswer}</h3>
    <p>Try another question by clicking the "Next" button.</p>
    <button type="button" class="redButton" id="nextButton">Next</button>`
  );
  nextQuestion();
}

//find the next question on "next" button clik
function nextQuestion() {
  $('#nextButton').on('click', function (event) {
    updateQuestionCount();
    $('#questions').empty();
    $('#questions').append(
      (findQuestion()));
    ;
});
}

// update the Total Correct answer(s) score
function updateTotalCorrect() {
  totalCorrect++;
  $('.totalCorrect').text(totalCorrect)
}

// update the question count
function updateQuestionCount() {
  questionCount++;
  $('.questionCount').text(questionCount)
}

//final page-show user final score with reset quiz button
function finalSummaryPage() {
  $('#questions').empty();
  $('#questions').html(
    `<h3 class="questionBlock">You got ${totalCorrect} out of 5 questions correct.</h3>
    <p>Thank you for taking the quiz! Click "Reset" to  try again!</p>
    <button type="button" class="redButton" id="resetButton">Reset</button>`
  );
  resetQuiz();
}

// reset the Quiz elements
function resetQuiz() {
  $('#resetButton').on('click', function (event) {
    event.preventDefault();    
    renderFrontPage();
    $('.questionCount').text(0);
    $('.totalCorrect').text(0);
  });
}

//runs all the functions
function startQuizApp() {
  startPage();
  renderFrontPage();
  startQuiz();
}

$(startQuizApp);
