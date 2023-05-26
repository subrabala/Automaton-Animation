const gridContainer = document.getElementById("gridContainer");

const rows = 30;
const cols = 60;

const Rule = 182;
const binary = Rule.toString(2);
console.log(binary);
console.log(binary[0]);

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


