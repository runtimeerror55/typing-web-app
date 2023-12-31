import styles from "../pages/homePage/typingParagraph.module.css";
export const getToken = () => {
      return JSON.parse(localStorage.getItem("token"));
};

export const toastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
};

export const colorRingOptions = {
      visible: true,
      height: "70",
      width: "70",
      ariaLabel: "blocks-loading",
      wrapperClass: "blocks-wrapper",
      colors: ["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"],
};

export const updateCharactersStats = (action, testStats, currentCharacter) => {
      if (action.type === "right hit") {
            if (testStats["charactersStats"][currentCharacter] === undefined) {
                  testStats["charactersStats"][currentCharacter] = {
                        totalNumberOfRightHits: 1,
                        totalNumberOfWrongHits: 0,
                  };
            } else {
                  testStats["charactersStats"][currentCharacter]
                        .totalNumberOfRightHits++;
            }
            testStats["totalNumberOfRightHits"]++;
      } else {
            if (testStats["charactersStats"][currentCharacter] === undefined) {
                  testStats["charactersStats"][currentCharacter] = {
                        totalNumberOfRightHits: 0,
                        totalNumberOfWrongHits: 1,
                  };
            } else {
                  testStats["charactersStats"][currentCharacter]
                        .totalNumberOfWrongHits++;
            }
            testStats["totalNumberOfWrongHits"]++;
      }
};

export const updateWpmAndAccuracy = (timerState, testStats) => {
      testStats.wpm =
            Math.round(
                  (testStats.totalNumberOfRightHits / 5) *
                        (60 / timerState.elapsedTime)
            ) || 0;
      testStats.accuracy =
            Math.round(
                  (testStats.totalNumberOfRightHits /
                        (testStats.totalNumberOfRightHits +
                              testStats.totalNumberOfWrongHits)) *
                        100
            ) || 0;

      for (let [key, value] of Object.entries(testStats.wordsStats)) {
            if (value.endedAt !== undefined) {
                  value.wpm = (key.length / 5) * (60 / (value.speed / 1000));
                  value.accuracy =
                        (value.rightHitsCount /
                              (value.rightHitsCount + value.wrongHitsCount)) *
                        100;
            }
      }
};

export const createtypingParagraphJsx = (
      words,
      typingState,
      wordRef,
      theme
) => {
      const paragraph = [];
      let index = -1;
      for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const temporary = [];
            for (let j = 0; j < word.length; j++) {
                  let className = "";
                  index++;
                  if (i < typingState.currentWordIndex) {
                        className =
                              styles["active-right-" + theme] +
                              " " +
                              styles["scale-out-animation"];
                  } else if (i === typingState.currentWordIndex) {
                        if (j < typingState.currentLetterIndex) {
                              className =
                                    styles["active-right-" + theme] +
                                    " " +
                                    styles["scale-out-animation"];
                        } else if (j === typingState.currentLetterIndex) {
                              if (
                                    typingState.currentLetterClass ===
                                    "active-wrong"
                              ) {
                                    className = styles["active-wrong"];
                              }
                        }
                        if (j === typingState.currentLetterIndex) {
                              if (className === "") {
                                    className = styles["active-next-character"];
                              } else {
                                    className +=
                                          " " + styles["active-next-character"];
                              }
                        }
                  }

                  if (word[j] === " ") {
                        temporary.push(
                              <span
                                    className={
                                          styles["letter"] + " " + className
                                    }
                              >
                                    &nbsp;
                              </span>
                        );
                  } else {
                        temporary.push(
                              <span
                                    //
                                    className={
                                          styles["letter"] + " " + className
                                    }
                              >
                                    {word[j]}
                              </span>
                        );
                  }
            }
            if (
                  typingState.paragraphNextIndex <= index &&
                  typingState.paragraphNextIndex > index - word.length
            ) {
                  paragraph.push(
                        <div ref={wordRef} className={styles["word"]}>
                              {temporary}
                        </div>
                  );
            } else {
                  paragraph.push(
                        <div className={styles["word"]}>{temporary}</div>
                  );
            }
      }

      return paragraph;
};

export const initialTypingState = {
      paragraphCurrentIndex: -1,
      paragraphNextIndex: 0,
      currentLetterClass: "typing-letter",
      started: false,
      finished: false,
      currentWordIndex: 0,
      currentLetterIndex: 0,
};

