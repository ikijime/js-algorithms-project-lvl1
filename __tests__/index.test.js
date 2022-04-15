import { expect } from '@jest/globals';
import buildSearchEngine from '../src/index.js';

// создание документа
// документ имеет два атрибута "id" и "text"
const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const docs = [doc1, doc2, doc3];
const searchEngine = buildSearchEngine(docs); // поисковый движок запомнил документы

test('search_word_with_punctuation', () => {
  expect(searchEngine.search('pint')).toEqual(['doc1']);
  expect(searchEngine.search('pint!')).toEqual(['doc1']);
});

test('result_in_relevant_order', () => {
  expect(searchEngine.search('shoot')).toEqual(['doc2', 'doc1']);
});
