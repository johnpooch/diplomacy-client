import PieceAdapter from './PieceAdapter';

export default class TerritoryAdapter {
  constructor(data) {
    this.path = data.path;
    this.name = data.name;
    this.abbreviation = data.abbreviation;
    this.type = data.type;

    const pieceData = {
      x: data.piece_x,
      y: data.piece_y,
    };
    this.piece = new PieceAdapter(pieceData);
  }
}
