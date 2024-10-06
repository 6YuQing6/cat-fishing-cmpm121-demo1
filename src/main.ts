import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My cat game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const display = document.createElement("p");
let numClicks: number = 0;
displayCats();
app.append(display);

// button to increase the number of cats
const clickButton = document.createElement("button");
clickButton.innerHTML = "😼";
app.append(clickButton);
clickButton.onclick = () => {
  numClicks++;
  displayCats();
  upgradeButton.disabled = numClicks < 10;
};

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Upgrade";
app.append(upgradeButton);
upgradeButton.disabled = true;

upgradeButton.onclick = () => {
  numClicks -= 10;
  displayCats();
  requestAnimationFrame(incrementNumber);
};

const clickRate = 1;
const framesPerSecond = 60;
const incrementRate = clickRate / framesPerSecond;
const startTime = performance.now();
function incrementNumber() {
  upgradeButton.disabled = numClicks < 10;
  const currentTime = performance.now();
  const deltaTime = currentTime - startTime;
  if (deltaTime / 1000 >= 1 / framesPerSecond) {
    numClicks += incrementRate;
    displayCats();
  }
  requestAnimationFrame(incrementNumber);
}

function displayCats() {
  display.innerHTML = `${numClicks.toFixed(2)} cats`;
}
