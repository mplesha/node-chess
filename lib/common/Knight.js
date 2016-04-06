var Board = require('./Board');
var Piece = require('./Piece');
var board = require('./Board');
var _ = require('lodash');

function Knight(board, color, position) {
  Piece.apply(this, [board, color, position]);

}

Knight.prototype = _.extend(Object.create(Piece.prototype), {
  constructor: Knight,
  
  moves: [{i:2,j:1},{i:2,j:-1},{i:-2,j:1},{i:-2,j:-1},
      {i:1,j:2},{i:1,j:-2},{i:-1,j:2},{i:-1,j:-2}],

  canMove: function canMove(to) {
    if (!this.board.isOnBoard(this.board.reverseTrans(to))) return false;
    if (this.board.isOpponentPiece(this.position,this.board.reverseTrans(to))) return true;
    if (this.board.isFreeCell(this.board.reverseTrans(to))) return true;
    return false;
  },

  getMoves: function getMoves() {
    //if ( this.board.isFreeCell(this.position)) return '';

    var coor = this.board.transform(this.position);
    var lm = [];
    var newCoor ={};
    for(var k = 0; k < this.moves.length; k++){
        newCoor.i = coor.i+this.moves[k].i;
        newCoor.j = coor.j+this.moves[k].j;
        if (this.canMove(newCoor)){
          lm.push(this.board.reverseTrans(newCoor));
        }
      }
      return lm;
  }
});



module.exports = Knight;