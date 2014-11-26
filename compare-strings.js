var _ = require('lodash');

exports.compareTwoStrings = compareTwoStrings;
exports.findBestMatch = findBestMatch;

function compareTwoStrings(str1, str2) {
  var pairs1 = wordLetterPairs(str1.toUpperCase());
  var pairs2 = wordLetterPairs(str2.toUpperCase());
  var intersection = 0;
  var union = pairs1.length + pairs2.length;

  for(var i = 0; i < pairs1.length; i++) {
    var pair1 = pairs1[i];

    for(var j = 0; j < pairs2.length; j++) {
      var pair2 = pairs2[j];

      if (pair1 === pair2) {
        intersection++;
        pairs2.splice(j, 1);
        break;
      }
    }
  }
  return (2.0 * intersection) / union;

  // private functions ---------------------------
  function letterPairs(str) {
    var numPairs = str.length - 1;
    var pairs = [];
    for(var i = 0; i < numPairs; i++) {
      pairs[i] = str.substring(i, i + 2);
    }
    return pairs;
  }

  function wordLetterPairs(str) {
    var allPairs = [];
    var words = str.split(' ');

    for(var w = 0; w < words.length; w++) {
      var pairsInWord = letterPairs(words[w]);

      for(var p = 0; p < pairsInWord.length; p++) {
        allPairs.push(pairsInWord[p]);
      }
    }
    return allPairs;
  }
}


function findBestMatch(mainString, targetStrings) {
  if (!areArgsValid(mainString, targetStrings)) {
    throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
  }
  var ratings = _.map(targetStrings, function (targetString) {
    return {
      target: targetString,
      rating: compareTwoStrings(mainString, targetString)
    };
  });

  return {
    ratings: ratings,
    bestMatch: _.max(ratings, 'rating')
  };

  // helpers ---------------------
  function areArgsValid(mainString, targetStrings) {
    var mainStringIsAString = (typeof mainString === 'string');

    var targetStringsIsAnArrayOfStrings = Array.isArray(targetStrings) &&
      targetStrings.length > 0 &&
      _.all(targetStrings, function (targetString) {
        return (typeof targetString === 'string');
      });

    return mainStringIsAString && targetStringsIsAnArrayOfStrings;
  }
}
