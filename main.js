let questions = [
    {
      text: "What is the correct way to start a PHP block of code?",
      choices: [
        "<php>",
        "<?php>",
        "<?PHP>",
        "<script>"
      ],
      answer: 2
    },
    {
      text: "Which of the following is not a correct way to create a variable in PHP?",
      choices: [
        "$my_variable = 'hello';",
        "my_variable = 'hello';",
        "define('my_variable', 'hello');",
        "$myVariable = 'hello';"
      ],
      answer: 2
    },
    {
      text: "Which of the following is not a correct way to access an element of an array in PHP?",
      choices: [
        "$myArray[0]",
        "$myArray['key']",
        "$myArray.0",
        "$myArray.key"
      ],
      answer: 4
    },
    {
        text: "What is the correct way to end a PHP block of code?",
        choices: [
          "?>",
          "</php>",
          "</script>",
          "None of the above"
        ],
        answer: 1
      },
      {
        text: "Which of the following is not a correct way to include a file in a PHP script?",
        choices: [
          "include('myfile.php');",
          "require_once('myfile.php');",
          "import 'myfile.php';",
          "include_once 'myfile.php';"
        ],
        answer: 3
      }  
  ];

  const question = document.getElementById('question');
  const choices = Array.from(document.getElementsByClassName('choice-text'));
  const progressText = document.getElementById('progressText');
  const scoreText = document.getElementById('score');
  const progressBarFull = document.getElementById('progressBarFull');
  const scoreDiv = document.getElementById('score1');
  // buttons 
  const startQ = document.getElementById('start-quiz');
  const quitQ = document.getElementById('quit-quiz');

  // page 
  const guide = document.getElementById('guide');
  const quiz = document.getElementById('game');
  const result = document.getElementById('result');


  // directions divs 
  const toStep1 = document.getElementById('to-second-fill1');
  const toStep2 = document.getElementById('to-third-fill2');
  const secondStep = document.getElementById('second-step');
  const thirdStep = document.getElementById('third-step');
  const thirdStepIcon = document.getElementById('third-step-icon');
  const secondStepIcon = document.getElementById('second-step-icon');




startQ.addEventListener('click',function(){
  guide.classList.remove('active');
  quiz.classList.add('active');
  guide.classList.add('hide');
  toStep1.style.width ='100%';
  setTimeout(function () {
    secondStep.style.backgroundColor="rgb(0, 166, 255)";
    secondStepIcon.style.color="white";
  },500);
});

quitQ.addEventListener('click',function(){
  location.reload();
});

  let correctanswer=0;
  let questioncounter=0;
  let score=0;
  const total=questions.length;
  let questionIndex = Math.floor(Math.random() * questions.length);
  
  showQuestion(questionIndex);
  
  function showQuestion(index){
    console.log(index);(((total-questions.length) / total) * 100)
      question.innerText=questions[index].text;
      question.setAttribute("data-answer",questions[index].answer);
      for(let i=0;i<4;i++){
        choices[i].innerText=questions[index].choices[i];
      }
      questions.splice(index,1);
  }

  function getAnswer(param){
        choices.forEach(choice => {
        choice.setAttribute("disabled",true);
      });
      let answer = question.dataset["answer"];
      if(param==answer){
        choices[param-1].classList.add("correct");
        correctanswer++;
        score+=10;
        scoreText.innerText = score;
        
      }else{
        choices[param-1].classList.add("incorrect");
        choices[answer-1].classList.add("correct");
        
      }
      choices.forEach(choice => {
        if(choice.dataset['number'] != param && choice.dataset['number'] != answer){
            choice.parentElement.classList.add("hidden");
        }
      });
      progressBarFull.style.width=(((total-questions.length) / total) * 100)+'%';
      if(questions.length == 0){
        setTimeout(function(){
          choices.forEach(choice => {
             choice.classList.remove("incorrect");
              choice.classList.remove("correct");
              choice.parentElement.classList.remove("hidden");});
              quiz.classList.remove('active');
              quiz.classList.add('hide');
              result.classList.add('active');
              scoreDiv.innerText=score+"/"+ total*10;

          },1500);
          toStep2.style.width ='100%';
          setTimeout(function () {
            thirdStep.style.backgroundColor="rgb(0, 166, 255)";
            thirdStepIcon.style.color="white";
          },500);
       
      }else{
        setTimeout(function(){
    choices.forEach(choice => {
       choice.classList.remove("incorrect");
        choice.classList.remove("correct");
        choice.parentElement.classList.remove("hidden");
      
    });
    questionIndex = Math.floor(Math.random() * questions.length);
    showQuestion(questionIndex)},1500);
      }
  
  }

