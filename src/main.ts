import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cat-fishing";
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
const costs = {
  A: 10,
  B: 100,
  C: 1000,
};
const framesPerSecond = 60;

const display = document.createElement("p");
const growthRateDisplay = document.createElement("p");
const purchasesDisplay = document.createElement("p");
const buttons = document.createElement("div");
displayCats();
app.append(display);
app.append(growthRateDisplay);
app.append(purchasesDisplay);
app.append(buttons);

// button to increase the number of cats
const clickButton = document.createElement("button");
clickButton.innerHTML = "🐟";
clickButton.id = "click-button";
app.append(clickButton);
clickButton.onclick = () => {
  numClicks++;
  displayCats();
  toggleUpgradeButton();
};

const upgradeButtonA = document.createElement("button");
buttons.append(upgradeButtonA);
upgradeButtonA.disabled = true;

const upgradeButtonB = document.createElement("button");
buttons.append(upgradeButtonB);
upgradeButtonB.disabled = true;

const upgradeButtonC = document.createElement("button");
buttons.append(upgradeButtonC);
upgradeButtonC.disabled = true;

displayUpgrades();

function incrementNumber() {
  isRunning = true;
  toggleUpgradeButton();
  numClicks += clickRate / framesPerSecond;
  displayCats();
  requestAnimationFrame(incrementNumber);
}

upgradeButtonA.addEventListener("click", () => {
  purchases.A++;
  numClicks -= costs.A;
  costs.A *= 1.15;
  displayCats();
  displayUpgrades();
  clickRate += 0.1;
  if (!isRunning) {
    requestAnimationFrame(incrementNumber);
  }
});

upgradeButtonB.addEventListener("click", () => {
  purchases.B++;
  numClicks -= costs.B;
  costs.B *= 1.15;
  displayCats();
  displayUpgrades();
  clickRate += 2.0;
  if (!isRunning) {
    requestAnimationFrame(incrementNumber);
  }
});

upgradeButtonC.addEventListener("click", () => {
  purchases.C++;
  numClicks -= costs.C;
  costs.C *= 1.15;
  displayCats();
  displayUpgrades();
  clickRate += 50;
  if (!isRunning) {
    requestAnimationFrame(incrementNumber);
  }
});

function displayCats() {
  display.innerHTML = `${numClicks.toFixed(2)} fish`;
  growthRateDisplay.innerHTML = `Growth rate: ${clickRate.toFixed(2)} fish/sec`;
  purchasesDisplay.innerHTML = `${purchases.A} Kittens  ${purchases.B} Alley Cats ${purchases.C} Captain Cat Sparrow`;
}

function displayUpgrades() {
  upgradeButtonA.innerHTML = `Kitty ${costs.A.toFixed(2)}`; // want a helping paw?
  upgradeButtonB.innerHTML = `Alley Cat ${costs.B.toFixed(2)}`; // its a big catch
  upgradeButtonC.innerHTML = `Captain Cat Sparrow ${costs.C.toFixed(2)}`; //
}

function toggleUpgradeButton() {
  upgradeButtonA.disabled = numClicks < costs.A;
  upgradeButtonB.disabled = numClicks < costs.B;
  upgradeButtonC.disabled = numClicks < costs.C;
}
