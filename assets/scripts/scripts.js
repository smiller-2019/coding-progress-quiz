// set up the global variables to get the elements from index.html for display and styling.
let htmlEl = document.querySelector("html");
let universalEl = document.querySelector("*");
let bodyEl = document.querySelector("body");
let mainHeaderItems = document.querySelector("#main-header-items");
let mainHeader = document.querySelector("#main-header");
let viewHighScores = document.querySelector("#view-high-scores");
let timer = document.querySelector("#timer");
let headerH1 = document.querySelector("#header-h1");
// Create the start quiz button to be displayed under the introduction text.
let startButton = document.createElement("button");
let quizSection = document.querySelector("#quiz-section");
let quizMainText = document.querySelector("#quiz-main-text");
let container = document.querySelector("#container");

let questionCount = 0;
let timeLeft = 90;
// create the array for each multiple choice answer
let questionButton = [];
let outOfTime = false;

// add a paragraph element
let message = document.createElement("p");

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
  // mainHeader.setAttribute("style", "display:inline;");
  mainHeaderItems.setAttribute(
    "style",
    "display:flex;justify-content:space-between;"
  );

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
    "text-align:center;font-weight:bold;font-size:4rem;margin-top:4rem;margin-inline:auto;"
  );

  //  apply styling to the quiz section to center the title and introduction text using flex box.
  quizSection.setAttribute(
    "style",
    "display:flex;flex-direction:column;row-gap:0.5rem;justify-content:flex-start;align-items:flex-start;width:80rem;margin-inline:auto;flex-wrap:wrap;"
  );

  // add the introduction text for the starter page
  quizMainText.textContent =
    "Try to answer the following code-related questions withing the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds.";

  // apply styling to the introduction text for the starter page
  quizMainText.setAttribute(
    "style",
    "text-align:center;font-size:2rem;margin-bottom:3rem;"
  );

  startButton.textContent = "Start Quiz";
  startButton.setAttribute(
    "style",
    "text-align:center;font-size:1.6rem;background-color:#581c87;color:#eee; height:4rem; width:10rem; border-radius:0.8rem;margin-inline:auto;"
  );
  // add startButton to quizSection of index.html page.
  quizSection.appendChild(startButton);

  // event listener for start quiz button on starter page
  startButton.addEventListener("click", function (event) {
    let element = event.target;
    if (element.matches("button") === true) {
      // clear the header, introduction message and starter button from the display in preparation for the multiple choice questions display
      headerH1.textContent = "";
      quizMainText.textContent = "";
      quizSection.removeChild(startButton);
      countdown();
      quiz();
    }
  });
}

