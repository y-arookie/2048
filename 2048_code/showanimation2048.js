/*动画效果*/
function showNumberWidthAnimation(i, j, randNumber) {
    let numberCell = $("#numberCell-" + i + "-" + j);
    numberCell.css("background-color", getNumberCellBackgroundColor(randNumber));
    numberCell.css("color", getNumberCellColor(randNumber));
    numberCell.text(randNumber)
    numberCell.animate({
        width : "100px",
        height : "100px",
        top : getPositionTop(i),
        left : getPositionLeft(j),
    }, 200);
}
function showMoveAnimation(from_row, from_column, to_row, to_column) {
    let numberCell = $("#numberCell-" + from_row + "-" + from_column);
    numberCell.animate({
        top: getPositionTop(to_row),
        left: getPositionLeft(to_column),
    }, 200);
}