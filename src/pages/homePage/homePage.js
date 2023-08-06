import { NavBar } from "../../components/navBar/navBar";
import { TypingParagraph } from "./typingParagraph";
import styles from "./homePage.module.css";

export const HomePage = () => {
      return (
            <div className={styles["page"]}>
                  <NavBar></NavBar>
                  <main className={styles["main"]}>
                        <section className={styles["typing-section"]}>
                              <TypingParagraph></TypingParagraph>
                        </section>
                        <footer></footer>
                  </main>
            </div>
      );
};
