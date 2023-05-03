module.exports = {
	compareTwoStrings:compareTwoStrings,
	findBestMatch:findBestMatch
};

function compareTwoStrings(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function findBestMatch(mainString, targets, key) {
	if (!areArgsValid(mainString, targets, key)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings, or an array of objects with a key which relates to a string');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targets.length; i++) {
    const currentTarget = targets[i]
		const currentTargetString = key ? currentTarget[key] : currentTarget;
		const currentRating = compareTwoStrings(mainString, currentTargetString)
		ratings.push({target: currentTarget, rating: currentRating})
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex]
	
	return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
}

function areArgsValid(mainString, targets, key) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targets)) return false;
	if (!targets.length) return false;
	if (targets.find( function (s) {
    const string = key ? s[key] : s
    return typeof string !== 'string'
  })) return false;
	return true;
}