export const wordsMixer = (words, statsData, languageAndRange) => {
      let wordsSlice = [];
      let numbersSlice = [];
      if (languageAndRange.language === "english") {
            if (languageAndRange.optionIndex === 4) {
                  wordsSlice = words.slice(0, 60);
                  numbersSlice = words.slice(60);
            } else if (languageAndRange.optionIndex === 6) {
                  wordsSlice = words.slice(0, 40);
                  numbersSlice = words.slice(40);
            } else if (
                  languageAndRange.optionIndex === 7 ||
                  languageAndRange.optionIndex === 8 ||
                  languageAndRange.optionIndex === 9
            ) {
                  wordsSlice = words.slice(0, 300);
                  numbersSlice = words.slice(300);
            } else {
                  wordsSlice = [...words];
            }
      } else if (languageAndRange.language === "javascript") {
            wordsSlice = [...words];
      }

      shuffle(wordsSlice);
      shuffle(numbersSlice);

      const newWordsSlice = wordsSlice.map((word) => {
            const wordStats = statsData?.payload?.testMode?.wordsStats[word];

            if (wordStats) {
                  return {
                        word,
                        count: wordStats.totalNumberOfTestsAppeared,
                  };
            } else {
                  return {
                        word,
                        count: 0,
                  };
            }
      });
      const newNumbersSlice = numbersSlice.map((word) => {
            const wordStats = statsData?.payload?.testMode?.wordsStats[word];

            if (wordStats) {
                  return {
                        word,
                        count: wordStats.totalNumberOfTestsAppeared,
                  };
            } else {
                  return {
                        word,
                        count: 0,
                  };
            }
      });

      newWordsSlice.sort((a, b) => {
            return a.count - b.count;
      });
      newNumbersSlice.sort((a, b) => {
            return a.count - b.count;
      });
      console.log(newWordsSlice);

      const finalWords = [];
      let i = 0;
      let j = 0;
      let stopByLength =
            numbersSlice.length === 0
                  ? 1
                  : wordsSlice.length / numbersSlice.length;
      while (i < newWordsSlice.length || i < newNumbersSlice.length) {
            if (i < newWordsSlice.length) {
                  for (let k = 0; k < stopByLength; k++) {
                        finalWords.push(newWordsSlice[i].word);
                        i++;
                  }
            }
            if (j < newNumbersSlice.length) {
                  finalWords.push(newNumbersSlice[j].word);
            }

            j++;
      }

      return finalWords;
};

export const wordsMixerOne = (props) => {
      let words = [];
      words.push(" ");
      if (props.mode === "test") {
            const mixedWords = wordsMixer(
                  props.allWords,
                  props.statsData,
                  props.languageAndRange
            );

            for (let i = 0; i < props.allWords.length; i++) {
                  words.push(mixedWords[i], " ");
            }
      } else {
            if (props.modeOne === "letters") {
                  if (props.modeTwo === "1") {
                        const letter = props.allWords[props.wordIndex];
                        const randomLetter =
                              props.allLetters[Math.floor(Math.random() * 25)];

                        for (let i = 0; i < 100; i++) {
                              let randomLength =
                                    Math.floor(Math.random() * 3) + 1;

                              words.push(letter.repeat(randomLength));

                              words.push(" ");

                              randomLength = Math.floor(Math.random() * 3) + 1;

                              words.push(randomLetter.repeat(randomLength));
                              words.push(" ");
                        }
                  } else {
                        const letter = props.allWords[props.wordIndex];
                        for (let i = 0; i < 100; i++) {
                              const randomLength =
                                    Math.floor(Math.random() * 3) + 1;

                              words.push(letter.repeat(randomLength));
                              words.push(" ");
                        }
                  }
            } else {
                  if (
                        props.modeTwo === "1" &&
                        props.practiseModeAllWords.length > 0
                  ) {
                        const word =
                              props.practiseModeAllWords[props.wordIndex];
                        const randomWord =
                              props.allWords[
                                    Math.floor(
                                          Math.random() * props.allWords.length
                                    )
                              ];

                        for (let i = 0; i < 100; i++) {
                              let randomLength =
                                    Math.floor(Math.random() * 2) + 1;

                              for (let i = 0; i < randomLength; i++) {
                                    words.push(word);
                                    words.push(" ");
                              }

                              randomLength = Math.floor(Math.random() * 2) + 1;

                              for (let i = 0; i < randomLength; i++) {
                                    words.push(randomWord);
                                    words.push(" ");
                              }
                        }
                  } else {
                        for (let i = 0; i < 100; i++) {
                              if (props.practiseModeAllWords.length > 0) {
                                    words.push(
                                          props.practiseModeAllWords[
                                                props.wordIndex
                                          ]
                                    );
                                    words.push(" ");
                              }
                        }
                  }
            }
      }
      return words;
};

export const shuffle = (input) => {
      let size = input.length;

      while (size > 0) {
            const randomIndex = Math.floor(Math.random() * size);
            size--;
            const temp = input[size];
            input[size] = input[randomIndex];
            input[randomIndex] = temp;
      }
};

export const highestAverageSpeedOfAWord = (statsData) => {
      statsData.testMode.highestAverageSpeedOfAWord = Object.entries(
            statsData.testMode.wordsStats
      ).reduce(
            (total, current) => {
                  if (total.speed < current[1].averageWpm) {
                        total.speed = current[1].averageWpm;
                        total.word = current[0];
                        return total;
                  } else {
                        return total;
                  }
            },
            {
                  word: undefined,
                  speed: -1,
            }
      );
};
export const highestAverageAcuuracyOfAWord = (statsData) => {
      statsData.testMode.highestAverageAccuracyOfAWord = Object.entries(
            statsData.testMode.wordsStats
      ).reduce(
            (total, current) => {
                  if (total.accuracy < current[1].averageWpm) {
                        total.accuracy = current[1].averageAccuracy;
                        total.word = current[0];
                        return total;
                  } else {
                        return total;
                  }
            },
            {
                  word: undefined,
                  accuracy: -1,
            }
      );
};

export const lastTwentyTestsAverages = (lastTwentyTests) => {
      const [wpmSum, accuracySum] = lastTwentyTests.reduce(
            (total, current) => {
                  return [total[0] + current.wpm, total[1] + current.accuracy];
            },
            [0, 0]
      );
      const lastTwentyTestsAverageWpm = wpmSum / lastTwentyTests.length;
      const lastTwentyTestsAverageAccuracy =
            accuracySum / lastTwentyTests.length;

      return [lastTwentyTestsAverageWpm, lastTwentyTestsAverageAccuracy];
};
