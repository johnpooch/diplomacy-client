export const BASEURL = 'http://127.0.0.1:8082/api/v1/';

// Games
export const ALLGAMESURL = `${BASEURL}games`;
export const USERGAMESURL = `${BASEURL}games/mygames`;
export const CREATEGAMEURL = `${BASEURL}games/create`;

// Game
export const GAMESTATEURL = `${BASEURL}game/<int:game>`;

// Auth
export const AUTHURL = 'http://127.0.0.1:8082/api/auth/';
export const LOGINURL = `${AUTHURL}login`;
export const REGISTERURL = `${AUTHURL}register`;
