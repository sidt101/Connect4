Template.turn.turn = function(){
  return Turns.findOne();
};

Template.listRows.rows = function() {
	var x = new Array(7);
	for (var i = 0; i < 7; i += 1) 
		x.push(i);
	return x;
};

var row = 0;
Template.listCells.cells = function() {
	return Cells.find({row: row++});
};

Template.listButtons.buttons = function() {
	var x = new Array(7);
	for (var i = 0; i < 7; i += 1) 
		x.push(i);
	return x;
};

col_clicked = -1;


Template.button.events({
	'click td': function(event) {
	bottom_row = 6;
	outer :
	while (true) {
		if (Cells.findOne({row: bottom_row, column :col_clicked}).move == '') {
			turn = Turns.findOne();
			Cells.update(Cells.findOne({row: bottom_row, column :col_clicked})._id, {row: bottom_row, column: col_clicked, move: turn.turn});
			changeTurn(turn); 
			if (checkForWin(bottom_row, col_clicked, turn.turn) == 1) {
				console.log("a win");
				document.getElementById("pos_fixed").innerHTML = turn.turn + " WON!"
			}
			break outer;
		}
		bottom_row --;
		if (bottom_row == -1) {
			break outer;
		}
	}
	}

});



Template.resetCells.events({
  'click button': function(){
  	document.getElementById("pos_fixed").innerHTML = "";
    Meteor.call('reset_Cells');
    Meteor.call('reset_Turns');

  }
});

var changeTurn = function(turn){
	if (turn.turn == "RED") {
		Turns.update(turn._id, {turn: 'YELLOW'});
	} else {
		Turns.update(turn._id, {turn: 'RED'});
	}
};


function checkForWin(r, c, p) {
	var x = 0;
	board_width = 7;
	x = checkW(r, c, p);
	if (x == 1) {
		return 1;
	}
	x = checkE(r, c, p);
	if (x == 1) {
		return 1;
	}
	x = checkN(r, c, p);
	if (x == 1) {
		return 1;
	}
	x = checkS(r, c, p);
	if (x == 1) {
		return 1;
	}
	x = checkNE(r, c, p);
	if (x == 1) {
		return 1;
	}
	x = checkSE(r, c, p);
	if (x == 1) {
		return 1;
	}
	x = checkSW(r, c, p);
	if (x == 1) {
		return 1;
	}
	x = checkNW(r, c, p);
	if (x == 1) {
		return 1;
	}
	return 0;
}

var checkW = function(r, c, p) 
{
	var size = 4;
	if (r < 3) {
		return 0;
	} 
	while (size > 0) {
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		r--;
	}
	return 1;
};
var checkE = function(r, c, p) 
{
	var size = 4;
	if (r > board_width - 4) {
		return 0;
	} 
	while (size > 0) {
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		r++;
	}
	return 1;
};

var checkN = function(r, c, p) 
{
	var size = 4;
	if (c < 3) {
		return 0;
	} 
	while (size > 0) {
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		c--;
	}
	return 1;
};

var checkS = function(r, c, p) 
{
	var size = 4;
	if (c > board_width - 4) {
		return 0;
	} 
	while (size > 0) {
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		c++;
	}
	return 1;
};
var checkNE = function(r, c, p) 
{
	var size = 4;
	if (r < 3 || c > board_width - 4) {
		return 0;
	}
	while (size > 0) {
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		c++;
		r--;
	}
	return 1;
};
var checkNW = function(r, c, p) 
{
	var size = 4;
	if (r < 3 || c < 3) {
		return 0;
	}
	while (size > 0) {
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		c--;
		r--;
	}
	return 1;
};
var checkSE = function(r, c, p) 
{
	var size = 4;
	if (c > board_width || r > board_width - 4) {
		return 0;
	} 
	while (size > 0) {
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		c++;
		r++;
	}
	return 1;
};

var checkSW = function(r, c, p) 
{
	var size = 4;
	if (c < 3 || r > board_width - 4) {
		return 0;
	} 
	while (size > 0) {
		console.log(size);
		if (Cells.findOne({row: r, column :c}).move != p) {
			return 0;
		}
		size --;
		c--;
		r++;
	}
	return 1;
};
