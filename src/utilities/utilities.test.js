import { lastTwentyTestsAverages, updateWpmAndAccuracy } from "./utilities";

test("return average speed and accuracy of last 20 tests", () => {
      const lastTwentyTests = [
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
            { wpm: 50, accuracy: 50 },
      ];
      const [wpm, accuracy] = lastTwentyTestsAverages(lastTwentyTests);

      expect(wpm).toBe(50);
      expect(accuracy).toBe(50);
});

test("update wpm and accuracy of test", () => {
      const testStats = {
            wpm: 0,
            accuracy: 0,
            totalNumberOfRightHits: 150,
            totalNumberOfWrongHits: 10,
            wordsStats: {},
      };
      const timerState = { elapsedTime: 60 };
      updateWpmAndAccuracy(timerState, testStats);
      expect(testStats.accuracy).toBe(Math.round(93.75));
      expect(testStats.wpm).toBe(Math.round(30));
});
