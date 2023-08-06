import { NavBar } from "../../components/navBar/navBar";
import { TypingParagraph } from "./typingParagraph";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";

export const HomePage = () => {
      return (
            <div className={styles["page"]}>
                  <NavBar></NavBar>
                  <main className={styles["main"]}>
                        <QuickSettings></QuickSettings>
                        <section className={styles["typing-section"]}>
                              <TypingParagraph></TypingParagraph>
                        </section>

                        <footer></footer>
                  </main>
            </div>
      );
};
