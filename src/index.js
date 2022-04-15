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

      const matchedStrings = withoutPunctuation.filter((item) => item.text.includes(token));

      return matchedStrings.map((item) => item.id);
    },
  };
}

export default buildSearchEngine;
