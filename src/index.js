function buildSearchEngine(data) {
  return {
    constructor() {
      this.data = data;
    },

    search(searchPhrase) {
      const filteredWords = data.filter((item) => item.text.split(' ').includes(searchPhrase));
      return filteredWords.map((item) => item.id);
    },
  };
}

export default buildSearchEngine;
