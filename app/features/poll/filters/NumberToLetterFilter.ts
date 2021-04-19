/**
 * This function is 1 based, means that for the number 1 the output will be 'A'
 * @returns {function(any): string}
 * @constructor
 */
export function NumberToLetterFilter() {
  function toLetters(num) {
    if (num < 1 || num > 26) {
      throw new Error('there are only 26 letters in english');
    }

    var mod = num % 26,
      pow = num / 26 | 0,
      out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? toLetters(pow) + out : out;
  }

  return toLetters;
}
