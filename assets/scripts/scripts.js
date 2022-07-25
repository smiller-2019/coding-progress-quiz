// set up the global variables to get the elements from index.html for display and styling.
let htmlEl = document.querySelector("html");
let universalEl = document.querySelector("*");
let bodyEl = document.querySelector("body");
let viewHighScores = document.querySelector("#view-high-scores");
let headerH1 = document.querySelector("#header-h1");
let quizSection = document.querySelector("#quiz-section");
let quizMainText = document.querySelector(".quiz-main-text");
let startButton = document.createElement("button");
let questionCount = 0;

// Create a one dimentional array to hold each question
let quizQuestions = [
  "Commonly used datatypes DO NOT include:",
  "The condition in an if/else statement is enclosed with ______",
  "Arrays in Javascript can be used to store ______",
  "String values must be enclosed within ______ when being assigned to variables. ",
  "A very useful tool druing development and debugging for printing content to the debugger is: ",
];

// create the multichoice answers for each of the five questions.
let quiz01 = [
  ["strings", "w"],
  ["booleans", "w"],
  ["alerts", "c"],
  ["numbers", "w"],
];

let quiz02 = [
  ["quotes", "w"],
  ["curly brackets", "w"],
  ["parenthesis", "c"],
  ["square brackets", "w"],
];

let quiz03 = [
  ["numbers and strings", "w"],
  ["other arrays", "w"],
  ["booleans", "w"],
  ["all the above", "c"],
];

let quiz04 = [
  ["commas", "w"],
  ["curly brackets", "w"],
  ["quotes", "c"],
  ["parenthsis", "w"],
];

let quiz05 = [
  ["Javascript", "w"],
  ["terminal/bash", "w"],
  ["for loops", "w"],
  ["console.log", "c"],
];

// create a one dimentional array to hold the multichoice answers and the correct answers for each question
let quizMultiChoiceHolder = [];
// add each multichoice answers for each question to the one dimentional array.
quizMultiChoiceHolder.push(quiz01);
quizMultiChoiceHolder.push(quiz02);
quizMultiChoiceHolder.push(quiz03);
quizMultiChoiceHolder.push(quiz04);
quizMultiChoiceHolder.push(quiz05);

// reset paddings and margins to zero and box-sizing to border box
// The box-sizing will shrink to make space for the padding and borders.
universalEl.setAttribute(
  "style",
  "padding: 0;margin: 0;box-sizing: border-box;"
);

// 10 px / 16px = 0.625%
// 1 rem -> 10 px  easier to calculate
//  percentahge of user's browsers font-size setting
htmlEl.setAttribute("style", "font-size: 62.5%;");

bodyEl.setAttribute(
  "style",
  "background-color: #fff;font-family: Rubik sans-serif;"
);

// starter page for quiz
function init() {
  // display at the top right hand corner of the screen, the link to view the highest scores
  viewHighScores.setAttribute(
    "style",
    " color:#d946ef; padding: 0.5rem; margin-left: 1rem; text-decoration:none;font-size:2rem;"
  );

  // display the title for the starter page
  headerH1.textContent = "Coding Quiz Challenge";

  // apply styling to the title
  headerH1.setAttribute(
    "style",
    "text-align:center;font-weight:bold;font-size:4rem;margin-top:4rem;"
  );

  //  apply styling to the quiz section to center the title and introduction text using flex box.
  quizSection.setAttribute(
    "style",
    "display:flex;flex-direction:column;justify-content:center;align-items:center;width:58rem;margin-inline:auto;"
  );

  // add the introduction text for the starter page
  quizMainText.textContent =
    "Try to answer the following code-related questions withing the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds.";

  // apply styling to the introduction text for the starter page
  quizMainText.setAttribute(
    "style",
    "text-align:center;font-size:2rem;margin-bottom:3rem;"
  );

  // Create the start quiz button to be displayed under the introduction text.

  startButton.textContent = "Start Quiz";
  startButton.setAttribute(
    "style",
    "text-align:center;font-size:1.6rem;background-color:#581c87;color:#eee; height:4rem; width:10rem; border-radius:0.8rem;"
  );
  quizSection.appendChild(startButton);
}

// quiz function calls the createButton to create the multiple choice answer button function for each question
function quiz() {
  // create an array for each multiple choice answer
  let questionButton = [];
  if (questionCount < 5) {
    createButtons(questionButton);
  }
}

