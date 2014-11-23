string-similarity
=================

Finds degree of similarity between two strings, based on [Dice's Coefficient](http://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient), which is mostly better than [Levenshtein distance](http://en.wikipedia.org/wiki/Levenshtein_distance).

Exposes a single function `compareStrings(str1, str2)` which returns the degree of similarity as a fraction between 0 and 1, where 0 means the strings are completely different, and 1 means they are identical.

##

Inspired by [Simon White's article](http://www.catalysoft.com/articles/StrikeAMatch.html)
