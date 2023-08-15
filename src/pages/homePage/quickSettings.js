import { set } from "mongoose";
import styles from "./quickSettings.module.css";
export const QuickSettings = ({
      setTimer,
      setTypingSoundPath,
      theme,
      setTheme,
}) => {
      return (
            <>
                  <section
                        className={
                              styles["filtering-section"] +
                              " " +
                              styles[`filtering-section-${theme}`]
                        }
                  >
                        <select
                              name="time"
                              onChange={(event) => {
                                    setTimer(+event.target.value);
                              }}
                        >
                              <option value="" disabled>
                                    TIMER
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
                                    setTheme(event.target.value);
                              }}
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
                        >
                              <option value="" disabled>
                                    sounds
                              </option>
                              <option value="wipe.mp3">type 1</option>
                              <option value="confetti.mp3">type 2</option>
                              <option value="b.mp3">b</option>
                              <option value="c.mp3">c</option>
                              <option value="d.mp3">d</option>
                              <option value="e.mp3">e</option>
                              <option value="k.mp3">f</option>
                              <option value="confettiEdited.mp3">
                                    confettiEdited
                              </option>
                        </select>
                  </section>
            </>
      );
};
