// this is according to global.css
const altColourCount = 11;

// taken from https://stackoverflow.com/a/52171480/4809728
function hash(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export default {
  stringToColour: function(str) {
    if (str === null || str === undefined) {
      return 'initial';
    }

    const colourIndex = hash(str) % altColourCount;

    return `var(--colour-${colourIndex + 1})`;
  },
  indexToColour: function(index) {
    return `var(--colour-${(index % altColourCount) + 1})`;
  },
};
