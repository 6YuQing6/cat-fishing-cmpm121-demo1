import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My great game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let numClicks = 0;
const clickButton = document.createElement("button");
clickButton.innerHTML = "😼";
app.append(clickButton);
clickButton.onclick = () => {
  numClicks++;
  clickButton.innerHTML = `😼 ${numClicks}`;
};
