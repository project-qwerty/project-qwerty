import BuiltInCategories from '@/functions/BuiltInCategories.js';
import Validation from '@/functions/Validation.js';

// error messages go to Sentry, so we have to make sure that personal data (eg. category names/words) aren't in them
function scrubbedMessage(message, parameter) {
  const inProd = window.location.host === 'projectqwerty.com';

  if (!inProd) {
    message = `${message}: "${parameter}"`;
  }

  return message;
}

// Note: all the functions are top-level in this file so that they can reference each other when necessary.
// export default mostly just binds them to exported names for external access.

// Settings handling

function parseStoredInt(val) {
  let parsed = parseInt(val);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
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
    default: 0, // zero means no timer
  },
  wordsPerSession: {
    key: 'settings.wordsPerSession',
    parser: parseStoredInt,
    default: 5,
  },
  assistanceLevel: {
    key: 'settings.assistanceLevel',
    parser: parseStoredStringCaps,
    default: 'MAX', // potential values: NONE, MIN, MAX
  },
  wordDisplayCapitalization: {
    key: 'settings.wordDisplayCapitalization',
    parser: parseStoredStringCaps,
    default: 'UPPERCASE', // potential values: UPPPERCASE, LOWERCASE
  },
  wordsSentences: {
    key: 'settings.wordsSentences',
    parser: parseStoredStringCaps,
    default: 'WORDS', // potential values: WORDS, SENTENCES, BOTH
  },
};

function getSetting(name) {
  const setting = settings[name];

  if (localStorage.getItem(setting.key) === null) {
    localStorage.setItem(setting.key, setting.default);
  }

  let storedVal = localStorage.getItem(setting.key);
  return setting.parser(storedVal);
}

function setSetting(name, val) {
  const setting = settings[name];

  localStorage.setItem(setting.key, val);
}

// Custom categories handling

function getCustomCategoryNames() {
  const customCategoryKeys = Object.keys(localStorage)
    .filter(key => key.startsWith('custom_categories.'));
  const customCategoryNames = customCategoryKeys
    .map(key => key.replace(/^custom_categories\./, ''))
    .sort((a, b) => a.localeCompare(b));

  return customCategoryNames;
}

function getUsableCustomCategoryNames() {
  return getCustomCategoryNames()
      .filter(categoryName => getCustomCategoryUsableWords(categoryName).length > 0);
}

function getCustomCategory(name) {
  const categoryKey = 'custom_categories.' + name;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(scrubbedMessage('not a custom category', name));
  }

  const stringData = localStorage.getItem(categoryKey);
  return JSON.parse(stringData);
}

function getCustomCategoryUsableWords(name) {
  return getCustomCategory(name)
      .filter(Validation.isValidWord);
}

function createCustomCategory(name) {
  const categoryKey = 'custom_categories.' + name;

  if (localStorage.getItem(categoryKey) !== null) {
    throw new Error(scrubbedMessage('already a custom category', name));
  }

  localStorage.setItem(categoryKey, '[]');
}

function renameCustomCategory(oldName, newName) {
  const oldCategoryKey = 'custom_categories.' + oldName;

  if (localStorage.getItem(oldCategoryKey) === null) {
    throw new Error(scrubbedMessage('not a custom category', oldName));
  }

  const newCategoryKey = 'custom_categories.' + newName;

  if (localStorage.getItem(newCategoryKey) !== null) {
    throw new Error(scrubbedMessage('already a custom category', newName));
  }

  const categoryContents = localStorage.getItem(oldCategoryKey);
  localStorage.setItem(newCategoryKey, categoryContents);
  localStorage.removeItem(oldCategoryKey);
}

function deleteCustomCategory(name) {
  const categoryKey = 'custom_categories.' + name;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(scrubbedMessage('not a custom category', name));
  }

  localStorage.removeItem(categoryKey);
}

function addCustomWord(categoryName, word) {
  const categoryKey = 'custom_categories.' + categoryName;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(scrubbedMessage('not a custom category', categoryName));
  }

  const categoryStringData = localStorage.getItem(categoryKey);
  let category = JSON.parse(categoryStringData);

  if (category.includes(word)) {
    // silently don't add the word in twice
    return;
  }

  // add the word and save it to storage
  category.push(word);
  localStorage.setItem(categoryKey, JSON.stringify(category));
}