// function taken from 04-Web APIs activties session 09 and 10.
function countdown() {
  timer.setAttribute("style", "font-size:2rem;");
  // Use the `setInterval()` method to call a function to be executed every second
  let timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timer` to show the remaining seconds
      timer.textContent = "Time: " + timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timer.textContent = "Time: " + "0";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
    }

    // check if the time has ran out, if so disable buttons and clear the
    // display for the allDone function call to display to display initials to be input and record score.
    if (timeLeft < 1 && outOfTime === false) {
      outOfTime = true;
      disableAllButtons();
      clearDisplay(questionButton);
    }
  }, 1000);
}

// quiz function calls the createButton to create the multiple choice answer button function for each question
function quiz() {
  // initialise the array for each multiple choice answer
  questionButton = [];
  if (questionCount < 5 && outOfTime === false) {
    // continue to next question if time is greathan than 1 second
    console.log("calling questionButton ");
    createButtons(questionButton);
  } else {
    // display All Done message, prompt user for initials and display score
    allDone();
  }
}

// create each multiple choice answer button applying styles and checking for the correct or wrong answer selected with an appropriate message.
// clears display for the next question once answer for the current question is selected.
function createButtons(questionButton) {
  console.log("in create buttons");
  //  display the current question
  headerH1.textContent = quizQuestions[questionCount];
  // increase fontsize and align left.
  headerH1.setAttribute("style", "text-align:left;font-size:5rem;");

  for (i = 0; i < 4; i++) {
    // Create the four mutiple choice question buttons to be displayed under the question
    questionButton[i] = document.createElement("button");
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
      "text-align:left;font-size:1.6rem;background-color:#4c1d95;color:#eee; height:5rem; width:20rem; border-radius:0.8rem;"
    );
    quizSection.appendChild(questionButton[i]);
  }

  // Add click event for multichoice 1 button element
  questionButton[0].addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button") === true) {
      // check if the answer is correct.
      questionEvent(0);
      // disable all multichoice buttons.
      disableAllButtons();
    }
  });

  // Add click event for multichoice 2 button element
  questionButton[1].addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button") === true) {
      // check if the answer is correct.
      questionEvent(1);
      // disable all multichoice buttons.
      disableAllButtons();
    }
  });

  // Add click event for multichoice 3 button element
  questionButton[2].addEventListener("click", function (event) {
    let element = event.target;

    if (element.matches("button") === true) {
      // check if the answer is correct.
      questionEvent(2);
      // disable all multichoice buttons.
      disableAllButtons();
    }
  });

  // Add click event for multichoice 4 button element
  questionButton[3].addEventListener("click", function (event) {
    let element = event.target;

    // check if event is a button click
    if (element.matches("button") === true) {
      // check if the answer is correct.
      questionEvent(3);
      // disable all multichoice buttons.
      disableAllButtons();
    }
  });
}

// check multichoice answers are selected for the current question
function questionEvent(question) {
  switch (questionCount) {
    case 0:
      // check the first multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz01[question][1] === "c") {
        answer("Correct!");
      } else {
        answer("Wrong!");
      }
      break;
    case 1:
      // check the second multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz02[question][1] === "c") {
        answer("Correct!");
      } else {
        answer("Wrong!");
      }
      break;
    case 2:
      // check the third multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz03[question][1] === "c") {
        answer("Correct!");
      } else {
        answer("Wrong!");
      }
      break;
    case 3:
      // check the fourth multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz04[question][1] === "c") {
        answer("Correct!");
      } else {
        answer("Wrong!");
      }
      break;
    default:
      // check the fifth multichoice button clicked is correct answer. Display correct or wrong message based on condition
      if (quiz05[question][1] === "c") {
        answer("Correct!");
      } else {
        answer("Wrong!");
      }
  }
}

// disable all buttons on the page once the user has selected their answer to avoid multiple clicks which cause
// multiple button events to trigger at the same time.
function disableAllButtons() {
  questionButton.forEach(function (button) {
    button.setAttribute("disabled", "");
  });
}

// Display the correct message for one second
function answer(answer) {
  // subtract ten points for every wrong answer.
  if (answer === "Wrong!") timeLeft -= 10;

  // set text of paragraph element
  message.textContent = answer;
  // apply style to the paragraph element
  message.setAttribute(
    "style",
    "border-top:0.5rem solid #a3a3a3; color:#a3a3a3; font-size:3rem;font-style:italic;font-weight:bold;width:100rem;"
  );
  // Add the paragaph element to the quiz section in the index.html file
  quizSection.appendChild(message);
  // Display the message for one second then clear the message
  setTimeout(function () {
    message.textContent = "";
    quizSection.removeChild(message);
    message.setAttribute("style", "border-top:none;");
    clearDisplay(questionButton);
  }, 1000);
}

function clearDisplay(questionButton) {
  setTimeout(function () {
    // don't clear header if timer reaches zero as allDonce function header disappears otherwise when on this screen when zero reached.
    if (outOfTime !== true) headerH1.textContent = "";
    // clear the current multiple choice buttons from the display for next question
    quizSection.removeChild(questionButton[0]);
    quizSection.removeChild(questionButton[1]);
    quizSection.removeChild(questionButton[2]);
    quizSection.removeChild(questionButton[3]);
    // }
    // increase questionCount to display the next question
    questionCount += 1;
    // quiz functio will display the next question
    quiz();
  }, 1000);
}

// display All Done message, prompt user for initials and display score
function allDone() {
  //  display the current question
  headerH1.textContent = "All Done!";
  // increase fontsize and align left.
  headerH1.setAttribute("style", "text-align:left;font-size:5rem;");

  // add the final score text for all done page
  quizMainText.textContent = "Your final score is " + timeLeft + ".";
  // apply styling to the introduction text for the starter page

  quizMainText.setAttribute(
    "style",
    "text-align:left;font-size:3rem;margin-bottom:3rem;"
  );

  // create paragraph element for prompt to enter initials.
  let initialsPrompt = document.createElement("p");
  // create textarea element for entering initials.
  let initialsInput = document.createElement("textarea");
  // create button to submit initials for saving to local storage.
  let submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  initialsPrompt.textContent = "Enter initials: ";

  // apply styling to container.
  container.setAttribute(
    "style",
    "display:flex;justify-content:left;align-items:baseline;gap:4rem; width:80rem;"
  );
  // apply styling to enter initials prompt.
  initialsPrompt.setAttribute(
    "style",
    "height:3rem; width:18rem;text-align:left;font-size:3rem;"
  );
  // apply styling to textarea for entering initials.
  initialsInput.setAttribute(
    "style",
    "height:3rem; width:40rem;resize:none;font-size:2rem;vertical-align:middle;"
  );

  initialsInput.setAttribute("autofocus", "autofocus");
  initialsInput.setAttribute("required", "required");

  // apply styling to button for submition of initials and score.
  submitButton.setAttribute(
    "style",
    "height:4rem;width:10rem;background-color:#e879f9; color:#fff;font-size:2rem;border-color:#e879f9;border-radius:1rem;"
  );

  // add <p>, <textarea> and button to container and hence index.html.
  container.appendChild(initialsPrompt);
  container.appendChild(initialsInput);
  container.appendChild(submitButton);

  // save initials and score to local storage when submit button is clicked.
  submitButton.addEventListener("click", function (event) {
    // create user object from submission
    var user = {
      initials: initialsInput.value.trim(),
      score: timeLeft,
    };

    // set new submission to local storage
    localStorage.setItem("user", JSON.stringify(user));

    // call the view_high_scores html page to display initials and score from local storage
    window.location.href = "view_high_scores.html";
  });
}

// call the initialisation function for the starter page.
init();
