import { NavBar } from "../../components/navBar/navBar";
import { TypingArea } from "./typingArea";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import { useRef, useState } from "react";

export const HomePage = () => {
      const [timer, setTimer] = useState(15);

      const restartButtonRef = useRef();
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
                        <QuickSettings setTimer={setTimer}></QuickSettings>
                        <section className={styles["typing-section"]}>
                              <TypingArea
                                    ref={restartButtonRef}
                                    timer={timer}
                              ></TypingArea>
                        </section>

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
