import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
const loader = document.getElementById("loader");
const errorElm = document.getElementById("error");
const container = document.getElementById("container");
const scoreText = document.getElementById("score");
const questionText = document.getElementById("question-text");
const answersList = document.querySelectorAll(".answer-text");
const nextBtn = document.querySelector("#next-btn");
const finishBtn = document.querySelector("#finish-btn");
const questionNum = document.querySelector("#question-num");

let questionIndex = 0;
let formattedData = null;
let correct_answer = null;
let score = 0;
let is_Accepted = true;
let correct_bonus = 10;
const fetchData = async () => {
  try {
    const result = await fetch(URL);
    const json = await result.json();
    formattedData = formatData(json.results);
    start();
  } catch (err) {
    loader.style.display = "none";
    errorElm.style.display = "block";
  }
};

const showQuestion = () => {
  questionNum.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correct_answer = correctAnswerIndex;
  questionText.innerText = question;
  answersList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const start = () => {
  showQuestion();
  container.style.display = "block";
  loader.style.display = "none";
};

const checkAnswer = (event, index) => {
  if (!is_Accepted) return;
  is_Accepted = false;
  if (index === correct_answer) {
    event.target.classList.add("correct");
    score += correct_bonus;
    scoreText.innerHTML = score;
  } else {
    event.target.classList.add("incorrect");
    answersList[correct_answer].classList.add("correct");
  }
};
const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("/end.html");
};
const nextHandler = () => {
  if (questionIndex < formattedData.length - 1) {
    is_Accepted = true;
    removeClasses();
    questionIndex++;
    showQuestion();
  } else {
    finishHandler();
  }
};
const removeClasses = () => {
  answersList.forEach((button) => {
    button.className = "answer-text";
  });
};
window.addEventListener("load", fetchData);
nextBtn.addEventListener("click", nextHandler);
finishBtn.addEventListener("click", finishHandler);
answersList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
