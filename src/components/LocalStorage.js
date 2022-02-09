import InbuiltWordlists from '@/components/InbuiltWordlists.js';

// Note: all the functions are top-level in this file so that they can reference each other when necessary.
// export default mostly just binds them to exported names for external access.

// Settings handling

function parseStoredInt(val) {
  var parsed = parseInt(val);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
}

function parseStoredBool(val) {
  switch (val) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
}

function parseStoredStringCaps(val) {
  return val.toUpperCase();
}

const settings = {
  wordRepetitions: {
    key: 'settings.wordRepetitions',
    parser: parseStoredInt,
    default: 1,
  },
  wordDisplayTime: {
    key: 'settings.wordDisplayTime',
    parser: parseStoredInt,
    default: 0,  // TODO: there may be a better way to store 'no timer' than zero
  },
  wordsPerSession: {
    key: 'settings.wordsPerSession',
    parser: parseStoredInt,
    default: 5,
  },
  assistanceLevel: {
    key: 'settings.assistanceLevel',
    parser: parseStoredStringCaps,
    default: 'MAX',  // potential values: NONE, MIN, MAX
  },
  clickForNextWord: {
    key: 'settings.clickForNextWord',
    parser: parseStoredBool,
    default: true,
  },
  wordDisplayCapitalization: {
    key: 'settings.wordDisplayCapitalization',
    parser: parseStoredStringCaps,
    default: 'UPPERCASE',  // potential values: UPPPERCASE, LOWERCASE
  },
}

function getSetting(name) {
  const setting = settings[name];

  if (!localStorage.hasOwnProperty(setting.key)) {
    localStorage.setItem(setting.key, setting.default);
  }

  var storedVal = localStorage.getItem(setting.key);
  return setting.parser(storedVal);
}

function setSetting(name, val) {
  const setting = settings[name];

  localStorage.setItem(setting.key, val);
}

// Custom lists handling

function getCustomListNames() {
  const customListKeys = Object.keys(localStorage)
    .filter(key => key.startsWith('custom_lists.'));
  const customListNames = customListKeys
    .map(key => key.replace(/^custom_lists\./, ''));

  return customListNames;
}

function getCustomList(name) {
  const listKey = 'custom_lists.' + name;

  if (!localStorage.hasOwnProperty(listKey)) {
    throw new Error(`not a custom list: "${name}"`);
  }

  const stringData = localStorage.getItem(listKey);
  return JSON.parse(stringData);
}

function createCustomList(name) {
  const listKey = 'custom_lists.' + name;

  if (localStorage.hasOwnProperty(listKey)) {
    throw new Error(`already a custom list: "${name}"`);
  }

  localStorage.setItem(listKey, '[]');
}

function deleteCustomList(name) {
  const listKey = 'custom_lists.' + name;

  if (!localStorage.hasOwnProperty(listKey)) {
    throw new Error(`not a custom list: "${name}"`);
  }

  localStorage.removeItem(listKey);
}

function addCustomWord(listName, word) {
  const listKey = 'custom_lists.' + listName;

  if (!localStorage.hasOwnProperty(listKey)) {
    throw new Error(`not a custom list: "${listName}"`);
  }

  const listStringData = localStorage.getItem(listKey);
  let list = JSON.parse(listStringData);

  // we normalize the words to lowercase
  word = word.toLowerCase();

  if (list.includes(word)) {
    // silently don't add the word in twice
    return;
  }

  // add the word and save it to storage
  list.push(word);
  localStorage.setItem(listKey, JSON.stringify(list));
}

function deleteCustomWord(listName, word) {
  const listKey = 'custom_lists.' + listName;

  if (!localStorage.hasOwnProperty(listKey)) {
    throw new Error(`not a custom list: "${listName}"`);
  }

  const listStringData = localStorage.getItem(listKey);
  let list = JSON.parse(listStringData);

  // we normalize the words to lowercase
  word = word.toLowerCase();

  if (!list.includes(word)) {
    // silently do nothing
    return;
  }

  // delete the word and save it to storage
  list = list.filter(x => x !== word);
  localStorage.setItem(listKey, JSON.stringify(list));
}

function exportListToJson(listName) {
  const list = getCustomList(listName);  // this can throw errors
  const data = {
    name: listName,
    words: list,
  };
  return JSON.stringify(data);
}

function getParsedDataOrNull(stringData) {
  let data;
  try {
    data = JSON.parse(stringData);
  } catch (e) {
    return null;
  }

  let nameOkay = typeof data.name === 'string';
  let listOkay = Array.isArray(data.words) && data.words.every(x => typeof x === 'string');

  if (!nameOkay || !listOkay) {
    return null;
  }

  return data;
}

function importListFromJson(stringData) {
  const data = getParsedDataOrNull(stringData);

  if (data === null) {
    throw new Error('JSON data is invalid');
  }

  createCustomList(data.name);
  for (let word of data.words) {
    addCustomWord(data.name, word);
  }
}

// Selected lists handling

function getSelectedListNames(listType) {
  const key = 'selected_lists.' + listType;

  if (!localStorage.hasOwnProperty(key)) {
    // nothing stored means nothing selected
    return [];
  }

  const stringData = localStorage.getItem(key);
  return JSON.parse(stringData);
}

function setListSelected(listType, listName, isSelected) {
  const key = 'selected_lists.' + listType;

  if (!localStorage.hasOwnProperty(key)) {
    // initialize storage
    localStorage.setItem(key, '[]');
  }

  const stringData = localStorage.getItem(key);
  let selected = JSON.parse(stringData);

  selected = selected.filter(x => x !== listName);
  if (isSelected) {
    selected.push(listName);
  }

  localStorage.setItem(key, JSON.stringify(selected));
}

export default {
  getSetting: getSetting,
  setSetting: setSetting,

  getCustomListNames: getCustomListNames,
  getCustomList: getCustomList,
  createCustomList: createCustomList,
  deleteCustomList: deleteCustomList,
  addCustomWord: addCustomWord,
  deleteCustomWord: deleteCustomWord,
  exportListToJson: exportListToJson,
  importListFromJson: importListFromJson,

  getSelectedBuiltInListNames: function() {
    // delete any selected lists that don't exist (any more)
    const availableLists = Object.keys(InbuiltWordlists);
    const selectedLists = getSelectedListNames('builtin');
    const deadLists = selectedLists.filter(selectedList => !availableLists.includes(selectedList));
    for (let listName of deadLists) {
      setListSelected('builtin', listName, false);
    }

    return getSelectedListNames('builtin');
  },
  getSelectedCustomListNames: function() {
    // delete any selected lists that don't exist (any more)
    const availableLists = getCustomListNames();
    const selectedLists = getSelectedListNames('custom');
    const deadLists = selectedLists.filter(selectedList => !availableLists.includes(selectedList));
    for (let listName of deadLists) {
      setListSelected('custom', listName, false);
    }

    return getSelectedListNames('custom');
  },
  setBuiltInListSelected: function(listName, isSelected) {
    setListSelected('builtin', listName, isSelected);
  },
  setCustomListSelected: function(listName, isSelected) {
    setListSelected('custom', listName, isSelected);
  },

}
