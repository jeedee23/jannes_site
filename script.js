const sparkButton = document.querySelector("#spark-button");
const resetButton = document.querySelector("#reset-button");
const status = document.querySelector("#spark-status");
const tag = document.querySelector(".tag");

const sparks = [
  "You just powered up the page!",
  "Nice! The website is listening.",
  "Sparkles activated. Keep going!",
  "Boom! New ideas unlocked.",
  "You are the designer now.",
];

let sparkIndex = 0;

const setStatus = (message) => {
  status.textContent = message;
};

sparkButton.addEventListener("click", () => {
  sparkIndex = (sparkIndex + 1) % sparks.length;
  setStatus(sparks[sparkIndex]);
  tag.textContent = "Spark mode on";
  tag.style.background = "#ffe66d";
});

resetButton.addEventListener("click", () => {
  setStatus("Waiting for your spark.");
  tag.textContent = "Welcome, Janne";
  tag.style.background = "#8ad6f7";
  sparkIndex = 0;
});
