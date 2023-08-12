export const typingParagraphReducer = (typingState, action) => {
      switch (action.type) {
            case "right hit": {
                  return {
                        ...typingState,
                        paragraphCurrentIndex: typingState.paragraphNextIndex,
                        paragraphNextIndex: typingState.paragraphNextIndex + 1,
                        currentLetterClass: "active-right",
                        started: true,
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
                  return {
                        paragraphCurrentIndex: -1,
                        paragraphNextIndex: 0,
                        currentLetterClass: "typing-letter",
                        started: false,
                        finished: false,
                  };
            }
      }
};
