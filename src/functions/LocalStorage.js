import BuiltInCategories from '@/functions/BuiltInCategories.js';
import Validation from '@/functions/Validation.js';

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
  wordDisplayCapitalization: {
    key: 'settings.wordDisplayCapitalization',
    parser: parseStoredStringCaps,
    default: 'UPPERCASE',  // potential values: UPPPERCASE, LOWERCASE
  },
}

function getSetting(name) {
  const setting = settings[name];

  if (localStorage.getItem(setting.key) === null) {
    localStorage.setItem(setting.key, setting.default);
  }

  var storedVal = localStorage.getItem(setting.key);
  return setting.parser(storedVal);
}

function setSetting(name, val) {
  const setting = settings[name];

  localStorage.setItem(setting.key, val);
}

// Custom categories handling

// TODO: the order of categories isn't stable, that's not great
function getCustomCategoryNames() {
  const customCategoryKeys = Object.keys(localStorage)
    .filter(key => key.startsWith('custom_categories.'));
  const customCategoryNames = customCategoryKeys
    .map(key => key.replace(/^custom_categories\./, ''));

  return customCategoryNames;
}

function getCustomCategory(name) {
  const categoryKey = 'custom_categories.' + name;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(`not a custom category: "${name}"`);
  }

  const stringData = localStorage.getItem(categoryKey);
  return JSON.parse(stringData);
}

function getCustomCategoryValidWords(name) {
  var category = getCustomCategory(name);
  category = category.filter(Validation.isValidWord);
  return category;
}

function createCustomCategory(name) {
  const categoryKey = 'custom_categories.' + name;

  if (localStorage.getItem(categoryKey) !== null) {
    throw new Error(`already a custom category: "${name}"`);
  }

  localStorage.setItem(categoryKey, '[]');
}

function renameCustomCategory(oldName, newName) {
  const oldCategoryKey = 'custom_categories.' + oldName;

  if (localStorage.getItem(oldCategoryKey) === null) {
    throw new Error(`not a custom category: "${oldName}"`);
  }

  const newCategoryKey = 'custom_categories.' + newName;

  if (localStorage.getItem(newCategoryKey) !== null) {
    throw new Error(`already a custom category: "${newName}"`);
  }

  const categoryContents = localStorage.getItem(oldCategoryKey);
  localStorage.setItem(newCategoryKey, categoryContents);
  localStorage.removeItem(oldCategoryKey);
}

function deleteCustomCategory(name) {
  const categoryKey = 'custom_categories.' + name;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(`not a custom category: "${name}"`);
  }

  localStorage.removeItem(categoryKey);
}

function addCustomWord(categoryName, word) {
  const categoryKey = 'custom_categories.' + categoryName;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(`not a custom category: "${categoryName}"`);
  }

  const categoryStringData = localStorage.getItem(categoryKey);
  let category = JSON.parse(categoryStringData);

  // we normalize the words to lowercase
  word = word.toLowerCase();

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
    throw new Error(`not a custom category: "${categoryName}"`);
  }

  const categoryStringData = localStorage.getItem(categoryKey);
  let category = JSON.parse(categoryStringData);

  if (index >= category.length) {
    throw new Error(`index out of bounds: index = "${index}", ${categoryName}.length = ${category.length}`);
  }

  // we normalize the words to lowercase
  newValue = newValue.toLowerCase();

  category[index] = newValue;
  localStorage.setItem(categoryKey, JSON.stringify(category));
}

function deleteCustomWord(categoryName, index) {
  const categoryKey = 'custom_categories.' + categoryName;

  if (localStorage.getItem(categoryKey) === null) {
    throw new Error(`not a custom category: "${categoryName}"`);
  }

  const categoryStringData = localStorage.getItem(categoryKey);
  let category = JSON.parse(categoryStringData);

  // delete the word and save it to storage
  category.splice(index, 1);
  localStorage.setItem(categoryKey, JSON.stringify(category));
}

function exportCategoryToJson(categoryName) {
  const category = getCustomCategory(categoryName);  // this can throw errors
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

  createCustomCategory(data.name);  // this can throw errors
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

  const stringData = localStorage.getItem(key);
  return JSON.parse(stringData);
}

function setCategorySelected(categoryType, categoryName, isSelected) {
  const key = 'selected_categories.' + categoryType;

  if (localStorage.getItem(key) === null) {
    // initialize storage
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
  getCustomCategory: getCustomCategory,
  getCustomCategoryValidWords: getCustomCategoryValidWords,
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

}
