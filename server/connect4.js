Meteor.startup(function () {
	resetCells();
    resetTurn();
	return Meteor.methods({
 		reset_Cells: function() {
  			Cells.remove({});
  			startCells();
  		},
  		reset_Turns: function() {
  			Turns.remove({});
  			Turns.insert({turn: 'RED'});

  		}
	});
});
