import styles from "./practisePage.module.css";
import { NavBar } from "../../components/navBar/navBar";
import { Link } from "react-router-dom";
const commonWords = [
      "as",
      "i",
      "his",
      "that",
      "he",
      "was",
      "for",
      "on",
      "are",
      "with",
      "they",
      "be",
      "at",
      "one",
      "have",
      "this",
      "from",
      "by",
      "hot",
      "word",
      "but",
      "what",
      "some",
      "is",
      "it",
      "you",
      "or",
      "had",
      "the",
      "of",
      "to",
      "and",
      "a",
      "in",
      "we",
      "can",
      "out",
      "other",
      "were",
      "which",
      "do",
      "their",
      "time",
];

const letters = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
];
export const PractisePage = () => {
      return (
            <div className={styles["page"]}>
                  <NavBar></NavBar>
                  <main className={styles["main"]}>
                        <section className={styles["letters-section"]}>
                              {letters.map((letter) => {
                                    return (
                                          <Link
                                                to={`/?mode=practise&word=${letter}`}
                                                className={styles["word"]}
                                          >
                                                <h2
                                                      className={
                                                            styles[
                                                                  "letter-title"
                                                            ]
                                                      }
                                                >
                                                      {letter}
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
                                          </Link>
                                    );
                              })}
                        </section>
                        <section className={styles["words-section"]}>
                              {commonWords.map((word) => {
                                    return (
                                          <Link
                                                to={`/?mode=practise&word=${word}`}
                                                className={styles["word"]}
                                          >
                                                <h2
                                                      className={
                                                            styles["word-title"]
                                                      }
                                                >
                                                      {word}
                                                </h2>
                                                <div
                                                      className={
                                                            styles["word-stats"]
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
                                          </Link>
                                    );
                              })}
                        </section>
                  </main>
            </div>
      );
};
