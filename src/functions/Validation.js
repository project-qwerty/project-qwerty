import LocalStorage from '@/functions/LocalStorage.js';

export default {
  isValidWord(input) {
    if (typeof input !== 'string') {
      return false;
    }

    const isAlphaNumericSpace = /^[0-9A-Za-z ]+$/.test(input);
    const isWhitespace = input.replace(/\s/g, '') === '';

    return isAlphaNumericSpace && !isWhitespace;
  },
  isValidCategoryName(input) {
    if (typeof input !== 'string') {
      return false;
    }

    const bannedCharacters = /[/\\#&?]/;

    const isWhitespace = input.replace(/\s/g, '') === '';
    const isAlreadyACategory = LocalStorage.getCustomCategoryNames().some(categoryName => categoryName === input);
    const containsBannedCharacters = bannedCharacters.test(input);

    return !isWhitespace && !isAlreadyACategory && !containsBannedCharacters;
  },
};
