/*游戏逻辑*/
// 4 * 4的游戏格子
let board = [];
// 游戏分数
let score = 0;
// 用来记录该位置是否发生过碰撞
let hasConflicted = [];
$(function () {
    newGame();
})
function newGame() {
//    初始化棋盘格
//    在随机两个格子生成数字
    init();
}
function init() {
    for(let i = 0 ; i < 4 ; i ++)
        for (let j = 0 ; j < 4 ; j++){
            let gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPositionTop(i) + "px");
            gridCell.css("left",getPositionLeft(j) + "px");
        }
    //将棋盘的数据初始化，保存在board中
    for (let i = 0; i < 4; i++){
        board[i] = [];
        hasConflicted[i] = [];
        for (let j = 0; j < 4; j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
    generateOneNumber();
    generateOneNumber();
    // 分数初始化
    score = 0;
}
//
//根据 board的值，对前端的numberCell进行操作
function updateBoardView() {
    // 初始化把之前的数字格子删除
    $(".numberCell").remove();
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++){
            //引号嵌套要交替使用
            //创建新的数字格子
            $("#grid-container").append( '<div class="numberCell" id="numberCell-' + i + '-' +j+ '"></div>' );
            let theNumberCell = $("#numberCell-" + i + "-" + j);
            if (board[i][j] === 0){
                //设置大小为 0
                theNumberCell.css("width", 0);
                theNumberCell.css("height", 0);
                //将位置放在中间
                theNumberCell.css("top", getPositionTop(i) + 50);
                theNumberCell.css("left", getPositionLeft(j) + 50);
            }
            else{
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPositionTop(i));
                theNumberCell.css("left", getPositionLeft(j));
                //背景色会根据数字的不同而不同
                theNumberCell.css("background-color", getNumberCellBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberCellColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            // 初始化碰撞记录
            hasConflicted[i][j] = false;
        }
}
function generateOneNumber() {
//    先判断有没有空间了
    if (noSpace(board)){
        return false;
    }
    //随机生成一个位置
    let random_x = Number(Math.floor(Math.random() * 4));
    let random_y = Number(Math.floor(Math.random() * 4));
    while (true){
        if (board[random_x][random_y] === 0){
            break;
        }
        random_x  = Number(Math.floor(Math.random() * 4));
        random_y = Number(Math.floor(Math.random() * 4));
    }
    let randomNumber = Math.random() > 0.5? 2 : 4;
    board[random_x][random_y] = randomNumber;
    showNumberWidthAnimation(random_x, random_y, randomNumber);
    return true;
}
$(function () {
    $(document).keydown(function (event) {
        switch (event.keyCode){
            case 37 : // left
        //        先判断还有没有向右的空间，再操作
                if (moveLeft()){
                    setTimeout("generateOneNumber()", 100);
                    setTimeout("isGameOver()", 300);
                }
                break;
            case 38 :
                // up
                if (moveUp()){
                    setTimeout("generateOneNumber()", 100);
                    setTimeout("isGameOver()", 300);
                }
                break;
            //    right
            case 39 :
                if (moveRight()){
                    setTimeout("generateOneNumber()", 100);
                    setTimeout("isGameOver()", 300);
                }
                break;
            //    down
            case 40 :
                if (moveDown()){
                    setTimeout("generateOneNumber()", 100);
                    setTimeout("isGameOver()", 300);
                }
                break;
            default :
                break;

        }

    })
})
function moveLeft() {
    if (!canMoveLeft(board)){
        return false;
    }
//    moveLeft
//    向左移动需要从最左列开始移动
    for (let i = 0; i < 4; i++)
        for (let j = 1; j < 4; j++){
            // 如果该位置需要移动
            if (board[i][j] !== 0){
                // 寻找可以移动的位置
                // 从左向右查找可以插入的位置
                for (let k = 0; k < j; k++){
                    if (board[i][k] === 0 && noBlockHorizental(i, j, k, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[i][k] === board[i][j] && noBlockHorizental(i, j, k, board) && !hasConflicted[i][k]){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += +board[i][k];
                        hasConflicted[i][k] = true;
                        break;

                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    updateScore();
    return true;
}
function moveRight() {
    if (!canMoveRight(board)){
        return false;
    }
//    moveLeft
//    向右移动需要从最右列开始移动
    for (let i = 0; i < 4; i++)
        for (let j = 2; j >= 0; j--){
            // 如果该位置需要移动
            if (board[i][j] !== 0){
                // 寻找可以移动的位置
                // 从右向左查找可以插入的位置
                for (let k = 3; k > j; k--){
                    if (board[i][k] === 0 && noBlockHorizental(i, k, j, board)){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[i][k] === board[i][j] && noBlockHorizental(i, k, j, board) && !hasConflicted[i][k]){
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += +board[i][k];
                        hasConflicted[i][k] = true;
                        break;

                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    updateScore();
    return true;
}
function moveUp() {
//    先判断能不能走
    if (!canMoveUp(board)){
        return false;
    }
//    move
    for (let i = 1; i < 4; i++)
        for (let j = 0; j < 4; j++){
            if (board[i][j] !== 0){
                for (let k = 0; k < i; k++){
                    if (board[k][j] === 0 && noBlockVertical(i, j, k, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[k][j] === board[i][j] && noBlockVertical(i, j, k, board) && !hasConflicted[k][j]){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += +board[k][j];
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    updateScore();
    return true;
}
function moveDown() {
//    先判断能不能走
    if (!canMoveDown(board)){
        return false;
    }
//    move
    for (let i = 2; i >= 0; i--)
        for (let j = 0; j < 4; j++){
            if (board[i][j] !== 0){
                for (let k = 3; k > i; k--){
                    if (board[k][j] === 0 && noBlockVertical(k, j, i, board)){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        break;
                    }
                    else if (board[k][j] === board[i][j] && noBlockVertical(k, j, i, board) && !hasConflicted[k][j]){
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += +board[k][j];
                        hasConflicted[k][j] = true;
                        break;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    updateScore();
    return true;
}
function updateScore() {
    // 将后台的分数更新显示出来
    $("#score").text(score);
}

