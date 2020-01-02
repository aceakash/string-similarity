var stringSimilarity = require('../index');

describe('compareTwoStrings', function () {
  var compareTwoStrings = stringSimilarity.compareTwoStrings;

  it('is a function', function () {
    expect(typeof compareTwoStrings).toEqual('function');
  });

  it('returns the correct value for different inputs:', function () {
    const testData = [
      { first: 'french', second: 'quebec', expected: 0 },
      { first: 'france', second: 'france', expected: 1 },
      { first: 'fRaNce', second: 'france', expected: 0.2 },
      { first: 'healed', second: 'sealed', expected: 0.8 },
      { first: 'web applications', second: 'applications of the web', expected: 0.7878787878787878 },
      { first: 'this will have a typo somewhere', second: 'this will huve a typo somewhere', expected: 0.92 },
      { first: 'Olive-green table for sale, in extremely good condition.', second: 'For sale: table in very good  condition, olive green in colour.', expected: 0.6060606060606061 },
      { first: 'Olive-green table for sale, in extremely good condition.', second: 'For sale: green Subaru Impreza, 210,000 miles', expected: 0.2558139534883721 },
      { first: 'Olive-green table for sale, in extremely good condition.', second: 'Wanted: mountain bike with at least 21 gears.', expected: 0.1411764705882353 },
      { first: 'this has one extra word', second: 'this has one word', expected: 0.7741935483870968 },
      { first: 'a', second: 'a', expected: 1 },
      { first: 'a', second: 'b', expected: 0 },
      { first: '', second: '', expected: 1 },
      { first: 'a', second: '', expected: 0 },
      { first: '', second: 'a', expected: 0 },
      { first: 'apple event', second: 'apple    event', expected: 1 },
      { first: 'iphone', second: 'iphone x', expected: 0.9090909090909091 }
    ];

    testData.forEach(td => {
      expect(compareTwoStrings(td.first, td.second)).toBe(td.expected, td);
    });
  });
});

describe('findBestMatch', function () {
  var findBestMatch = stringSimilarity.findBestMatch;
  var badArgsErrorMsg = 'Bad arguments: First argument should be a string, second should be an array of strings';

  it('is a function', function () {
    expect(typeof findBestMatch).toBe('function');
  });

  it('accepts a string and an array of strings and returns an object', function () {
    var output = findBestMatch('one', ['two', 'three']);
    expect(typeof output).toBe('object');
  });

  it("throws a 'Bad arguments' error if no arguments passed", function () {
    expect(function () {
      findBestMatch();
    }).toThrowError(badArgsErrorMsg);
  });

  it("throws a 'Bad arguments' error if first argument is not a non-empty string", function () {
    expect(function () {
      findBestMatch('');
    }).toThrowError(badArgsErrorMsg);

    expect(function () {
      findBestMatch(8);
    }).toThrowError(badArgsErrorMsg);
  });

  it("throws a 'Bad arguments' error if second argument is not an array with at least one element", function () {
    expect(function () {
      findBestMatch('hello', 'something');
    }).toThrowError(badArgsErrorMsg);

    expect(function () {
      findBestMatch('hello', []);
    }).toThrowError(badArgsErrorMsg);
  });

  it("throws a 'Bad arguments' error if second argument is not an array of strings", function () {
    expect(function () {
      findBestMatch('hello', [2, 'something']);
    }).toThrowError(badArgsErrorMsg);
  });

  it('assigns a similarity rating to each string passed in the array', function () {
    var matches = findBestMatch('healed', ['mailed', 'edward', 'sealed', 'theatre']);

    expect(matches.ratings).toEqual([
      { target: 'mailed', rating: 0.4 },
      { target: 'edward', rating: 0.2 },
      { target: 'sealed', rating: 0.8 },
      { target: 'theatre', rating: 0.36363636363636365 }
    ]);
  });

  it("returns the best match and its similarity rating", function () {
    var matches = findBestMatch('healed', ['mailed', 'edward', 'sealed', 'theatre']);

    expect(matches.bestMatch).toEqual({ target: 'sealed', rating: 0.8 });
  });

  it("returns the index of best match from the target strings", function () {
    var matches = findBestMatch('healed', ['mailed', 'edward', 'sealed', 'theatre']);

    expect(matches.bestMatchIndex).toBe(2);
  });
});
