const gridContainer = document.getElementById("gridContainer");

const rows = 30;
const cols = 60;
const Rule = 182;
const binary = Rule.toString(2);

function getNeighbourValue(row, col) {
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
function generatePattern() {
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      if (i === 1 && j === 31) {
        gridItem.classList.add("black-cell");
      }
      if (i > 1) {
        const neighbourValue = parseInt(getNeighbourValue(i, j), 2);
        console.log(neighbourValue);
        const power = binary.length - neighbourValue - 1;
        if (binary[power] == 1) {
          gridItem.classList.add("black-cell");
        }
      }
      gridContainer.appendChild(gridItem);
    }
  }
}

generatePattern()