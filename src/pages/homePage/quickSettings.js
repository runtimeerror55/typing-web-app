import styles from "./quickSettings.module.css";
export const QuickSettings = ({ setTimer }) => {
      return (
            <>
                  <section className={styles["filtering-section"]}>
                        <div className={styles["filtering-form"]}>
                              <div>
                                    <select
                                          name="time"
                                          onChange={(event) => {
                                                setTimer(+event.target.value);
                                          }}
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

                                    <select name="theme">
                                          <option value="" disabled selected>
                                                THEME
                                          </option>
                                          <option value="Asus">Asus</option>
                                          <option value="Msi">Msi</option>
                                          <option value="Dell">Dell</option>
                                          <option value="Acer">Acer</option>
                                          <option value="Razer">Razer</option>
                                    </select>
                              </div>
                        </div>
                  </section>
            </>
      );
};
