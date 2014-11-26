var compareStrings = require('./compare-strings');

describe('compareStrings', function () {
  it('is a function', function () {
    expect(typeof compareStrings).toBe('function');
  });

  it('returns 0 for totally different strings: french and quebec', function () {
    expect(compareStrings('french', 'quebec')).toEqual(0);
  });

  it('returns 1 for identical strings: france and france', function () {
    expect(compareStrings('france', 'france')).toEqual(1);
  });

  it('returns 1 for same but differently cased strings: fRaNce and france', function () {
    expect(compareStrings('fRaNce', 'france')).toEqual(1);
  });

  it('returns 0.8 for healed and sealed', function () {
    expect(compareStrings('healed', 'sealed')).toEqual(0.8);
  });

  it('returns 0.896551724137931 for "web applications" and "applications of the web"', function () {
    expect(compareStrings('web applications', 'applications of the web')).toEqual(0.896551724137931);
  });
  
  it('returns 0.9 for "this will have a typo somewhere" and "this will huve a typo somewhere"', function () {
    expect(compareStrings("this will have a typo somewhere", "this will huve a typo somewhere")).toEqual(0.9);
  });

  it('returns 0.8333333333333334 for "this has one extra word" and "this has one word"', function () {
    expect(compareStrings("this has one extra word", "this has one word")).toEqual(0.8333333333333334);
  });
});
