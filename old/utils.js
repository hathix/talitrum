/* GLOBAL VARS */
var Global = {
	"currentLevel" : 0
};

/* UTILS */

/**
	Gets the board indicated by the current Global.currentLevel.
*/
function getBoard(){
	return Boards[Global.currentLevel];
}

/**
	Determine the content of a tile based on its value. Pass the raw number, not the element.
*/
function interpretTile(raw){
	switch(raw){
	case 0:
		return 'white';
	case 1:
		return 'red';
	case 9:
		return 'steel';
	}
}

/**
	Determines if the given tile is on.
*/
function isOn(tile){
	//don't check for it being on, since there could be other elements in there. Instead make sure it isn't off.
	return tile.className != "white";
}

/**
	Determines if the user has won.
*/
function check(){
	var tiles = getAllTiles();
	for(var i = 0; i < tiles.length; i++){
		if(!isOn(tiles[i])){
			//something's off
			return false;
		}
	}
	
	return true;
}

/**
	Finds the table cell with the given coordinates.
	a - x coord
	b - y coord
*/
function getTile(a,b){
	return document.getElementById(a + "" + b);
}

/**
	Returns an array of all the tiles.
*/
function getAllTiles(){
	var board = document.getElementById("board");
	return board.childNodes;
}

/**
	Gets the coordinates of the tile (HTML element.) Returns an array.
*/
function getCoords(tile){
	var id = tile.id;
	return [parseInt(id.substring(0,1)),parseInt(id.substring(1,2))];
}
