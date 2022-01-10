import Vue from "vue";

function parseCookieInt(val) {
  var parsed = parseInt(val);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
}

function parseCookieBool(val) {
  switch (val) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
}

function parseCookieStringCaps(val) {
  return val.toUpperCase();
}

const settings = {
  wordRepetitions: {
    key: 'settings.wordRepetitions',
    parser: parseCookieInt,
    default: 1,
  },
  wordDisplayTime: {
    key: 'settings.wordDisplayTime',
    parser: parseCookieInt,
    default: 0,  // TODO: there may be a better way to store 'no timer' than zero
  },
  wordsPerSession: {
    key: 'settings.wordsPerSession',
    parser: parseCookieInt,
    default: 5,
  },
  errorlessLearning: {
    key: 'settings.errorlessLearning',
    parser: parseCookieBool,
    default: false,
  },
  clickForNextWord: {
    key: 'settings.clickForNextWord',
    parser: parseCookieBool,
    default: true,
  },
  wordDisplayCapitalization: {
    key: 'settings.wordDisplayCapitalization',
    parser: parseCookieStringCaps,
    default: 'UPPERCASE',
  },
}

function getSelectedListNames(listType) {
  const key = 'selected_lists.' + listType;

  if (!Vue.$cookies.isKey(key)) {
    // no cookie, nothing selected
    return [];
  }

  const stringData = Vue.$cookies.get(key);
  return JSON.parse(stringData);
}

function setListSelected(listType, listName, isSelected) {
  const key = 'selected_lists.' + listType;

  if (!Vue.$cookies.isKey(key)) {
    // initialize cookie
    Vue.$cookies.set(key, '[]');
  }

  const stringData = Vue.$cookies.get(key);
  let selected = JSON.parse(stringData);

  selected = selected.filter(x => x !== listName);
  if (isSelected) {
    selected.push(listName);
  }

  Vue.$cookies.set(key, JSON.stringify(selected));
}

export default {
  getSetting: function(name) {
    const setting = settings[name];

    if (!Vue.$cookies.isKey(setting.key)) {
      Vue.$cookies.set(setting.key, setting.default);
    }

    var cookieVal = Vue.$cookies.get(setting.key);
    return setting.parser(cookieVal);
  },
  setSetting: function(name, val) {
    const setting = settings[name];

    Vue.$cookies.set(setting.key, val);
  },

  getCustomListNames: function() {
    const customListKeys = Vue.$cookies.keys()
        .filter(key => key.startsWith('custom_lists.'));
    const customListNames = customListKeys
        .map(key => key.replace(/^custom_lists\./, ''));

    return customListNames;
  },
  getCustomList: function(name) {
    const listKey = 'custom_lists.' + name;

    if (!Vue.$cookies.isKey(listKey)) {
      throw new Error(`not a custom list: "${name}"`);
    }

    const stringData = Vue.$cookies.get(listKey);
    return JSON.parse(stringData);
  },
  createCustomList: function(name) {
    const listKey = 'custom_lists.' + name;

    if (Vue.$cookies.isKey(listKey)) {
      throw new Error(`already a custom list: "${name}"`);
    }

    Vue.$cookies.set(listKey, '[]');
  },
  deleteCustomList: function(name) {
    const listKey = 'custom_lists.' + name;

    if (!Vue.$cookies.isKey(listKey)) {
      throw new Error(`not a custom list: "${name}"`);
    }

    Vue.$cookies.remove(listKey);
  },
  addCustomWord: function(listName, word) {
    const listKey = 'custom_lists.' + listName;

    if (!Vue.$cookies.isKey(listKey)) {
      throw new Error(`not a custom list: "${listName}"`);
    }

    const listStringData = Vue.$cookies.get(listKey);
    let list = JSON.parse(listStringData);

    // we normalize the words to lowercase
    word = word.toLowerCase();

    if (list.includes(word)) {
      // silently don't add the word in twice
      return;
    }

    // add the word and save it to the cookie
    list.push(word);
    Vue.$cookies.set(listKey, JSON.stringify(list));
  },
  deleteCustomWord: function(listName, word) {
    const listKey = 'custom_lists.' + listName;

    if (!Vue.$cookies.isKey(listKey)) {
      throw new Error(`not a custom list: "${listName}"`);
    }

    const listStringData = Vue.$cookies.get(listKey);
    let list = JSON.parse(listStringData);

    // we normalize the words to lowercase
    word = word.toLowerCase();

    if (!list.includes(word)) {
      // silently do nothing
      return;
    }

    // delete the word and save it to the cookie
    list = list.filter(x => x !== word);
    Vue.$cookies.set(listKey, JSON.stringify(list));
  },

  getSelectedBuiltInListNames: function() {
    return getSelectedListNames('builtin');
  },
  getSelectedCustomListNames: function () {
    return getSelectedListNames('custom');
  },
  setBuiltInListSelected: function(listName, isSelected) {
    setListSelected('builtin', listName, isSelected);
  },
  setCustomListSelected: function (listName, isSelected) {
    setListSelected('custom', listName, isSelected);
  },

}
