import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cat Fishing";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

class GameData {
  private _fishCount: number = 0;
  private _isRunning: boolean = false;
  private _fishPerSecond: number = 1;

  get fishCount(): number {
    return this._fishCount;
  }

  set fishCount(value: number) {
    this._fishCount = value;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }

  set isRunning(value: boolean) {
    this._isRunning = value;
  }
  get fishPerSecond(): number {
    return this._fishPerSecond;
  }

  set fishPerSecond(value: number) {
    this._fishPerSecond = value;
  }
}

// global variables
const gameData = new GameData();
const FRAMES_PER_SECOND = 60;
const COST_MULTIPLIER = 1.15;

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  purchases: number;
  description: string;
}

const availableUpgrades: Upgrade[] = [
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
  gameData.fishCount++;
  updateDisplay();
};

function displayUpgradeName(upgrade: Upgrade): string {
  return `
    <span class="item-info">${upgrade.name} ${upgrade.cost.toFixed(2)}</span><br/>
    <span class="item-description">${upgrade.description}</span>
  `;
}

// upgrade buttons
availableUpgrades.map((upgrade: Upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.disabled = true;
  upgradeButton.innerHTML = displayUpgradeName(upgrade);
  upgradeButton.addEventListener("click", () => {
    upgrade.purchases++;
    gameData.fishCount -= upgrade.cost;
    upgrade.cost *= COST_MULTIPLIER;
    updateDisplay();
    upgradeButton.innerHTML = displayUpgradeName(upgrade);
    gameData.fishPerSecond += upgrade.rate;
    if (!gameData.isRunning) {
      requestAnimationFrame(incrementfishCount);
    }
  });
  buttons.append(upgradeButton);

  // Ensure the button is toggled on each frame
  const trackButton = () => {
    upgradeButton.disabled = gameData.fishCount < upgrade.cost;
    requestAnimationFrame(trackButton);
  };
  trackButton();
});

function incrementfishCount() {
  gameData.isRunning = true;
  gameData.fishCount += gameData.fishPerSecond / FRAMES_PER_SECOND;
  updateDisplay();
  requestAnimationFrame(incrementfishCount);
}

function updateDisplay() {
  display.innerHTML = `${gameData.fishCount.toFixed(2)} 🐟`;
  growthRateDisplay.innerHTML = `Growth rate: ${gameData.fishPerSecond.toFixed(2)} 🐟/sec`;
  purchasesDisplay.innerHTML = availableUpgrades
    .map((upgrade) => `${upgrade.purchases} ${upgrade.name}`)
    .join(" ");
}
