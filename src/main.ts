import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cat Fishing";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// global variables
let numClicks: number = 0;
let isRunning: boolean = false;
let clickRate: number = 1;
const framesPerSecond = 60;
const clickSound = new Audio("/click-sound.wav");

interface Item {
  name: string;
  cost: number;
  rate: number;
  purchases: number;
  description: string;
}

const availableUpgrades: Item[] = [
  {
    name: "Kitten",
    cost: 10,
    rate: 0.1,
    purchases: 0,
    description: "A helping paw",
  },
  {
    name: "Alley Cat",
    cost: 100,
    rate: 2.0,
    purchases: 0,
    description: "Catching fish is a catwalk for this one",
  },
  {
    name: "Captain Cat Sparrow",
    cost: 1000,
    rate: 50,
    purchases: 0,
    description: "A purr-ate captain with a nose for fish and treasure alike",
  },
  {
    name: "Chairman Meow",
    cost: 10000,
    rate: 800,
    purchases: 0,
    description:
      "Leads the revolution of cats with paws of iron. Fish production skyrockets!",
  },
  {
    name: "Cat God",
    cost: 100000,
    rate: 7000,
    purchases: 0,
    description:
      "Worshipped by all felines. Fish appear at the blink of an eye!",
  },
];

// main document elements
const display = document.createElement("p");
const growthRateDisplay = document.createElement("p");
const purchasesDisplay = document.createElement("p");
const buttons = document.createElement("div");
updateDisplay();
app.append(display);
app.append(growthRateDisplay);
app.append(purchasesDisplay);
app.append(buttons);

// button to increase the number of cats
const clickButton = document.createElement("button");
clickButton.innerHTML = `<span class="big-emoji">🐟</span>`;
clickButton.id = "click-button";
app.append(clickButton);
clickButton.onclick = () => {
  numClicks++;
  clickSound.play();
  updateDisplay();
};

function displayUpgradeName(item: Item): string {
  return `
    <span class="item-info">${item.name} ${item.cost.toFixed(2)}</span><br/>
    <span class="item-description">${item.description}</span>
  `;
}

// upgrade buttons
availableUpgrades.map((item: Item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.disabled = true;
  upgradeButton.innerHTML = displayUpgradeName(item);
  upgradeButton.addEventListener("click", () => {
    item.purchases++;
    numClicks -= item.cost;
    item.cost *= 1.15;
    updateDisplay();
    upgradeButton.innerHTML = displayUpgradeName(item);
    clickRate += item.rate;
    if (!isRunning) {
      requestAnimationFrame(incrementNumClicks);
    }
  });
  buttons.append(upgradeButton);

  // Ensure the button is toggled on each frame
  const trackButton = () => {
    upgradeButton.disabled = numClicks < item.cost;
    requestAnimationFrame(trackButton);
  };
  trackButton();
});

function incrementNumClicks() {
  isRunning = true;
  numClicks += clickRate / framesPerSecond;
  updateDisplay();
  requestAnimationFrame(incrementNumClicks);
}

function updateDisplay() {
  display.innerHTML = `${numClicks.toFixed(2)} 🐟`;
  growthRateDisplay.innerHTML = `Growth rate: ${clickRate.toFixed(2)} 🐟/sec`;
  purchasesDisplay.innerHTML = availableUpgrades
    .map((item) => `${item.purchases} ${item.name}`)
    .join(" ");
}
