//all core functions

window.onload = function(){
	loadBoard(getBoard());
	
	document.getElementById("restart").onclick = function(){ restart(); }
	
	fillBoardSelector();
};

/**
	Restart this level.
*/
function restart(){
	loadBoard(getBoard());
}

/**
	Fill the board selector dropdown with the board names.
*/
function fillBoardSelector(){
	var text = ""; //for the options
	
	for(var i = 0; i < Boards.length; i++){
		var board = Boards[i];
		text += "<option>" + board.name + "</option>";
	}
	
	var selector = document.getElementById("board_select");
	selector.innerHTML = text;
	
	//make selecting something work
	selector.onchange = function() { 
		setBoard(this.selectedIndex); 
	};
}

/**
	Manually changes the board. 
	level - the order of the board in the Boards array.
*/
function setBoard(level){
	Global.currentLevel = level;
	loadBoard(getBoard());
}

/**
	Put a certain board up.
*/
function loadBoard(board){
	if(!board) board = getBoard();
	
	var grid = document.getElementById("board");
	
	//empty it
	while(grid.firstChild)
		grid.removeChild(grid.firstChild);
	
	//fill it
	for(var a = 0; a < board.tiles.length; a++){
		for(var b = 0; b < board.tiles[0].length; b++){
			var tile = document.createElement('div');
			tile.className = interpretTile(board.tiles[a][b]);
			tile.id = a + "" + b;
			grid.appendChild(tile);
		}
		grid.innerHTML += "<br class='breaker' />";
	}
	
	//set name
	document.getElementById("level_name").innerHTML = board.name;
	
	//add clicking ability
	var tiles = getAllTiles();
	for(var i = 0; i < tiles.length; i++){
		var tile = tiles[i];
		tile.onclick = function(){ clickTile(this); }
	}
}

function clickTile(tile){
	if(tile.className == 'steel')
		return; //can't click steel
	//flip this tile and whatever's above, below, left, or right of it
	
	var coords = getCoords(tile);
	var x = coords[0];
	var y = coords[1];
	
	//this tile
	flipTile(tile);
	
	//to left
	flipTile(getTile(x-1,y));
	
	//to right
	flipTile(getTile(x+1,y));
	
	//down
	flipTile(getTile(x,y-1));
	
	//up
	flipTile(getTile(x,y+1));
	
	if(check()){
		declareWinner();
	}
}

/**
	Flips a tile. Give the HTML element.
*/
function flipTile(tile){
	if(!tile)
		return;
		
	switch(tile.className){
	case 'red':
		tile.className = 'white';
		break;
	case 'white':
		tile.className = 'red';
		break;
	case 'steel':
		//do nothing
		break;
	}
}

/**
	Call when the user wins.
*/
function declareWinner(){
	alert("You win!");
	
	nextBoard();
}

/**
	Gets to the next board.
*/
function nextBoard(){
	if(Global.currentLevel + 1 < Boards.length){
		Global.currentLevel++;
		loadBoard(getBoard());
	}
}