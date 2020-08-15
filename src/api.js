const serviceURI = process.env.SERVICE_URI;
const authURL = `${serviceURI}auth/`;

// Games
export const ALLGAMESURL = `${serviceURI}games`;
export const GAMEFILTERCHOICESURL = `${serviceURI}game-filter-choices`;
export const USERGAMESURL = `${serviceURI}games/mygames`;
export const CREATEGAMEURL = `${serviceURI}games/create`;

// Game
export const GAMESTATEURL = `${serviceURI}game/<game>`;
export const JOINGAMEURL = `${serviceURI}game/<game>/join`;

export const CREATEORDERURL = `${serviceURI}game/<game>/order`;
export const DESTROYORDERURL = `${serviceURI}game/<game>/order/<pk>`;
export const LISTORDERSURL = `${serviceURI}game/<game>/orders`;

export const RETRIEVEPRIVATENATIONSTATE = `${serviceURI}game/<game>/nation-state`;

export const FINALIZEORDERSURL = `${serviceURI}game/finalize/<pk>`;

// Flags
export const LISTNATIONFLAGSURL = `${serviceURI}list-nation-flags`;

// Password reset
export const PASSWORDRESET = `${serviceURI}password_reset/`;
export const PASSWORDRESETCONFIRM = `${serviceURI}password_reset/confirm/`;

// Auth
export const LOGINURL = `${authURL}login`;
export const REGISTERURL = `${authURL}register`;
