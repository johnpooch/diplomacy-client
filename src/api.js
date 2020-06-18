const serviceURI = process.env.SERVICE_URI;
const authURL = `${serviceURI}auth/`;

// Games
export const ALLGAMESURL = `${serviceURI}games`;
export const GAMEFILTERCHOICESURL = `${serviceURI}game-filter-choices`;
export const USERGAMESURL = `${serviceURI}games/mygames`;
export const CREATEGAMEURL = `${serviceURI}games/create`;

// Game
export const GAMESTATEURL = `${serviceURI}game/<int:game>`;
export const JOINGAMEURL = `${serviceURI}game/<int:game>/join`;
export const CREATEORDERURL = `${serviceURI}game/<int:game>/order`;
export const LISTORDERSURL = `${serviceURI}game/<int:game>/orders`;
export const FINALIZEORDERSURL = `${serviceURI}game/<int:game>/finalize`;
export const UNFINALIZEORDERSURL = `${serviceURI}game/<int:game>/unfinalize`;

// Auth
export const LOGINURL = `${authURL}login`;
export const REGISTERURL = `${authURL}register`;
