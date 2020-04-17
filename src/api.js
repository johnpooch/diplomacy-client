const serviceURI = process.env.SERVICE_URI;
const authURL = `${serviceURI}auth/`;

// Games
export const ALLGAMESURL = `${serviceURI}games`;
export const USERGAMESURL = `${serviceURI}games/mygames`;
export const CREATEGAMEURL = `${serviceURI}games/create`;

// Game
export const GAMESTATEURL = `${serviceURI}game/<int:game>`;

// Auth
export const LOGINURL = `${authURL}login`;
export const REGISTERURL = `${authURL}register`;
