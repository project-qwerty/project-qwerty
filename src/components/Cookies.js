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
    // --> ['listnames', 'go', 'here']
  },
  getCustomList: function(name) {
    // --> ['words', 'go', 'here']
  },
  createCustomList: function(name) {
    // -->
  },
  deleteCustomList: function(name) {
    // -->
  },
  addCustomWord: function(listName, word) {
    // -->
  },
  deleteCustomWord: function(listName, word) {
    // -->
  },

  getSelectedBuiltInListNames: function() {
    // --> ['listnames', 'go', 'here']
  },
  getSelectedCustomListNames: function () {
    // --> ['listnames', 'go', 'here']
  },
  setBuiltInListSelected: function(listName, isSelected) {
    // -->
  },
  setCustomListSelected: function (listName, isSelected) {
    // -->
  },


}
