import { useRef, useState, Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { TypingArea } from "./typingArea";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import wipe from "../../assets/sounds/wipe.mp3";
import flastTwo from "../../assets/sounds/flash-2.mp3";
import { Howl } from "howler";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getToken } from "../../utilities/authentication";

export const HomePage = () => {
      const { loaderData } = useLoaderData();

      const [timer, setTimer] = useState(15);
      const [typingSoundPath, setTypingSoundPath] = useState(flastTwo);
      const restartButtonRef = useRef();
      const [theme, setTheme] = useState("green-theme");

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
      return (
            <Suspense
                  fallback={
                        <div
                              className={styles["page"]}
                              onKeyDown={pageKeyDownHandler}
                              tabIndex={0}
                        >
                              <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={[
                                          "#e15b64",
                                          "#f47e60",
                                          "#f8b26a",
                                          "#abbd81",
                                          "#849b87",
                                    ]}
                              />
                        </div>
                  }
            >
                  <Await resolve={loaderData}>
                        {(loaderData) => {
                              return (
                                    <div
                                          className={
                                                styles["page"] +
                                                " " +
                                                styles[
                                                      `home-page-${loaderData.settings.theme}`
                                                ]
                                          }
                                          onKeyDown={pageKeyDownHandler}
                                          tabIndex={0}
                                    >
                                          <ToastContainer
                                                position="top-right"
                                                autoClose={5000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick
                                                rtl={false}
                                                pauseOnFocusLoss
                                                draggable
                                                pauseOnHover
                                                theme="light"
                                          />
                                          {/* Same as */}
                                          <ToastContainer />
                                          <NavBar></NavBar>
                                          <main className={styles["main"]}>
                                                <section
                                                      className={
                                                            styles[
                                                                  "typing-section"
                                                            ]
                                                      }
                                                >
                                                      <TypingArea
                                                            ref={
                                                                  restartButtonRef
                                                            }
                                                            timer={timer}
                                                            typingSound={
                                                                  typingSound
                                                            }
                                                            theme={
                                                                  loaderData
                                                                        .settings
                                                                        .theme
                                                            }
                                                            data={
                                                                  loaderData.words
                                                            }
                                                      ></TypingArea>
                                                </section>
                                                <QuickSettings
                                                      setTimer={setTimer}
                                                      setTypingSoundPath={
                                                            setTypingSoundPath
                                                      }
                                                      settings={
                                                            loaderData.settings
                                                      }
                                                      setTheme={setTheme}
                                                ></QuickSettings>
                                                <footer></footer>
                                          </main>
                                    </div>
                              );
                        }}
                  </Await>
            </Suspense>
      );
};

const loader = async () => {
      const response = await fetch("http://localhost:8080");
      const data = await response.json();
      return data;
};

export const homePageLoader = async () => {
      return defer({
            loaderData: loader(),
      });
};
