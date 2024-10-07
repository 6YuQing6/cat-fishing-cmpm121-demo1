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
let clickRate: number = 1;

interface Item {
  name: string;
  cost: number;
  rate: number;
  purchases: number;
}

const availableCats: Item[] = [
  {
    name: "Kitten",
    cost: 10,
    rate: 0.1,
    purchases: 0,
  },
  {
    name: "Alley Cat",
    cost: 100,
    rate: 2.0,
    purchases: 0,
  },
  {
    name: "Captain Cat Sparrow",
    cost: 1000,
    rate: 50,
    purchases: 0,
  },
];

const framesPerSecond = 60;

// main document elements
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
};

// upgrade buttons
availableCats.map((item: Item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.disabled = true;
  upgradeButton.innerHTML = `${item.name} ${item.cost.toFixed(2)}`;
  upgradeButton.addEventListener("click", () => {
    console.log("clicked");
    item.purchases++;
    numClicks -= item.cost;
    item.cost *= 1.15;
    displayCats();
    upgradeButton.innerHTML = `${item.name} ${item.cost.toFixed(2)}`;
    clickRate += item.rate;
    if (!isRunning) {
      requestAnimationFrame(incrementNumber);
    }
  });
  buttons.append(upgradeButton);

  // Add logic to toggle this specific button
  const toggleUpgradeButtonForItem = () => {
    upgradeButton.disabled = numClicks < item.cost;
  };

  // Ensure the button is toggled on each frame
  const trackButton = () => {
    toggleUpgradeButtonForItem();
    requestAnimationFrame(trackButton); // Continuously track
  };
  trackButton();
});

function incrementNumber() {
  isRunning = true;
  numClicks += clickRate / framesPerSecond;
  displayCats();
  requestAnimationFrame(incrementNumber);
}

function displayCats() {
  display.innerHTML = `${numClicks.toFixed(2)} fish`;
  growthRateDisplay.innerHTML = `Growth rate: ${clickRate.toFixed(2)} fish/sec`;
  purchasesDisplay.innerHTML = availableCats
    .map((item) => `${item.purchases} ${item.name}`)
    .join(" ");
}
