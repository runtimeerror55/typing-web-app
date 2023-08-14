import { useRef, useState } from "react";
import { NavBar } from "../../components/navBar/navBar";
import { TypingArea } from "./typingArea";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import wipe from "../../assets/sounds/wipe.mp3";
import flastTwo from "../../assets/sounds/flash-2.mp3";
import { Howl } from "howler";

export const HomePage = () => {
      const [timer, setTimer] = useState(15);
      const [typingSoundPath, setTypingSoundPath] = useState(flastTwo);
      const restartButtonRef = useRef();

      const typingSound = new Howl({
            src: [typingSoundPath],
      });
      console.log(typingSound);

      const pageKeyDownHandler = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "Tab") {
                  restartButtonRef.current.focus();
            }
      };
      return (
            <div
                  className={styles["page"]}
                  onKeyDown={pageKeyDownHandler}
                  tabIndex={0}
            >
                  <NavBar></NavBar>
                  <main className={styles["main"]}>
                        <section className={styles["typing-section"]}>
                              <TypingArea
                                    ref={restartButtonRef}
                                    timer={timer}
                                    typingSound={typingSound}
                              ></TypingArea>
                        </section>
                        <QuickSettings
                              setTimer={setTimer}
                              setTypingSoundPath={setTypingSoundPath}
                        ></QuickSettings>
                        <footer></footer>
                  </main>
            </div>
      );
};

export const homePageLoader = async () => {
      const response = await fetch("http://localhost:8080");
      const data = await response.json();
      return data;
};
