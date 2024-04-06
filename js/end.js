const score = localStorage.getItem("score");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
const scoreElm = document.getElementById("score");
const button = document.querySelector("button");
const input = document.querySelector("input");

scoreElm.innerText = score;

const saveHandler = () => {
  if (!input.value || !score) {
    alert("Invalid username or score");
  } else {
    const finalScore = { name: input.value, score };
    highscores.push(finalScore);
    highscores.sort((a, b) => {
      b.score - a.score;
    });
    highscores.splice(10);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    localStorage.removeItem("score");
    window.location.assign("/");
  }
};

button.addEventListener("click", saveHandler);
