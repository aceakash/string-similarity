var stringSimilarity = require('./compare-strings');

describe('compareTwoStrings', function () {
  var compareTwoStrings = stringSimilarity.compareTwoStrings;

  it('is a function', function () {
    expect(typeof compareTwoStrings).toBe('function');
  });

  it('returns 0 for totally different strings: french and quebec', function () {
    expect(compareTwoStrings('french', 'quebec')).toEqual(0);
  });

  it('returns 1 for identical strings: france and france', function () {
    expect(compareTwoStrings('france', 'france')).toEqual(1);
  });

  it('returns 1 for same but differently cased strings: fRaNce and france', function () {
    expect(compareTwoStrings('fRaNce', 'france')).toEqual(1);
  });

  it('returns 0.8 for healed and sealed', function () {
    expect(compareTwoStrings('healed', 'sealed')).toEqual(0.8);
  });

  it('returns 0.896551724137931 for "web applications" and "applications of the web"', function () {
    expect(compareTwoStrings('web applications', 'applications of the web')).toEqual(0.896551724137931);
  });

  it('returns 0.9 for "this will have a typo somewhere" and "this will huve a typo somewhere"', function () {
    expect(compareTwoStrings("this will have a typo somewhere", "this will huve a typo somewhere")).toEqual(0.9);
  });

  it('returns 0.8333333333333334 for "this has one extra word" and "this has one word"', function () {
    expect(compareTwoStrings("this has one extra word", "this has one word")).toEqual(0.8333333333333334);
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
      {target: 'mailed', rating: 0.4},
      {target: 'edward', rating: 0.2},
      {target: 'sealed', rating: 0.8},
      {target: 'theatre', rating: 0.36363636363636365}
    ]);
  });

  it("returns the best match and it's similarity rating", function () {
    var matches = findBestMatch('healed', ['mailed', 'edward', 'sealed', 'theatre']);

    expect(matches.bestMatch).toEqual({target: 'sealed', rating: 0.8});
  });
});
