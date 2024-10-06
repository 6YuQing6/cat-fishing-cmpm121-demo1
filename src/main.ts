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

const clickButton = document.createElement("button");
clickButton.innerHTML = "😼";
app.append(clickButton);
clickButton.onclick = () => {
  numClicks++;
  display.innerHTML = `${numClicks} cats`;
};
