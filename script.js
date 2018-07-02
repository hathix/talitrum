//<TODO>: make sure this gets minified

//constants
var LEVEL_STRINGS = [
		"Switzerland    / 11111 11011 10001 11011 11111",
		"Whirlpool      / 00010 10100 01110 00101 01000",
		"Patio          / 00100 01010 10001 01010 00100",
		"Galaxy         / 11001 00101 01110 10100 10011",
		"Five           / 10001 00000 00100 00000 10001",		
		"Tic-Tac-Toe    / 01010 11111 01010 11111 01010",				
		"Bar            / 00000 00000 11111 00000 00000",
		"Lone_Star      / 00000 00000 00100 00000 00000",		
		"Checkers       / 01010 10101 01010 10101 01010",				
		"E              / 00111 00100 00111 00100 00111",		
		"Brackets       / 00011 11001 10001 10011 11000",	
		"Arrow          / 01111 10111 11010 11100 11000",		
		"Alien          / 01110 10101 10101 01110 00100",				
		"Snapdragon     / 00000 00110 01010 01100 00000",					
		"Dawn           / 00010 01001 00111 10111 01111",	
		"Peephole       / 11111 11101 11111 11111 11111",				
		"Fragment       / 00000 00001 01001 10000 00000",
		"Wave           / 11111 11101 01010 10111 11111",	
		"Blastoff       / 00000 00110 11010 10100 01100",		
		"Man-O-War      / 01110 10101 11111 10101 10101",	
		"Wrench         / 01110 00100 01110 00100 00100",
		"Scar           / 00000 00010 00100 01000 00000",
		"M   			/ 10001 11011 10101 10001 10001",		
		"Alpha          / 11111 10001 10101 10011 11111",	
		"XI             / 00000 10101 01001 10101 00000",	
		"<3             / 01010 10101 10001 01010 00100",
		"Vitamin_K      / 11111 10101 10011 10101 11111",
		"Hummingbird    / 00000 01100 01010 01110 00000",		
		"Longhorn       / 11011 01110 01110 00100 00000",	
		"All_Out        / 00000 00000 00000 00000 00000",
		"Steel          / 99999 90909 00900 90909 99999",
		"Long_Beach     / 99099 99199 99199 99199 99099",	
		"Split          / 00000 00000 99999 00000 00000",
		"Mini_Me        / 99999 90009 90109 90009 99999",
		"Pinpoint       / 00000 00000 00900 00000 00000",			
		"Flywing        / 00000 09990 10901 00900 00100",
		"Crab           / 00110 01091 10001 19000 01100",		
		"Pisces         / 00090 09999 09190 09990 00000",		
		"Jaunty         / 10111 19090 11901 11911 00111",
		"Spill          / 00900 00111 91191 11911 00101",
		"Chase          / 11111 10111 99991 11011 11011",
		"Tilted         / 99099 90009 00000 90009 99099",
		"Choke          / 10100 91009 99099 91109 00010",
		"Shaman     	/ 01900 11911 99910 01110 01001",
		"Elegance		/ 11111 10991 19091 19901 11111",
		"Passageway		/ 00110 00999 00010 99901 01101",		
		"Pong           / 00001 10001 10901 10001 10000",
		"Vise           / 11911 11911 11011 11911 11911",		
		"Elevator       / 11111 19091 19191 19191 01110",	
		"Spikerush      / 91919 91919 00000 91919 91919"
	];
var Constants = {
	NUM_LEVELS: LEVEL_STRINGS.length,
	DELIMITER: "/",
	GRID_WIDTH: 5,
	GRID_HEIGHT: 5,
};
Constants.NUM_TILES = Constants.GRID_WIDTH * Constants.GRID_HEIGHT;


/**
	Data about a status, like 'red' or 'white'.
	@param name [string] the name of the status, like 'red' or 'white'
	@param shorthand [int] the int that stands for the status in the level strings
*/
function Status(name,shorthand){
	this.name = name;
	this.shorthand = shorthand;
} 	

/**
	Enum for the statuses.
*/
var Statuses = {
	Red:   new Status('red',   1),
	White: new Status('white', 0),
	Steel: new Status('steel', 9),
};

//objects

/**
	Makes a level.
	@param compressed [string] the level, compressed into a string. See LEVEL_STRINGS.
	@param levelNum [int] the 1-based level number.
*/
function Level(compressed,levelNum){
	this.levelNum = levelNum;
	
	//get the name and grid data out of this
	compressed = compressed.replace(/ /g,""); //removes all occurrences of spaces
	var information = compressed.split(Constants.DELIMITER);
	this.name = information[0];
	this.codedGrid = information[1];
}
Level.prototype.moves = 0;

