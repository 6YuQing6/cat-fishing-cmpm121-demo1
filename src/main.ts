import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My cat game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// global variables
let numClicks: number = 0;
let isRunning: boolean = false;
let clickRate = 1;
const purchases = {
  A: 0,
  B: 0,
  C: 0,
};
const framesPerSecond = 60;

const display = document.createElement("p");
const growthRateDisplay = document.createElement("p");
const purchasesDisplay = document.createElement("p");
displayCats();
app.append(display);
app.append(growthRateDisplay);
app.append(purchasesDisplay);

// button to increase the number of cats
const clickButton = document.createElement("button");
clickButton.innerHTML = "😼";
app.append(clickButton);
clickButton.onclick = () => {
  numClicks++;
  displayCats();
  toggleUpgradeButton();
};

const upgradeButtonA = document.createElement("button");
upgradeButtonA.innerHTML = "A";
app.append(upgradeButtonA);
upgradeButtonA.disabled = true;

const upgradeButtonB = document.createElement("button");
upgradeButtonB.innerHTML = "B";
app.append(upgradeButtonB);
upgradeButtonB.disabled = true;

const upgradeButtonC = document.createElement("button");
upgradeButtonC.innerHTML = "C";
app.append(upgradeButtonC);
upgradeButtonC.disabled = true;

function incrementNumber() {
  isRunning = true;
  toggleUpgradeButton();
  numClicks += clickRate / framesPerSecond;
  displayCats();
  requestAnimationFrame(incrementNumber);
}

upgradeButtonA.addEventListener("click", () => {
  purchases.A++;
  numClicks -= 10;
  displayCats();
  clickRate += 0.1;
  if (!isRunning) {
    requestAnimationFrame(incrementNumber);
  }
});

upgradeButtonB.addEventListener("click", () => {
  purchases.B++;
  numClicks -= 100;
  displayCats();
  clickRate += 2.0;
  if (!isRunning) {
    requestAnimationFrame(incrementNumber);
  }
});

upgradeButtonC.addEventListener("click", () => {
  purchases.C++;
  numClicks -= 1000;
  displayCats();
  clickRate += 50;
  if (!isRunning) {
    requestAnimationFrame(incrementNumber);
  }
});

function displayCats() {
  display.innerHTML = `${numClicks.toFixed(2)} cats`;
  growthRateDisplay.innerHTML = `Growth rate: ${clickRate.toFixed(2)}`;
  purchasesDisplay.innerHTML = `A: ${purchases.A}  B: ${purchases.B}  C: ${purchases.C}`;
}

function toggleUpgradeButton() {
  upgradeButtonA.disabled = numClicks < 10;
  upgradeButtonB.disabled = numClicks < 100;
  upgradeButtonC.disabled = numClicks < 1000;
}
