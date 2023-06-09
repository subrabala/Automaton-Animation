const gridContainer = document.getElementById("gridContainer");
const form = document.getElementById("numberForm");
const input = document.getElementById("input");

const rows = 30;
const cols = 60;
let value = 0;

// on giving input, trigger generateFunction
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const Rule = parseInt(input.value, 10);
  console.log(Rule);
  generatePattern(Rule);
  input.value = "";
});

// if dark mode, change the background color
const toggleSwitch = document.getElementById("toggleSwitch");
toggleSwitch.addEventListener("change", function () {
  value = toggleSwitch.checked ? 1 : 0;
  console.log("Toggle switch value:", value);
  if (
    value
      ? (gridContainer.style.backgroundColor = "black")
      : (gridContainer.style.backgroundColor = "white")
  );
});

// returns the binary value of the above three cells
function getNeighbourValue(row, col) {
  // if dark-mode, consider black as 1 and white as 0 while giving binary value
  if (value === 0) {
    const getCellColor = (r, c) =>
      gridContainer.children[(r - 1) * cols + c - 1]?.classList.contains(
        "black-cell"
      )
        ? "1"
        : "0";
    const topLeft = getCellColor(row - 1, col - 1);
    const top = getCellColor(row - 1, col);
    const topRight = getCellColor(row - 1, col + 1);
    return topLeft + top + topRight;
  } 
  // if dark-mode, consider white as 0 and black as 1 while giving binary value
  // to maintain uniformity in binary values logic
  else if (value === 1) {
    const getCellColor = (r, c) =>
      gridContainer.children[(r - 1) * cols + c - 1]?.classList.contains(
        "white-cell"
      )
        ? "0"
        : "1";
    const topLeft = getCellColor(row - 1, col - 1);
    const top = getCellColor(row - 1, col);
    const topRight = getCellColor(row - 1, col + 1);
    return topLeft + top + topRight;
  }
}

// checks if the neighbourValue in decimal form gives 0 or 1 as a final value to the next-gen cell
function generatePattern(Rule) {
  gridContainer.innerHTML = "";
  let binary = Rule.toString(2);

  console.log(binary);
  for (let i = 1; i <= rows; i++) {
    setTimeout(() => {
      for (let j = 1; j <= cols; j++) {
        setTimeout(() => {
          const gridItem = document.createElement("div");
          gridItem.classList.add("grid-item");
          if (i === 1 && j === 31) {
            if (value === 0) {
              gridItem.classList.add("black-cell");
            }
            if (value === 1) {
              gridItem.classList.add("white-cell");
            }
          }

          if (i > 1) {
            if (i === 1 && j === 31) {
              if (value === 0) {
                gridItem.classList.add("black-cell");
              } else if (value === 1) {
                gridItem.classList.add("white-cell");
              }
            } else {
              const neighbourValue =
                value === 0
                  ? parseInt(getNeighbourValue(i, j), 2)
                  : binary.length - 1 - parseInt(getNeighbourValue(i, j), 2);
              const power = binary.length - neighbourValue - 1;
              if (binary[power] === "1") {
                if (value === 0) {
                  gridItem.classList.add("black-cell");
                } else if (value === 1) {
                  gridItem.classList.add("white-cell");
                }
              }
              if (i < 4) console.log(neighbourValue);
            }
          }

          gridContainer.appendChild(gridItem);
        }, 700);
      }
    }, 500);
  }
}
