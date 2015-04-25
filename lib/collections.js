Cells = new Meteor.Collection("cells");
Turns = new Meteor.Collection("turns");
Buttons = new Meteor.Collection("buttons");

resetCells = function(){
	Cells.remove({});
	startCells();
};

resetTurn = function(){
	Turns.remove({});
	Turns.insert({turn: 'RED'});
};

startCells = function() {
	for (var i = 0; i < 7; i += 1) {
		for (var j = 0; j < 7; j += 1) {
			Cells.insert({row: i, column: j, move: ''})
		}
	}
};

// rest of the logic
