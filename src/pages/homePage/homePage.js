import { useRef, useState, Suspense } from "react";
import { useAsyncValue, useLoaderData } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { TypingArea } from "./typingArea";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import flastTwo from "../../assets/sounds/flash-2.mp3";
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
      console.log(settingsData);
      if (settingsData.status === "error") {
            settingsData = { payload: { settings: defaultSettings } };
      }
      console.log(loaderData);

      const [timer, setTimer] = useState(settingsData.payload.settings.timer);

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
                              ></QuickSettings>
                              <footer></footer>
                        </main>
                  </div>
            );
      }
};
