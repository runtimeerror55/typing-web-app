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
            Math.floor(
                  (testStats.totalNumberOfRightHits / 5) *
                        (60 / timerState.elapsedTime)
            ) || 0;
      testStats.accuracy =
            Math.floor(
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

export const createtypingParagraphJsx = (words, typingState, wordRef) => {
      const paragraph = [];
      let index = -1;
      for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const temporary = [];
            for (let j = 0; j < word.length; j++) {
                  let className = "";
                  index++;
                  if (i < typingState.currentWordIndex) {
                        className = styles["active-right"];
                  } else if (i === typingState.currentWordIndex) {
                        if (j < typingState.currentLetterIndex) {
                              className = styles["active-right"];
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
