import { lastTwentyTestsAverages, updateWpmAndAccuracy } from "./utilities";

test("return average speed and accuracy of last 20 tests", () => {
      const statsData = {
            testMode: {
                  lastTwentyTests: [
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
                  ],
            },
      };
      lastTwentyTestsAverages(statsData);

      expect(statsData.testMode.lastTwentyTestsAverageWpm).toBe(50);
      expect(statsData.testMode.lastTwentyTestsAverageAccuracy).toBe(50);
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
      expect(testStats.accuracy).toBe(Math.floor(93.75));
      expect(testStats.wpm).toBe(Math.floor(30));
});
