
const matriz = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var idWon = [];

var player = "X";
var playerWon = false;

 //Iniciamos aplicacion
$(document).ready(function(){    
    try{
        resetGame();
        createEvents();
        $("#game").show();
    }catch(e){
        console.error("• Error to load: ", e)
        alert("Ocurrió un error al cargar el juego, favor verificar la consola.")
    }finally{
        $("#pre").remove();
    }
    
});

//Reset del juego
function resetGame(){
    for(var i = 0; i <= 2; i++){
        for(var j = 0; j <= 2; j++){
            matriz[i][j] = null;
            $("#"+i.toString() + j.toString()).css("border", "");
        }       
    }
    player = "X";
    playerWon = false;
    $(".btnGame").attr("disabled",false);
    $(".btnGame").text("");
    $("#player").html(player);
}

//Creamos los eventos para los botones
function createEvents(){
    for(var i = 0; i <= 2; i++){
        for(var j = 0; j <= 2; j++){
            $("#" + i.toString() + j.toString()).click(function() {
                $(this).text(player);
                setValue($(this)[0].id);
            });
        }       
    }
}

//Función que setea los valores del juego
function setValue(id){
    idWon = [];
    let position = id.split("");
    matriz[position[0]][position[1]] = player;
    verifyPlayerWon(position[0],position[1]);
    if(!playerWon){
        player = (player == "X") ? "O" : "X";
        $("#player").html(player);
    }else{
        $(".btnGame").attr("disabled",true);
        for(var i = 0; i < idWon.length; i++){
            $("#"+idWon[i]).css("border", "3px solid red");
        }
        setTimeout(() => {
            alert("Felicidades jugador " + player + ", has ganado esta partida.");
        }, 100);
    }
}

//Verificamos si con los valores actuales, el jugador ganó
function verifyPlayerWon(row, col){
    let isRow = checkRow(row, col);
    if(!isRow){
        let isColumn = checkColumn(row, col);
        if(!isColumn){
            let isDiag = checkDiagonal(row, col);
            if(isDiag){
                playerWon = true;
            }
        }else{
            playerWon = true;
        }
    }else{
        playerWon = true;
    }
}

function checkRow(row, col) {
    let won = true;
    const symbol = matriz[row][col];
    for(var j = 0; j <= 2; j++){
        if(matriz[row][j] == null || matriz[row][j] != symbol){
            won = false;
            idWon = [];
            break;
        }else{
            idWon.push(row.toString() + j.toString())
        }
    }    
    return won;
}

function checkColumn(row, col) {
    let won = true;
    const symbol = matriz[row][col];
    for(var i = 0; i <= 2; i++){
        if(matriz[i][col] == null || matriz[i][col] != symbol){
            won = false;
            idWon = [];
            break;
        }
        else{
            idWon.push(i.toString() + col)
        }
    }    
    return won;
}

function checkDiagonal(row, col) {    
    let won = true;
    let parcial = true;
    const symbol = matriz[row][col];

    for(var i = 0; i <= 2; i++){
        if(matriz[i][i] == null || matriz[i][i] != symbol){
            parcial = false;
            idWon = [];
            break;
        }else{
            idWon.push(i.toString() + i.toString());
        }
    } 
    if(!parcial){
        const length = matriz.length;
        for (var i = 0, j = length -1; i < length; i++) {            
            if (matriz[i][j] == null || matriz[i][j] != symbol) {
                won = false;
                idWon = [];
                break;
            }else{
                idWon.push(i.toString() + j.toString());
            }
            j--;
        }
    }

    return won;    
}