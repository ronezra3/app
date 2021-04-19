export function validateUserPassword() {
  var invalidCharacters = /[^\x00-\x7F]+/;
  var hasLetters = /^(.*?[A-Za-z]){1}/;

  return function (password, confirmedPassword) {
    if (password.length < 6) {
      return 'bad_password_length';
    }

    if (!hasLetters.test(password)) {
      return 'bad_password_length';
    }

    if (invalidCharacters.test(password)) {
      return 'bad_password_character';
    }

    if (password !== confirmedPassword) {
      return "bad_password_match";
    }

    return '';
  };
}
