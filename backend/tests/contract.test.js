const test = require('node:test');
const assert = require('node:assert/strict');

const { getStockBySymbol } = require('../services/stockService');
const { analyzeStock } = require('../services/analysisService');
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../services/watchlistService');
const { getProviderHealth } = require('../services/providerHealthService');
const { getSentimentComparison } = require('../services/sentimentComparisonService');

test('stock detail includes history and movement metadata', async () => {
  const stock = await getStockBySymbol('TATAMOTORS');

  assert.ok(stock, 'stock should be returned');
  assert.ok(Array.isArray(stock.history), 'history should exist');
  assert.ok(stock.history.length > 0, 'history should not be empty');
  assert.ok(stock.movement, 'movement metadata should exist');
  assert.equal(stock.symbol, 'TATAMOTORS');
});

test('analysis result includes timeline and evidence status metadata', async () => {
  const analysis = await analyzeStock('TATAMOTORS');

  assert.ok(analysis, 'analysis should be returned');
  assert.ok(Array.isArray(analysis.timeline), 'timeline should exist');
  assert.ok(analysis.timeline.length > 0, 'timeline should not be empty');
  assert.ok(Array.isArray(analysis.evidence), 'evidence should exist');
  assert.ok(analysis.evidence.every((item) => item.status), 'every evidence item should have a status');
  assert.ok(analysis.verdict && analysis.verdict.status, 'verdict status should exist');
});

test('watchlist stores and removes stock symbols', () => {
  const initial = getWatchlist();
  const added = addToWatchlist('TATAMOTORS');

  assert.ok(added.includes('TATAMOTORS'));
  assert.ok(getWatchlist().includes('TATAMOTORS'));

  const removed = removeFromWatchlist('TATAMOTORS');
  assert.ok(!removed.includes('TATAMOTORS'));
  assert.deepEqual(getWatchlist(), initial);
});

test('provider health returns both provider states', () => {
  const health = getProviderHealth();

  assert.ok(health.alphaVantage);
  assert.ok(health.newsProvider);
  assert.ok(typeof health.alphaVantage.status === 'string');
  assert.ok(typeof health.newsProvider.status === 'string');
});

test('sentiment comparison returns a comparable score across multiple stocks', async () => {
  const comparison = await getSentimentComparison(['TATAMOTORS', 'RELIANCE', 'INFY']);

  assert.ok(Array.isArray(comparison), 'comparison should be an array');
  assert.equal(comparison.length, 3, 'comparison should include one entry per requested symbol');
  comparison.forEach((item) => {
    assert.ok(item.symbol, 'symbol should exist');
    assert.ok(typeof item.sentimentScore === 'number', 'sentiment score should be numeric');
    assert.ok(['positive', 'neutral', 'negative'].includes(item.sentimentLabel), 'sentiment label should be valid');
    assert.ok(typeof item.summary === 'string', 'summary should exist');
  });
});
