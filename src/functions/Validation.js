import LocalStorage from '@/functions/LocalStorage.js'

export default {
  isValidWord(input) {
    if (typeof input !== 'string') {
      return false;
    }

    const isAlphaSpace = input.match(/^[a-z ]+$/);
    const isWhitespace = input.replace(/\s/g, '') === '';

    return isAlphaSpace && !isWhitespace;
  },
  isValidCategoryName(input) {
    if (typeof input !== 'string') {
      return false;
    }

    const isWhitespace = input.replace(/\s/g, '') === '';
    const isAlreadyAList = LocalStorage.getCustomListNames().some(listName => listName === input);

    return !isWhitespace && !isAlreadyAList;
  },
}
