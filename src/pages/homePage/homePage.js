import { NavBar } from "../../components/navBar/navBar";
import { TypingParagraph } from "./typingParagraph";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import { useRef, useState } from "react";

export const HomePage = () => {
      const [timer, setTimer] = useState(60);

      const restartButtonRef = useRef();
      const pageKeyDownHandler = (event) => {
            console.log(event);
            event.preventDefault();
            event.stopPropagation();
            if (event.key === "Tab") {
                  console.log("tab");
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
                              <TypingParagraph
                                    ref={restartButtonRef}
                                    timer={timer}
                              ></TypingParagraph>
                        </section>

                        <footer></footer>
                  </main>
            </div>
      );
};
