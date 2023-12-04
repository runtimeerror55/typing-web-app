import styles from "./guidePage.module.css";
import { NavBar } from "../../components/navBar/navBar";

const theme = "blue-theme";
export const GuidePage = () => {
      return (
            <div
                  className={
                        styles["page"] + " " + styles[`home-page-${theme}`]
                  }
            >
                  <NavBar theme={theme}></NavBar>

                  <main className={styles["main"]}>
                        <h1 className={styles["guide-heading"]}>Guide</h1>
                        <p className={styles["answers"]}>
                              Hello, welcom to MINITYPE, this guide will explain
                              you why MINITYPE is the best for improving your
                              typing skills. MINITYPE was build to address some
                              of the problems that are faced that are mentioned
                              below.
                        </p>
                        <h3 className={styles["sub-heading"]}>
                              1. I want to have simple,elegant ,easy to use use
                              typing website
                        </h3>
                        <p className={styles["answers"]}>
                              Keeping this in mind, MINITYPE was built to be
                              simple,elegant and easy to use. I am sure it is
                              quiet evident once you experience it.
                        </p>
                        <h3 className={styles["sub-heading"]}>
                              2. I dont want have to have too much customization
                        </h3>
                        <p className={styles["answers"]}>
                              This is one of the features of MINITYPE, there
                              arent too many unecessary options nor too less
                              important options. MINITYPE has balanced enough
                              customization like different themes, timers,
                              sounds,words,stats which are essential
                        </p>
                        <h3 className={styles["sub-heading"]}>
                              3. I want see my stats like speed, accuracy of all
                              tests and also for recent tests to see if i am
                              improving
                        </h3>
                        <p className={styles["answers"]}>
                              {" "}
                              This is one of the most important feature for
                              improving typing skills. MINITYPE has all the
                              stats like speed, accuracy,highest speed of a
                              test,total time spent in tests for all the tests.
                              But we know that your all time averages is not the
                              reflection of your current skills , so MINITYPE
                              also calculates averages of the last 20 tests
                              which is far more better indication of your
                              current skills. The best part is these stats are
                              displayed right on the typing page , so that you
                              dont need to go to other pages to contantly check
                              your stats. stats being displayed right on the
                              typing page are just a glance away.
                        </p>
                        <h3 className={styles["sub-heading"]}>
                              4. There are too many words to improve
                        </h3>
                        <p className={styles["answers"]}>
                              MINITYPE knows that too many words can be
                              overwhelming and takes too long to improve speed
                              and accuracy . MINITYPE has different sizes of
                              sets of words which can reach close to 350 words.
                              Having smaller set of words like 100 words will
                              make you increase speeds,accuracy in quicker time
                              and more concentration per word. All these
                              different sets of words have their own stats so
                              that you know where you stand in a particular set.
                        </p>

                        <h3 className={styles["sub-heading"]}>
                              5. Are the test word positions generated randomly,
                              what if i type some words too many times and some
                              words lot less.
                        </h3>
                        <p className={styles["answers"]}>
                              Lot of the other typing websites do this and
                              MINITYPE knows that randomly generating word
                              positions can make you type some words too many
                              times and some words a lot lesser over a period of
                              time as it is not guaranteed. But MINITYPE has an
                              algorithm where it tracks how many times you have
                              typed a word in all tests and generates the tests
                              word positions from least frequently typed too
                              highest frequently typed word(also shuffles the
                              words so that there wont be same order of words).
                              This way all the words are typed almost evenly and
                              also randomly. This is one of the best features of
                              MINITYPE.
                        </p>

                        <h3 className={styles["sub-heading"]}>
                              6. I want to practise words that i am not good at
                        </h3>
                        <p className={styles["answers"]}>
                              Oh yes you really should be able to do that. It is
                              one of the essential feature to practise words
                              that you are not so good at. MINITYPE has another
                              feature called "PRACTISE MODE" where it has speed
                              data of all the words of your tests and
                              categorises into different speeds from low to
                              high. Here you can practise individual words as
                              long as you want to.
                        </p>

                        <h3 className={styles["sub-heading"]}>
                              7. I want to improve my numpad skills
                        </h3>
                        <p className={styles["answers"]}>
                              MINITYPE does have a set where all of them are
                              just numbers of different lengths where you can
                              test your numpad skills.This is essential for
                              people who use numpad a lot.
                        </p>

                        <h3 className={styles["sub-heading"]}>Summary</h3>
                        <ul>
                              <li>multiple themes</li>
                              <li>multiple sound effects on keypress</li>
                              <li>
                                    different sets of words with different sizes
                                    which can go upto 350 words per set
                              </li>
                              <li>
                                    set of only numbers of different lengths to
                                    practise numpad
                              </li>
                              <li>
                                    essential stats like average speed,accuracy,
                                    total tests of all tests and also for last
                                    20 tests
                              </li>
                              <li>
                                    displaying stats on the typing page for
                                    quicker access
                              </li>
                              <li>
                                    practise mode for practising individual
                                    words , which also categorises words based
                                    on average speed of each word from its last
                                    20 speeds.
                              </li>
                              <li>
                                    genrationg word positions in a way that all
                                    the words are typed almost evenly which
                                    inturn gives correct stats.
                              </li>
                              <li>simple , elegant,easy to use experience.</li>
                        </ul>
                  </main>
            </div>
      );
};
