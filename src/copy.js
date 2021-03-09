// Note, some of these messages mirror messages that the server returns and are
// only used for testing purposes
export const errorMessages = {
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

export const successMessages = {
  accountCreated: 'Account created! Log in to continue.',
  gameCreated: 'Game "%s" created!',
  passwordUpdated: 'Password updated!',
  passwordResetLinkSent:
    'Thanks! Please check %s for a link to reset your password.',
};

export const infoMessages = {
  waitingForPlayers: 'Waiting for players to join',
  alreadyJoinedGame:
    'You have already joined this game. The game will begin once all players have joined.',
  notJoinedGame: 'You are not currently part of this game.',
};
