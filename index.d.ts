declare const methods: {
  compareTwoStrings: (a: string, b: string) => number;
  findBestMatch: (mainString: string, targetStrings: string[]) => {
    ratings: Array<{target: string; rating: number}>;
    bestMatch: {target: string; rating: number};
    bestMatchIndex: number;
  }
};

export default methods;
