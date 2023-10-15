import { Form, useFetcher, useSubmit } from "react-router-dom";
import styles from "./quickSettings.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";

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
      modeTwo,
      setModeTwo,
      setAllWords,
      allLetters,
      allWords,
      setWordIndex,
}) => {
      const submit = useSubmit();
      const updateSettingsFetcher = useFetcher();
      const updateSettingsFetcherStatus =
            updateSettingsFetcher.state === "idle" &&
            updateSettingsFetcher.data;

      useEffect(() => {
            if (updateSettingsFetcherStatus) {
                  const data = updateSettingsFetcher.data;

                  if (data.status === "success") {
                  } else {
                        toast.error(data.message, toastOptions);
                  }
            }
      }, [updateSettingsFetcher]);

      const settingsChangeHandler = (event) => {
            updateSettingsFetcher.submit(event.currentTarget);
      };
      return (
            <>
                  <updateSettingsFetcher.Form
                        method="POST"
                        action="/settings"
                        // onChange={settingsChangeHandler}
                  >
                        <section
                              className={
                                    styles["filtering-section"] +
                                    " " +
                                    styles[`filtering-section-${theme}`]
                              }
                        >
                              <select
                                    name="timer"
                                    onChange={(event) => {
                                          setTimer(+event.target.value);
                                    }}
                                    defaultValue={settings.timer}
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

                              <select
                                    name="theme"
                                    onChange={(event) => {
                                          console.log(event.target.value);
                                          setTheme(event.target.value);
                                    }}
                                    defaultValue={theme}
                              >
                                    <option value="" disabled>
                                          THEME
                                    </option>
                                    <option value="green-theme">green</option>
                                    <option value="blue-theme">blue</option>
                                    <option value="violet-theme">violet</option>
                              </select>
                              <select
                                    name="sound"
                                    onChange={async (event) => {
                                          const soundFile = await import(
                                                `../../assets/sounds/${event.target.value}`
                                          );
                                          console.log(soundFile);
                                          setTypingSoundPath(soundFile.default);
                                    }}
                                    defaultValue={settings.sound}
                              >
                                    <option value="" disabled>
                                          sounds
                                    </option>
                                    <option value="wipe.mp3">wipe</option>
                                    <option value="confetti.mp3">
                                          confetti
                                    </option>
                                    <option value="b.mp3">b</option>
                                    <option value="c.mp3">c</option>
                                    <option value="d.mp3">d</option>
                                    <option value="e.mp3">e</option>
                                    <option value="k.mp3">k</option>
                                    <option value="confettiEdited.mp3">
                                          confettiEdited
                                    </option>
                              </select>
                              <select
                                    name="mode"
                                    onChange={(event) => {
                                          setMode(event.target.value);
                                          setAllWords(allWords);
                                          setModeOne("words");
                                          setModeTwo(0);
                                          setWordIndex(0);
                                    }}
                                    defaultValue="test"
                              >
                                    <option disabled>MODE</option>
                                    <option value="test">test mode</option>
                                    <option value="practise">
                                          practise mode
                                    </option>
                              </select>
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
                                          defaultValue="words"
                                    >
                                          <option disabled>MODE ONE</option>
                                          <option value="words">words</option>
                                          <option value="letters">
                                                letters
                                          </option>
                                    </select>
                              ) : null}

                              {mode === "practise" && modeOne === "letters" ? (
                                    <select
                                          name="mode-two"
                                          onChange={(event) => {
                                                setModeTwo(event.target.value);
                                          }}
                                          defaultValue="0"
                                    >
                                          <option disabled>MODE TWO</option>
                                          <option value="1">
                                                include random letter
                                          </option>
                                          <option value="0">
                                                do not include random letter
                                          </option>
                                    </select>
                              ) : null}

                              {mode === "practise" && modeOne === "words" ? (
                                    <select
                                          name="mode-two"
                                          onChange={(event) => {
                                                setModeTwo(event.target.value);
                                          }}
                                          defaultValue="0"
                                    >
                                          <option disabled>MODE TWO</option>
                                          <option value="1">
                                                include random word
                                          </option>
                                          <option value="0">
                                                do not include random word
                                          </option>
                                    </select>
                              ) : null}
                        </section>
                  </updateSettingsFetcher.Form>
            </>
      );
};