/**
	Loads this level, putting it on the board.
*/
Level.prototype.load = function(){
	//housekeeping
	currentLevel = this;
	$('#level_name').html(this.levelNum + ". " + this.name.replace(/_/g," ")); //replace underscores with spaces
	$('#num_moves').html(0); //clear moves counter

	//put tiles on board
	var grid = $('#board');
    grid.html(''); //clear board
    
	for(var i=0; i<Constants.GRID_HEIGHT; i++){
		for(var j=0; j<Constants.GRID_WIDTH; j++){
			var location = i * Constants.GRID_WIDTH + j;
			var stringValue = this.codedGrid.substring(location,location + 1);
			var shorthand = parseInt(stringValue);//primitive value of tile
			
			//find proper status from shorthand
			var status;
			for(k in Statuses){
				if(Statuses[k].shorthand == shorthand){
					status = Statuses[k];
				}
			}
			
			//add a tile
			var tile = $("<div id='" + (i + "" + j) + "' class='" + status.name + "'>");
			tile.click(function(){ clickTile($(this).attr('id')); });
			grid.append(tile);
		}
		grid.append("<br class='breaker' />");
	}	
}

//global vars
var currentLevel = null;

//core functions
$(document).ready(function(){
	$('button').button();

	//reset level button
	$('#restart').click(function(){
		//reset level
		loadLevel(currentLevel.levelNum);
	});	
	
	//alert dialog
	$("#alert_dialog").dialog({
		autoOpen: false,
		buttons: {
			OK: function() {
				$( this ).dialog( "close" );
			}
		}
	});		
	
	loadLevel(1);
});

/**
	Loads the level with the given number.
	@param num [int] the 1-based level number.
*/
function loadLevel(num){
	//get compressed string
	var compressed = LEVEL_STRINGS[num - 1];
	
	//load the level
	new Level(compressed,num).load();
}

/**
    Loads the level after the current one.
*/
function loadNextLevel(){
    var newLevelNum = currentLevel.levelNum + 1;
    if(newLevelNum > Constants.NUM_LEVELS){
        //you finished the last level
        alert('You won the game!');
    }
    else{
        loadLevel(newLevelNum);
    }
}

/**
    Called when a tile is clicked. Pass the tile's id.
    @param id [int] the tile (<div>)'s id
*/
function clickTile(id){
	//get x and y coords from id
    var x = parseInt(id.substring(0,1));
    var y = parseInt(id.substring(1,2));
    var tileClicked = getTile(x,y);
    
    //if the tile's unclickable, quit
    if(tileClicked.hasClass('steel'))
        return;
    
    //flip everything around it
    flipTile(tileClicked);
    flipTile(getTile(x+1,y)); //left
    flipTile(getTile(x-1,y)); //right
    flipTile(getTile(x,y+1)); //down
    flipTile(getTile(x,y-1)); //up
    
	//count the move
	$('#num_moves').html(++currentLevel.moves);
	
    //see if they won
    check();
}

/**
    Finds the tile (jQuery div element) based on its coordinates.
    @param x [int] the column
    @param y [int] the row
    @return [jQuery div] if a tile is found
    @return [null] if the x and y coordinates are out of bounds.
*/
function getTile(x,y){
    return $('#' + x + y) || null;
}

/**
    Flips the given tile only.
    @param tile [jQuery div] the tile that is to be flipped
 */
function flipTile(tile){
    if(!tile) return;
    
    //change tile class
    var oldClass = tile.attr('class');
    var newClass = oldClass;
    
    switch(oldClass){
    case 'red':
        newClass = 'white';
        break;
    case 'white':
        newClass = 'red';
        break;
    case 'steel':
        newClass = 'steel';
        break;
    }
    
    tile.removeClass(oldClass).addClass(newClass);
}

/**
    Checks if the user finished the level.
*/
function check(){
    $('#board > div').each(function(i){
        //this is a tile
        if($(this).hasClass('white')){
            //not done; there's a white tile
            return false;
        }
        
        if(i == Constants.NUM_TILES - 1){
            //last tile; if we're still here that means there's no white left
            userWon();
        }
    });
}

/**
    Called when the user finished a level.
*/
function userWon(){
	var moves = currentLevel.moves;
	var word = moves != 1 ? 'moves' : 'move'; //'moves' if it's more than 1, 'move' if it's 1
	dialog('You beat that level in <strong>' + moves + '</strong> ' + word + '!');
    loadNextLevel();
}

/**
	Creates a dialog to show to the user.
	@param text [string] the text to put in the dialog. Can contain HTML elements.
*/
function dialog(text){
	$('#alert_dialog').dialog('open');
	$('#alert_message').html(text);
}
