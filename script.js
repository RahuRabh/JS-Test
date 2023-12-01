function playGame(userSelected) {
  let userChoice = userSelected;
  hideAllImages(); // hides all image
  let computerChoice = getComputerChoice();
  displayResult(userChoice, computerChoice);
}
function hideAllImages() {
  let images = document.querySelectorAll(".choices img");
  images.forEach((image) => {
    image.style.display = "none";
  });
}
function getComputerChoice() {
  var choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}
function displayResult(user, computer) {
  var resultcontainer = document.querySelector(".resultcontainer");
  var outcome = {};
  let userScore = parseInt(localStorage.getItem("userScore")) || 0;
  let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    userScore++;
    localStorage.setItem("userScore", userScore);
    outcome = { text: "You Win", subtext: "Against PC" };
    resultcontainer.classList.add(`${user}-selected`);

    setTimeout(() => {
      window.location.href = "winner.html"; // Redirect to winning page
    }, 1000);
  } else if (user === computer) {
    outcome = { text: "TIE UP", subtext: "Against PC" };
  } else {
    computerScore++;
    localStorage.setItem("computerScore", computerScore);
    outcome = { text: "YOU LOST", subtext: "Against PC" };
    resultcontainer.classList.add(`${computer}-selected`);
  }

  resultcontainer.innerHTML = generateResultHTML(user, computer, outcome);
  document.getElementById("c-score").innerText = computerScore;
  document.getElementById("p-score").innerText = userScore;

  var buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      resultcontainer.style.display = "none";
      showAllImages();
    });
  });
  resultcontainer.style.display = "block";
}
function generateResultHTML(user, computer, outcome) {
  let result = `
    <div class="image-result">
      <div class="user-selection">
        <h3>YOU PICKED</h3>
        <img src="images/${user}.svg" alt="USER">
      </div>
      <div class="status-result">
        <h2>${outcome.text}</h2>
        <h4>${outcome.subtext}</h4>
        <button class="btn">Play Again</button>
      </div>
      <div class="computer-section">
        <h3>PC PICKED</h3>
        <img src="images/${computer}.svg" alt="COMPUTER">
      </div>
    </div>`;
  return result;
}

function showAllImages() {
  let images = document.querySelectorAll(".choices img");
  images.forEach((image) => {
    image.style.display = "block";
  });
}

function showRules() {
  document.getElementById("rulesPopup").style.display = "block";
}

function closeRulesPopup() {
  document.getElementById("rulesPopup").style.display = "none";
}

var model = document.querySelector("#rulesModal");
var btn = document.querySelector("#rulesButton");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  model.style.display = "block";
};

span.onclick = function () {
  model.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == model) {
    model.style.display = "none";
  }
};