import LocalStorage from '@/functions/LocalStorage.js'

export default {
  isValidWord(input) {
    if (typeof input !== 'string') {
      return false;
    }

    const isAlphaSpace = input.match(/^[A-Za-z ]+$/);
    const isWhitespace = input.replace(/\s/g, '') === '';

    return isAlphaSpace && !isWhitespace;
  },
  isValidCategoryName(input) {
    if (typeof input !== 'string') {
      return false;
    }

    const isWhitespace = input.replace(/\s/g, '') === '';
    const isAlreadyACategory = LocalStorage.getCustomCategoryNames().some(categoryName => categoryName === input);

    return !isWhitespace && !isAlreadyACategory;
  },
}
