import { useRef, useState, Suspense } from "react";
import {
      useAsyncValue,
      useLoaderData,
      useLocation,
      useSearchParams,
} from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { TypingArea } from "./typingArea";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import flastTwo from "../../assets/sounds/k.mp3";
import { Howl } from "howler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultSettings = {
      theme: "green-theme",
      sound: "confettiEdited",
      timer: 15,
};

export const HomePage = () => {
      const loaderData = useAsyncValue();
      let { settingsData } = useLoaderData();

      if (settingsData.status === "error") {
            settingsData = { payload: { settings: defaultSettings } };
      }

      const [timer, setTimer] = useState(settingsData.payload.settings.timer);
      const [queryParams] = useSearchParams();
      const [mode, setMode] = useState("test");

      if (queryParams.get("mode") === "practise") {
            let words = [];

            let letter = queryParams.get("word");
            for (let i = 0; i < 100; i++) {
                  const randomLength = Math.floor(Math.random() * 3) + 1;
                  //   words.push(queryParams.get("word"));

                  words.push(letter);
                  words.push(" ");
            }
            loaderData.words = words;
      }

      const [typingSoundPath, setTypingSoundPath] = useState(flastTwo);

      const restartButtonRef = useRef();

      const [theme, setTheme] = useState(settingsData.payload.settings.theme);

      const typingSound = new Howl({
            src: [typingSoundPath],
      });

      const pageKeyDownHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "Tab") {
                  restartButtonRef.current.focus();
            }
      };

      if (loaderData.status === "error") {
            return (
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[`home-page-green-theme`]
                        }
                        onKeyDown={pageKeyDownHandler}
                        tabIndex={0}
                  >
                        {loaderData.message}
                  </div>
            );
      } else {
            return (
                  <div
                        className={
                              styles["page"] +
                              " " +
                              styles[`home-page-${theme}`]
                        }
                        onKeyDown={pageKeyDownHandler}
                        tabIndex={0}
                  >
                        <ToastContainer />
                        <NavBar></NavBar>
                        <main className={styles["main"]}>
                              {mode === "practise" ? (
                                    <section>
                                          <div className={styles["word"]}>
                                                <h2
                                                      className={
                                                            styles[
                                                                  "letter-title"
                                                            ]
                                                      }
                                                >
                                                      {"a"}
                                                </h2>
                                                <div
                                                      className={
                                                            styles[
                                                                  "letter-stats"
                                                            ]
                                                      }
                                                >
                                                      <h3>practise</h3>
                                                      <span>
                                                            speed: 75wpm,{" "}
                                                      </span>
                                                      <span>accuracy: 85%</span>
                                                      <h3>test</h3>
                                                      <span>
                                                            speed: 60wpm,{" "}
                                                      </span>
                                                      <span>accuracy: 80%</span>
                                                </div>
                                          </div>
                                    </section>
                              ) : null}

                              <section className={styles["typing-section"]}>
                                    <TypingArea
                                          ref={restartButtonRef}
                                          timer={timer}
                                          typingSound={typingSound}
                                          theme={theme}
                                          data={loaderData.words}
                                    ></TypingArea>
                              </section>
                              <QuickSettings
                                    setTimer={setTimer}
                                    setTypingSoundPath={setTypingSoundPath}
                                    settings={settingsData.payload.settings}
                                    setTheme={setTheme}
                                    theme={theme}
                                    setMode={setMode}
                              ></QuickSettings>
                              <footer></footer>
                        </main>
                  </div>
            );
      }
};