// create each multiple choice answer button applying styles and checking for the correct or wrong answer selected with an appropriate message.
// clears display for the next question once answer for the current question is selected.
function createButtons(questionButton) {
  //  display the current question
  headerH1.textContent = quizQuestions[questionCount];
  // increase fontsize and align left.
  headerH1.setAttribute("style", "text-align:left;font-size:5rem;");

  // align-items left and increase width 100rem.
  quizSection.setAttribute(
    "style",
    "justify-content:center;align-items:left;width:100rem;margin-inline:auto;"
  );

  for (i = 0; i < 4; i++) {
    // Create the four mutiple choice question buttons to be displayed under the question
    questionButton[i] = document.createElement("button");
    console.log(i);
    if (questionCount === 0)
      // add the text for the first multiple choice answer
      questionButton[i].textContent = i + 1 + ". " + quiz01[i][0];
    else if (questionCount === 1)
      // add the text for the second multiple choice answer
      questionButton[i].textContent = i + 1 + ". " + quiz02[i][0];
    else if (questionCount === 2)
      // add the text for the third multiple choice answer
      questionButton[i].textContent = i + 1 + ". " + quiz03[i][0];
    else if (questionCount === 3)
      // add the text for the fourth multiple choice answer
      questionButton[i].textContent = i + 1 + ". " + quiz04[i][0];
    // add the text for the fifth multiple choice answer
    else questionButton[i].textContent = i + 1 + ". " + quiz05[i][0];

    questionButton[i].setAttribute(
      "style",
      "display:block;text-align:left;font-size:1.6rem;background-color:#581c87;color:#eee; height:5rem; width:20rem; border-radius:0.8rem;"
    );
    quizSection.appendChild(questionButton[i]);
  }

  // Add click event for multichoice 1 button element
  questionButton[0].addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button") === true) {
      questionEvent(0);
    }
    // clear display
    setTimeout(function () {
      clearDisplay(questionButton);
      // add one to the questionCount for display the correct question
      questionCount += 1;
      quiz();
    }, 1000);
  });

  // Add click event for multichoice 2 button element
  questionButton[1].addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button") === true) {
      questionEvent(1);
    }
    // clear display
    setTimeout(function () {
      clearDisplay(questionButton);
      // add one to the questionCount for display the correct question
      questionCount += 1;
      quiz();
    }, 1000);
  });

  // Add click event for multichoice 3 button element
  questionButton[2].addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button") === true) {
      questionEvent(2);
    }
    // clear display
    setTimeout(function () {
      clearDisplay(questionButton);
      // add one to the questionCount for display the correct question
      questionCount += 1;
      quiz();
    }, 1000);
  });

  // Add click event for multichoice 4 button element
  questionButton[3].addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button") === true) {
      questionEvent(3);
    }

    // clear multiple choice question buttons after one second display
    setTimeout(function () {
      clearDisplay(questionButton);
      // add one to the questionCount for display the correct question
      questionCount += 1;
      quiz();
    }, 1000);
  });
}

// check multichoice answers are selected for the current question
function questionEvent(question) {
  switch (questionCount) {
    case 0:
      // check the first multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz01[question][1] === "c") {
        correct();
      } else {
        wrong();
      }
      break;
    case 1:
      // check the second multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz02[question][1] === "c") {
        correct();
      } else {
        wrong();
      }
      break;
    case 2:
      // check the third multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz03[question][1] === "c") {
        correct();
      } else {
        wrong();
      }
      break;
    case 3:
      // check the fourth multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz04[question][1] === "c") {
        correct();
      } else {
        wrong();
      }
      break;
    default:
      // check the fifth multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz05[question][1] === "c") {
        correct();
      } else {
        wrong();
      }
  }
}

// Display the correct message for one second
function correct() {
  // add a paragraph element
  let message = document.createElement("p");
  // set text of paragraph element
  message.textContent = "Correct!";
  // apply style to the paragraph element
  message.setAttribute(
    "style",
    "border-top:0.5rem solid #a3a3a3; color:#a3a3a3; font-size:3rem;font-style:italic;font-weight:bold;"
  );
  // Add the paragaph element to the quiz section in the index.html file
  quizSection.appendChild(message);
  // Display the message for one second then clear the message
  setTimeout(function () {
    message.textContent = "";
    message.setAttribute("style", "border-top:none;");
  }, 1000);
}

// Display the wrong message for one second
function wrong() {
  // add a paragraph element
  let message = document.createElement("p");
  // set text of paragraph element
  message.textContent = "Wrong!";
  // apply style to the paragraph element
  message.setAttribute(
    "style",
    "border-top:0.5rem solid #a3a3a3; color:#a3a3a3; font-size:3rem;font-style:italic;font-weight:bold;"
  );
  // Add the paragaph element to the quiz section in the index.html file
  quizSection.appendChild(message);
  // Display the message for one second then clear the message
  setTimeout(function () {
    message.textContent = "";
    message.setAttribute("style", "border-top:none;");
  }, 1000);
}

function clearDisplay(questionButton) {
  // clear the current multiple choice buttons from the display for next question
  headerH1.textContent = "";
  quizSection.removeChild(questionButton[0]);
  quizSection.removeChild(questionButton[1]);
  quizSection.removeChild(questionButton[2]);
  quizSection.removeChild(questionButton[3]);
}

// event listener for start quiz button on starter page
startButton.addEventListener("click", function (event) {
  let element = event.target;
  if (element.matches("button") === true) {
    // clear the header, introduction message and starter button from the display in preparation for the multiple choice questions display
    headerH1.textContent = "";
    quizMainText.textContent = "";
    quizSection.removeChild(startButton);
    quiz();
  }
});
// call the initialisation function for the starter page.
init();
