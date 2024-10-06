import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My great game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const display = document.createElement("p");
let numClicks: number = 0;
display.innerHTML = `${numClicks} cats`;
app.append(display);

// button to increase the number of cats
const clickButton = document.createElement("button");
clickButton.innerHTML = "😼";
app.append(clickButton);
clickButton.onclick = () => {
  numClicks++;
  display.innerHTML = `${numClicks} cats`;
};

// increases the number of cats every second
setInterval(incrementNumClicks, 1000);

function incrementNumClicks() {
  numClicks++;
  display.innerHTML = `${numClicks} cats`;
}
