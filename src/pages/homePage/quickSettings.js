import { set } from "mongoose";
import styles from "./quickSettings.module.css";
export const QuickSettings = ({ setTimer, setTypingSoundPath }) => {
      return (
            <>
                  <section className={styles["filtering-section"]}>
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

                        <select name="theme">
                              <option value="" disabled selected>
                                    THEME
                              </option>
                              <option value="Asus">Asus</option>
                              <option value="Msi">Msi</option>
                              <option value="Dell">Dell</option>
                              <option value="Acer">Acer</option>
                              <option value="Razer">Razer</option>
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
                              <option value="" disabled selected>
                                    sounds
                              </option>
                              <option value="wipe.mp3">type 1</option>
                              <option value="confetti.mp3">type 2</option>
                        </select>
                  </section>
            </>
      );
};
