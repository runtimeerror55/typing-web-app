import { initialTypingState } from "../utilities/utilities";
export const typingParagraphReducer = (typingState, action) => {
      switch (action.type) {
            case "right hit": {
                  let currentLetterIndex = typingState.currentLetterIndex + 1;
                  let currentWordIndex = typingState.currentWordIndex;
                  let currentWord =
                        action.payload.words[typingState.currentWordIndex];
                  let wordsStats = action.payload.testStats.wordsStats;
                  let words = action.payload.words;
                  let nextWord = words[typingState.currentWordIndex + 1];
                  if (
                        currentWord.length - 1 ===
                        typingState.currentLetterIndex
                  ) {
                        if (typingState.currentWordIndex > -1) {
                              if (wordsStats[nextWord] === undefined) {
                                    wordsStats[nextWord] = {
                                          startedAt: performance.now(),
                                          speed: 0,
                                          count: 0,
                                          speeds: [],
                                    };
                              } else {
                                    wordsStats[nextWord].startedAt =
                                          performance.now();
                              }
                              if (typingState.currentWordIndex > 0) {
                                    if (wordsStats[currentWord] === undefined) {
                                          wordsStats[currentWord] = {
                                                endedAt: performance.now(),
                                                count: 0,
                                                speed: 0,
                                                speeds: [],
                                          };
                                    } else {
                                          console.log(
                                                wordsStats,
                                                wordsStats[currentWord].count
                                          );
                                          wordsStats[currentWord].endedAt =
                                                performance.now();
                                          wordsStats[currentWord].count++;
                                          wordsStats[currentWord].speed =
                                                (wordsStats[currentWord].speed *
                                                      (wordsStats[currentWord]
                                                            .count -
                                                            1) +
                                                      (wordsStats[currentWord]
                                                            .endedAt -
                                                            wordsStats[
                                                                  currentWord
                                                            ].startedAt)) /
                                                wordsStats[currentWord].count;
                                          wordsStats[currentWord].speeds.push(
                                                wordsStats[currentWord]
                                                      .endedAt -
                                                      wordsStats[currentWord]
                                                            .startedAt
                                          );
                                    }
                              }
                              console.log(action.payload.testStats);
                        }

                        currentLetterIndex = 0;
                        currentWordIndex = typingState.currentWordIndex + 1;
                  }

                  return {
                        ...typingState,
                        paragraphCurrentIndex: typingState.paragraphNextIndex,
                        paragraphNextIndex: typingState.paragraphNextIndex + 1,
                        currentLetterClass: "active-right",
                        started: true,
                        currentWordIndex,
                        currentLetterIndex,
                  };
            }
            case "wrong hit": {
                  return {
                        ...typingState,
                        paragraphCurrentIndex: typingState.paragraphNextIndex,
                        paragraphNextIndex: typingState.paragraphNextIndex,
                        currentLetterClass: "active-wrong",
                        started: true,
                  };
            }

            case "finished test": {
                  return {
                        ...typingState,
                        finished: true,
                  };
            }
            case "reset": {
                  return initialTypingState;
            }
            default: {
                  return typingState;
            }
      }
};
