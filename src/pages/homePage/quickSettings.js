import { Form, useFetcher, useSubmit } from "react-router-dom";
import styles from "./quickSettings.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const QuickSettings = ({
      setTimer,
      setTypingSoundPath,
      settings,
      setTheme,
}) => {
      const submit = useSubmit();
      const updateSettingsFetcher = useFetcher();
      const updateSettingsFetcherStatus =
            updateSettingsFetcher.state === "idle" &&
            updateSettingsFetcher.data;

      useEffect(() => {
            if (updateSettingsFetcherStatus) {
                  const data = updateSettingsFetcher.data;
                  if (data.status === "success") {
                        toast.success(data.message, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                  } else {
                        toast.error(data.message, {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                  }
            }
      }, [updateSettingsFetcher]);

      const settingsChangeHandler = (event) => {
            updateSettingsFetcher.submit(event.currentTarget);
      };
      return (
            <>
                  <updateSettingsFetcher.Form
                        method="POST"
                        action="/settings"
                        onChange={settingsChangeHandler}
                  >
                        <section
                              className={
                                    styles["filtering-section"] +
                                    " " +
                                    styles[
                                          `filtering-section-${settings.theme}`
                                    ]
                              }
                        >
                              <select
                                    name="timer"
                                    onChange={(event) => {
                                          setTimer(+event.target.value);
                                    }}
                                    defaultValue={settings.timer}
                              >
                                    <option value="" disabled>
                                          TIMER
                                    </option>
                                    <option value="15" selected>
                                          15 seconds
                                    </option>
                                    <option value="30">30 seconds</option>
                                    <option value="60">60 seconds</option>
                              </select>

                              <select
                                    name="theme"
                                    onChange={(event) => {
                                          setTheme(event.target.value);
                                    }}
                                    defaultValue={settings.theme}
                              >
                                    <option value="" disabled>
                                          THEME
                                    </option>
                                    <option value="green-theme">green</option>
                                    <option value="blue-theme">blue</option>
                                    <option value="violet-theme">violet</option>
                              </select>
                              <select
                                    name="sound"
                                    onChange={async (event) => {
                                          const soundFile = await import(
                                                `../../assets/sounds/${event.target.value}`
                                          );
                                          console.log(soundFile);
                                          setTypingSoundPath(soundFile.default);
                                    }}
                                    defaultValue={settings.sound}
                              >
                                    <option value="" disabled>
                                          sounds
                                    </option>
                                    <option value="wipe.mp3">wipe</option>
                                    <option value="confetti.mp3">
                                          confetti
                                    </option>
                                    <option value="b.mp3">b</option>
                                    <option value="c.mp3">c</option>
                                    <option value="d.mp3">d</option>
                                    <option value="e.mp3">e</option>
                                    <option value="k.mp3">f</option>
                                    <option value="confettiEdited.mp3">
                                          confettiEdited
                                    </option>
                              </select>
                        </section>
                  </updateSettingsFetcher.Form>
            </>
      );
};
