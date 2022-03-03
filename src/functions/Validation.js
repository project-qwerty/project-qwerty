import LocalStorage from '@/functions/LocalStorage.js'

export default {
  isValidWord(input) {
    const isAlphaSpace = input.match(/^[a-z ]+$/);
    const isWhitespace = input.replace(/\s/g, '') === '';

    return isAlphaSpace && !isWhitespace;
  },
  isValidCategoryName(input) {
    const isWhitespace = input.replace(/\s/g, '') === '';
    const isAlreadyAList = LocalStorage.getCustomListNames().some(listName => listName === input);

    return !isWhitespace && !isAlreadyAList;
  },
}
