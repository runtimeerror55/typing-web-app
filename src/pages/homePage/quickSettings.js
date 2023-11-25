import { Form } from "react-router-dom";
import styles from "./quickSettings.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";
import { getWords, getUserStats } from "../../loaders/loaders";
import { updateSettings } from "../../actions/actions";
import { authContext } from "../../context/auth";

export const QuickSettings = ({
      setTimer,
      setTypingSoundPath,
      settings,
      setTheme,
      theme,
      setMode,
      setModeOne,
      mode,
      modeOne,
      setModeTwo,
      setAllWords,
      allLetters,
      allWords,
      setWordIndex,
      statsData,
      setModeThree,
      setLanguageAndRange,
      languageAndRange,
      setShowParagraphLoader,
      setStatsData,
      setPractiseModeAllWords,
      modeThree,
      timer,
      modeTwo,
      typingSoundPath,
}) => {
      const { token } = useContext(authContext);
      const wordsFilterRef = useRef();
      const [wordsFilterRefPreviousValue, setWordsFilterRefPreviousValue] =
            useState(
                  JSON.stringify({
                        language: "english",
                        optionIndex: 0,
                  })
            );
      const [wordsFilterRefCurrentValue, setWordsFilterRefCurrentValue] =
            useState(
                  JSON.stringify({
                        language: "english",
                        optionIndex: 0,
                  })
            );

      const wordsChangeHandler = async (event) => {
            const value = JSON.parse(event.target.value);

            setWordsFilterRefCurrentValue(event.target.value);
            // const data = await getWords({
            //       request: {
            //             url: `http://localhost:3000?language=${value.language}&optionIndex=${value.optionIndex}`,
            //       },
            // });
            // if (data.status === "success") {
            //       setLanguageAndRange(value);

            //       setAllWords(data.payload);

            //       setWordsFilterRefPreviousValue(wordsFilterRefCurrentValue);
            //       setWordIndex(0);
            // } else {
            //       toast.error(data.message, toastOptions);
            //       wordsFilterRef.current.value = wordsFilterRefPreviousValue;
            // }
            // wordsFetcher.submit(value, { method: "GET", action: "/words" });
            // languageStatsFetcher.submit(value, {
            //       method: "GET",
            //       action: "/stats",
            // });

            const responseOne = getWords({
                  request: {
                        url: `http://localhost:3000?language=${value.language}&optionIndex=${value.optionIndex}`,
                  },
            });
            const responseTwo = getUserStats({
                  request: {
                        url: `http://localhost:3000/userStats?language=${value.language}&optionIndex=${value.optionIndex}`,
                  },
            });
            setShowParagraphLoader(true);

            const responses = await Promise.allSettled([
                  responseOne,
                  responseTwo,
            ]);
            if (responses[0].value.status === "success") {
                  setLanguageAndRange(value);

                  setAllWords(responses[0].value.payload);
                  setStatsData(responses[1].value);
                  setModeThree(500);
                  setWordIndex(0);
                  setWordsFilterRefPreviousValue(value);
            } else {
                  toast.error("something went wrong", toastOptions);
                  console.log(wordsFilterRef, wordsFilterRef.current);
                  wordsFilterRef.current.value = wordsFilterRefPreviousValue;
            }

            setShowParagraphLoader(false);
      };
      const [speedDistribution, setSpeedDistribution] = useState({});

      useEffect(() => {
            const testMode = statsData.payload?.testMode;
            const speedDistribution = {};
            if (testMode) {
                  Object.values(testMode.wordsStats).forEach((value) => {
                        for (let i = 30; i < 300; i += 10) {
                              if (value.averageWpm < i) {
                                    if (speedDistribution[i] === undefined) {
                                          speedDistribution[i] = 1;
                                    } else {
                                          speedDistribution[i]++;
                                    }
                              }
                        }
                  });
            }
            setSpeedDistribution(speedDistribution);
      }, []);

      const settingsChangeHandler = async (event) => {
            const data = await updateSettings({
                  [event.target.name]: event.target.value,
            });
            if (data.status === "error") {
                  toast.error(data.message, toastOptions);
            }
      };

      return (
            <>
                  <Form
                        method="POST"
                        action="/settings"
                        onChange={settingsChangeHandler}
                  >
                        <section
                              className={
                                    styles["filtering-section"] +
                                    " " +
                                    styles[`filtering-section-${theme}`]
                              }
                        >
                              {/* timer */}
                              <select
                                    name="timer"
                                    onChange={(event) => {
                                          setTimer(+event.target.value);
                                    }}
                                    value={timer}
                              >
                                    <option value="" disabled>
                                          TIMER
                                    </option>
                                    <option value="5" selected>
                                          5 seconds
                                    </option>
                                    <option value="15" selected>
                                          15 seconds
                                    </option>
                                    <option value="30">30 seconds</option>
                                    <option value="60">60 seconds</option>
                              </select>

                              {/* theme */}
                              <select
                                    name="theme"
                                    onChange={(event) => {
                                          setTheme(event.target.value);
                                    }}
                                    value={theme}
                              >
                                    <option value="" disabled>
                                          THEME
                                    </option>
                                    <option value="green-theme">green</option>
                                    <option value="blue-theme">blue</option>
                                    <option value="violet-theme">violet</option>
                              </select>

                              {/* sound */}
                              <select
                                    name="sound"
                                    onChange={async (event) => {
                                          setTypingSoundPath(
                                                event.target.value
                                          );
                                    }}
                                    value={typingSoundPath}
                              >
                                    <option disabled>sounds</option>

                                    <option value="soundA">sound A</option>
                                    <option value="soundB">sound B</option>
                              </select>

                              {/* mode */}
                              <select
                                    name="mode"
                                    onChange={(event) => {
                                          setMode(event.target.value);

                                          //   setAllWords(allWords);
                                          setModeOne("words");
                                          setModeTwo(0);
                                          setWordIndex(0);
                                    }}
                                    value={mode}
                              >
                                    <option disabled>MODE</option>
                                    <option value="test">test mode</option>
                                    <option value="practise">
                                          practise mode
                                    </option>
                              </select>

                              {/* language and range */}
                              <select
                                    name="language and range"
                                    ref={wordsFilterRef}
                                    //   onChange={(event) => {
                                    //         //     event.currentTarget.value = JSON.stringify({
                                    //         //         language: "english",
                                    //         //         startIndex: 0,
                                    //         //         endIndex: 99,
                                    //         //   })
                                    //         const value = JSON.parse(
                                    //               event.target.value
                                    //         );
                                    //         // setLanguageAndRange(value);
                                    //   }}
                                    onChange={wordsChangeHandler}
                                    value={JSON.stringify(languageAndRange)}
                              >
                                    <option disabled>
                                          languages and ranges
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "english (1-100)",
                                                optionIndex: 0,
                                          })}
                                    >
                                          english (1-100)
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "english (101-200)",
                                                optionIndex: 1,
                                          })}
                                    >
                                          english (101-200)
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "english (201-300)",
                                                optionIndex: 2,
                                          })}
                                    >
                                          english (201-300)
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "english (1-300)",
                                                optionIndex: 3,
                                          })}
                                    >
                                          english (1-300)
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "english (1-9 words + all numbers(1-30))",
                                                optionIndex: 4,
                                          })}
                                    >
                                          english (1-9 words + all
                                          numbers(1-30))
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "english (all numbers(1-30))",
                                                optionIndex: 5,
                                          })}
                                    >
                                          english (all numbers(1-30))
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: " english (1-9 words + all special words(1-20))",
                                                optionIndex: 6,
                                          })}
                                    >
                                          english (1-9 words + all special
                                          words(1-20))
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "english (1-300 words + all special characters(1-20))",
                                                optionIndex: 7,
                                          })}
                                    >
                                          english (1-300 words + all special
                                          characters(1-20))
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: " english (1-300 words + all numbers(30))",
                                                optionIndex: 8,
                                          })}
                                    >
                                          english (1-300 words + all
                                          numbers(90))
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "english",
                                                fullName: "  english (1-300 words + all special characters(90)+all numbers(90))",
                                                optionIndex: 9,
                                          })}
                                    >
                                          english (1-300 words + all special
                                          characters(90)+all numbers(90))
                                    </option>
                                    <option
                                          value={JSON.stringify({
                                                language: "javascript",
                                                fullName: "javascript (1-100)",
                                                optionIndex: 0,
                                          })}
                                    >
                                          javascript (1-100)
                                    </option>
                              </select>

                              {/* mode one */}
                              {mode === "practise" ? (
                                    <select
                                          name="mode-one"
                                          onChange={(event) => {
                                                setModeOne(event.target.value);
                                                if (
                                                      event.target.value ===
                                                      "words"
                                                ) {
                                                      setAllWords(allWords);
                                                } else {
                                                      setAllWords(allLetters);
                                                }
                                                setWordIndex(0);
                                                setModeTwo(0);
                                          }}
                                          value={modeOne}
                                    >
                                          <option disabled>MODE ONE</option>
                                          <option value="words">words</option>
                                          <option value="letters">
                                                letters
                                          </option>
                                    </select>
                              ) : null}

                              {/* mode two */}
                              {mode === "practise" && modeOne === "letters" ? (
                                    <select
                                          name="mode-two"
                                          onChange={(event) => {
                                                setModeTwo(event.target.value);
                                          }}
                                          value={modeTwo}
                                    >
                                          <option disabled>MODE TWO</option>
                                          <option value="1">
                                                include random letter
                                          </option>
                                          <option value="0">
                                                no random letter
                                          </option>
                                    </select>
                              ) : null}

                              {/* mode two */}
                              {mode === "practise" && modeOne === "words" ? (
                                    <select
                                          name="mode-two"
                                          onChange={(event) => {
                                                setModeTwo(event.target.value);
                                          }}
                                          value={modeTwo}
                                    >
                                          <option disabled>MODE TWO</option>
                                          <option value="1">
                                                include random word
                                          </option>
                                          <option value="0">
                                                no random word
                                          </option>
                                    </select>
                              ) : null}

                              {/* mode three */}
                              {mode === "practise" && modeOne === "words" ? (
                                    <select
                                          onChange={(event) => {
                                                if (!token) {
                                                      toast.error(
                                                            "please login to use this feature",
                                                            toastOptions
                                                      );
                                                      event.stopPropagation();
                                                } else if (
                                                      !statsData.payload
                                                            ?.testMode
                                                ) {
                                                      toast.error(
                                                            "no words data exists,please take some tests to generate data",
                                                            toastOptions
                                                      );
                                                      event.stopPropagation();
                                                } else {
                                                      setModeThree(
                                                            event.target.value
                                                      );
                                                      setWordIndex(0);
                                                }
                                          }}
                                          value={modeThree}
                                    >
                                          {token &&
                                          statsData.payload?.testMode ? (
                                                <>
                                                      {Object.entries(
                                                            speedDistribution
                                                      ).map(([key, value]) => {
                                                            return (
                                                                  <option
                                                                        value={
                                                                              key
                                                                        }
                                                                  >
                                                                        &lt;{" "}
                                                                        {key}{" "}
                                                                        wpm (
                                                                        {value})
                                                                  </option>
                                                            );
                                                      })}
                                                      <option value={500}>
                                                            All
                                                      </option>
                                                </>
                                          ) : (
                                                <>
                                                      <option disabled>
                                                            FILTER BY SPEED
                                                      </option>

                                                      <option value={30}>
                                                            &lt; {30} wpm ({0})
                                                      </option>
                                                      <option value={40}>
                                                            &lt; {40} wpm ({0})
                                                      </option>
                                                      <option value={50}>
                                                            &lt; {50} wpm ({0})
                                                      </option>
                                                      <option value={60}>
                                                            &lt; {60} wpm ({0})
                                                      </option>
                                                      <option value={70}>
                                                            &lt; {70} wpm ({0})
                                                      </option>
                                                      <option value={80}>
                                                            &lt; {80} wpm ({0})
                                                      </option>
                                                      <option value={90}>
                                                            &lt; {90} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {90} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {100} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {110} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {120} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {130} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {140} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {150} wpm ({0})
                                                      </option>
                                                      <option value={30}>
                                                            &lt; {160} wpm ({0})
                                                      </option>
                                                      <option value={500}>
                                                            All
                                                      </option>
                                                </>
                                          )}
                                    </select>
                              ) : null}
                        </section>
                  </Form>
            </>
      );
};
