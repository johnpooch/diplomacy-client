// Note, some of these messages mirror messages that the server returns and are
// only used for testing purposes
export const errorMessages = {
  changePasswordIncorrectPassword: 'Password is not correct',
  changePasswordPasswordsDoNotMatch: "Password fields didn't match",
  createGameNameTooLong: 'Ensure this field has no more than 50 characters.',
  loginNoMatchingAccount:
    'The username or password you entered do not match an account. Please try again.',
  internalServerError:
    "500 Internal Server Error. Please come back later when we've fixed the problem. Thanks.",
  notFound: '404 Not Found. Try reloading the page. Thanks.',
  registerEmailAlreadyExists: 'user with this email address already exists.',
  registerUsernameAlreadyExists: 'A user with that username already exists.',
  resetPasswordNoAssociatedUser:
    'There is no active user associated with this e-mail address or the password can not be changed',
};

export const infoMessages = {
  waitingForPlayers: 'Waiting for players to join',
  alreadyJoinedGame:
    'You have already joined this game. The game will begin once all players have joined.',
  notJoinedGame: 'You are not currently part of this game.',
};
