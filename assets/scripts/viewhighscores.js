// set up the global variables to get the elements from index.html for display and styling.
let htmlEl = document.querySelector("html");
let universalEl = document.querySelector("*");
let bodyEl = document.querySelector("body");
let headerH1 = document.querySelector("#header-h1");
let quizSection = document.querySelector("#quiz-section");
let quizMainText = document.querySelector(".quiz-main-text");
let container = document.querySelector("#container");
let goBackButton = document.createElement("button");
let clearScoresButton = document.createElement("button");
let clearScores = false;

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

// display the high scores from local storage
function init() {
  // align-items left and increase width 100rem.
  quizSection.setAttribute(
    "style",
    "display:flex;flex-direction:column;justify-content:right;align-items:right;width:58rem;margin-inline:auto;"
  );

  //  display the current question
  headerH1.textContent = "High scores";
  // increase fontsize and align left.
  headerH1.setAttribute("style", "text-align:left;font-size:5rem;");

  // get data from local storage area
  var user = JSON.parse(localStorage.getItem("user"));

  // if clearscores button has not been clicked then display scores
  if (clearScores === false && user != null) {
    // add the initials and final scores for the local storage area
    quizMainText.textContent = user.initials + " " + user.score;
    // apply styling to the introduction text for the starter page

    quizMainText.setAttribute(
      "style",
      "text-align:left;font-size:2rem;margin-bottom:3rem;background-color:#ddd6fe;width:50rem;height:3rem;"
    );
  } else {
    console.log("clear scores");
    quizMainText.remove();
  }

  goBackButton.textContent = "Go back";
  clearScoresButton.textContent = "Clear high scores";

  container.setAttribute(
    "style",
    "display:flex;justify-content:left;align-items:center;gap:4rem; width:80rem; font-size:2rem;"
  );

  goBackButton.setAttribute(
    "style",
    "display:block;text-align:left;font-size:1.6rem;background-color:#4c1d95;color:#eee; height:3rem; width:10rem; border-radius:0.8rem;"
  );

  clearScoresButton.setAttribute(
    "style",
    "display:block;text-align:left;font-size:1.6rem;background-color:#4c1d95;color:#eee; height:3rem; width:15rem; border-radius:0.8rem;"
  );

  container.appendChild(goBackButton);
  container.appendChild(clearScoresButton);
}

// return to index.html when button clicked.
goBackButton.addEventListener("click", function (event) {
  // return to the home page
  window.location.href = "index.html";
});

// clear the scores when button clicked.
clearScoresButton.addEventListener("click", function (event) {
  // clear all scores
  localStorage.clear();
  clearScores = true;
  init();
});

init();
