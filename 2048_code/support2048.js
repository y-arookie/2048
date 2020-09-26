/*底层支撑*/
function getPositionTop(i) {
    return 20 + i * 120;
}
function getPositionLeft(j) {
    return 20 + j * 120;
}
function getNumberCellBackgroundColor(numberCell_value) {
//    根据值的不同改变背景色
    switch (numberCell_value) {
        case 2 : return "#eee4da";
        case 4 : return "#ede0c8";
        case 8 : return "#f2b179";
        case 16:return "#f65e3b";
        case 32:return "#edcf72";
        case 64:return "#edcc61";
        case 128:return "#bfa";
        case 256:return "#33b5e5";
        case 512:return "#09c";
        case 1024:return "#a6c";
        case 2048:return "#93c";
    }
    return "black";

}
function getNumberCellColor(numberCell_value) {
        if (numberCell_value <= 4){
            return "#776e65";
        }
        else {
            return "white";
        }
}
function noSpace(board) {
//    遍历棋盘, 如果有空位置则返回false
    let row = board.length;
    let column = board[0].length;
    for (let i = 0; i < row; i++)
        for (let j = 0; j < column; j++){
            if (board[i][j] === 0){
                return false;
            }
        }
    return true;
}
function noMove(board) {
    return !(canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board));

}
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++)
        for (let j = 1; j < 4; j++){
            if (board[i][j] !== 0){
                if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]){
                    return true;
                }
            }
        }
    return false;
}
function canMoveUp(board) {
    for (let i = 1; i < 4; i++)
        for (let j = 0; j < 4; j++){
            if (board[i][j] !== 0){
                if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]){
                    return true;
                }
            }
        }
    return false;
}
function canMoveRight(board) {
    for (let i = 0; i < 4; i++)
        for (let j = 2; j >= 0; j--){
            if (board[i][j] !== 0){
                if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]){
                    return true;
                }
            }
        }
    return false;
}
function canMoveDown(board) {
    for (let i = 2; i >= 0; i--)
        for (let j = 0; j < 4; j++){
            if (board[i][j] !== 0){
                if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]){
                    return true;
                }
            }
        }
    return false;
}
function noBlockHorizental(row, column1, column2, board) {
//    column2 是要移动到的位置， column1是当前的位置
//    遍历，如果有值不为0，那么说明有障碍物，不能移动
      for (let i = column2 + 1; i < column1; i++){
          if (board[row][i] !== 0){
              return false;
          }
      }
      return true;
}
function noBlockVertical(row1, column, row2, board) {
//    row2 是要移动到的位置， row1是当前的位置
//    遍历，如果有值不为0，那么说明有障碍物，不能移动
    for (let i = row2 + 1; i < row1; i++){
        if (board[i][column] !== 0){
            return false;
        }
    }
    return true;
}
function isGameOver() {
    if (noSpace(board) && noMove(board)){
        gameOver();
    }
    isSuccess(board);
}
function gameOver() {
    alert("Game Over!");
}
function isSuccess() {
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++){
            if (board[i][j] === 2048){
                alert("Congratulation!");
            }
        }
}