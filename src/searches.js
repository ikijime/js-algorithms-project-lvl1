const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

export function searchSingleWord(searchPhrase, docs) {
  const token = String(searchPhrase.match(/\w+/g));
  const index = {};

  docs.forEach((doc) => {
    const occurrences = countOccurrences(doc.text, token);
    if (occurrences > 0) {
      const row = { docId: doc.id, count: occurrences };
      if (Object.prototype.hasOwnProperty.call(index, token)) {
        index[token] = [index[token], row];
      } else {
        index[token] = row;
      }
    }
  });

  return index;
}

export function fuzzySearch(searchWords, docs) {
  const index = [];

  docs.forEach((doc) => {
    searchWords.forEach((token) => {
      const occurrences = countOccurrences(doc.text, String(token.match(/\w+/g)));

      if (occurrences > 0) {
        const row = { docId: doc.id, count: occurrences };

        if (Object.prototype.hasOwnProperty.call(index, token)) {
          index[token] = [index[token], row];
        } else {
          index[token] = row;
        }
      }
    });
  });

  return index;
}
