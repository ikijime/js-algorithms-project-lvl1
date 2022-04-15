const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function buildSearchEngine(data) {
  return {
    constructor() {
      this.data = data;
    },

    search(searchPhrase) {
      const token = String(searchPhrase.match(/\w+/g));

      const withoutPunctuation = data.map((item) => {
        const result = item.text.match(/\w+/g);
        return { id: item.id, text: result };
      });

      const occurrencesOfToken = withoutPunctuation.map((item) => {
        const occurrences = countOccurrences(item.text, token);
        return { id: item.id, tokenCount: occurrences };
      });

      const onlyMatched = occurrencesOfToken.filter((item) => item.tokenCount > 0);

      const sortedResults = onlyMatched.slice(0);
      sortedResults.sort((a, b) => b.tokenCount - a.tokenCount);

      return sortedResults.map((item) => item.id);
    },
  };
}

export default buildSearchEngine;
