const serviceURI = process.env.SERVICE_URI || 'http://127.0.0.1:8082/api/v1/';

// Games
export const ALLGAMESURL = `${serviceURI}games`;
export const USERGAMESURL = `${serviceURI}games/mygames`;
export const CREATEGAMEURL = `${serviceURI}games/create`;

// Game
export const GAMESTATEURL = `${serviceURI}game/<int:game>`;
