let htmlEl = document.querySelector("html");
let universalEl = document.querySelector("*");
let viewHighScores = document.querySelector("#view-high-scores");
let headerH1 = document.querySelector("#header-h1");
let quizSection = document.querySelector("#quiz-section");
let quizMainText = document.querySelector(".quiz-main-text");

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

function init() {
  viewHighScores.setAttribute(
    "style",
    " color:#d946ef; padding: 0.5rem; margin-left: 1rem; text-decoration:none;font-size:2rem;"
  );

  headerH1.textContent = "Coding Quiz Challenge";

  headerH1.setAttribute(
    "style",
    "text-align:center;font-weight:bold;font-size:4rem;margin-top:4rem;"
  );

  quizSection.setAttribute(
    "style",
    "display:flex;flex-direction:column;justify-content:center;align-items:center;"
  );

  quizMainText.textContent =
    "Try to answer the following code-related questions withing the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds.";

  quizMainText.setAttribute(
    "style",
    "text-align:center;font-size:2rem;margin-bottom:3rem;"
  );
  let button = document.createElement("button");
  button.textContent = "Start Quiz";
  button.setAttribute(
    "style",
    "text-align:center;font-size:1.6rem;background-color:#581c87;color:#eee; height:4rem; width:10rem; border-radius:0.8rem;"
  );
  quizSection.appendChild(button);
}

init();
