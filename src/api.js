const serviceURI = process.env.SERVICE_URI;

// Games
export const ALLGAMESURL = `${serviceURI}games`;
export const GAMEFILTERCHOICESURL = `${serviceURI}game-filter-choices`;
export const USERGAMESURL = `${serviceURI}games/mygames`;
export const CREATEGAMEURL = `${serviceURI}games/create`;

// Game
export const GAMESTATEURL = `${serviceURI}game/<int:game>`;