function editCustomWord(categoryName, index, newValue) {
  const categoryKey = 'custom_categories.' + categoryName;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(scrubbedMessage('not a custom category', categoryName));
  }

  const categoryStringData = localStorage.getItem(categoryKey);
  let category = JSON.parse(categoryStringData);

  if (index >= category.length) {
    throw new Error(scrubbedMessage(`custom word index out of bounds (index=${index}, category.length=${category.length})`, categoryName));
  }

  category[index] = newValue;
  localStorage.setItem(categoryKey, JSON.stringify(category));
}

function deleteCustomWord(categoryName, index) {
  const categoryKey = 'custom_categories.' + categoryName;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(scrubbedMessage('not a custom category', categoryName));
  }

  const categoryStringData = localStorage.getItem(categoryKey);
  let category = JSON.parse(categoryStringData);

  // delete the word and save it to storage
  category.splice(index, 1);
  localStorage.setItem(categoryKey, JSON.stringify(category));
}

function exportCategoryToJson(categoryName) {
  const category = getCustomCategory(categoryName); // this can throw errors
  const data = {
    name: categoryName,
    words: category,
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

function importCategoryFromJson(stringData) {
  const data = getParsedDataOrNull(stringData);

  if (data === null) {
    throw new Error('JSON data is invalid');
  }

  createCustomCategory(data.name); // this can throw errors
  for (let word of data.words) {
    addCustomWord(data.name, word);
  }
}

// Selected categories handling

function getSelectedCategoryNames(categoryType) {
  const key = 'selected_categories.' + categoryType;

  if (localStorage.getItem(key) === null) {
    // nothing stored means nothing selected
    return [];
  }

  let stringData = localStorage.getItem(key);
  let selectedCategories = JSON.parse(stringData);

  // for built in categories, we assume they're all 'usable'
  if (categoryType === 'builtin') {
    return selectedCategories;
  }

  // for custom categories, which can be 'unusable' through user entry,
  // we need to filter out unusable categories that might be selected
  const usableCategories = getUsableCustomCategoryNames();

  for (const categoryName of selectedCategories) {
    if (!usableCategories.includes(categoryName)) {
      setCategorySelected('custom', categoryName, false);
    }
  }

  // now that we've done that we get the selected categories again
  stringData = localStorage.getItem(key);
  return JSON.parse(stringData);
}

function setCategorySelected(categoryType, categoryName, isSelected) {
  const key = 'selected_categories.' + categoryType;

  if (localStorage.getItem(key) === null) {
    // initialise storage
    localStorage.setItem(key, '[]');
  }

  const stringData = localStorage.getItem(key);
  let selected = JSON.parse(stringData);

  selected = selected.filter(x => x !== categoryName);
  if (isSelected) {
    selected.push(categoryName);
  }

  localStorage.setItem(key, JSON.stringify(selected));
}

export default {
  getSetting: getSetting,
  setSetting: setSetting,

  getCustomCategoryNames: getCustomCategoryNames,
  getUsableCustomCategoryNames: getUsableCustomCategoryNames,

  getCustomCategory: getCustomCategory,
  getCustomCategoryUsableWords: getCustomCategoryUsableWords,

  createCustomCategory: createCustomCategory,
  renameCustomCategory: renameCustomCategory,
  deleteCustomCategory: deleteCustomCategory,

  addCustomWord: addCustomWord,
  editCustomWord: editCustomWord,
  deleteCustomWord: deleteCustomWord,

  exportCategoryToJson: exportCategoryToJson,
  importCategoryFromJson: importCategoryFromJson,

  getSelectedBuiltInCategoryNames: function() {
    // delete any selected categories that don't exist (any more)
    const availableCategories = Object.keys(BuiltInCategories);
    const selectedCategories = getSelectedCategoryNames('builtin');
    const deadCategories = selectedCategories.filter(selectedCategory => !availableCategories.includes(selectedCategory));
    for (let categoryName of deadCategories) {
      setCategorySelected('builtin', categoryName, false);
    }

    return getSelectedCategoryNames('builtin');
  },
  getSelectedCustomCategoryNames: function() {
    // delete any selected categories that don't exist (any more)
    const availableCategories = getCustomCategoryNames();
    const selectedCategories = getSelectedCategoryNames('custom');
    const deadCategories = selectedCategories.filter(selectedCategory => !availableCategories.includes(selectedCategory));
    for (let categoryName of deadCategories) {
      setCategorySelected('custom', categoryName, false);
    }

    return getSelectedCategoryNames('custom');
  },
  setBuiltInCategorySelected: function(categoryName, isSelected) {
    setCategorySelected('builtin', categoryName, isSelected);
  },
  setCustomCategorySelected: function(categoryName, isSelected) {
    setCategorySelected('custom', categoryName, isSelected);
  },

};
