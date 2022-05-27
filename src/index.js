import { searchSingleWord, fuzzySearch } from './searches.js';

function normalizetext(docs) {
  return docs.map((item) => {
    const result = item.text.match(/\w+/g);
    return { id: item.id, text: result };
  });
}

function resultFromIndex(index) {
  const result = [];
  Object.values(index).forEach((item) => {
    if (item.length !== undefined) {
      item.forEach((innerItem) => {
        result.push(innerItem);
      });
    } else {
      result.push(item);
    }
  });

  const reduced = result.reduce((acc, item) => {
    const { docId, count } = item;

    if (docId in acc) {
      acc[docId] += count;
    } else {
      acc[docId] = count;
    }
    return acc;
  }, {});

  const reducedArr = [...Object.entries(reduced)].sort((a, b) => b[1] - a[1]);
  return reducedArr.map((item) => item[0]);
}

function buildSearchEngine(docs) {
  return {
    constructor() {
      this.docs = docs;
      this.index = [];
    },

    search(searchPhrase) {
      const searchWords = searchPhrase.split(' ');
      const textWithoutPunctuation = normalizetext(docs);
      let newIndexData;

      if (searchWords.length === 1) {
        newIndexData = searchSingleWord(searchPhrase, textWithoutPunctuation);
      } else {
        newIndexData = fuzzySearch(searchWords, textWithoutPunctuation);
      }
      return resultFromIndex(newIndexData);
    },
  };
}

export default buildSearchEngine;
