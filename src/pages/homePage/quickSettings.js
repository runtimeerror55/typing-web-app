import styles from "./quickSettings.module.css";
export const QuickSettings = () => {
      return (
            <>
                  <section className={styles["filtering-section"]}>
                        <div className={styles["filtering-form"]}>
                              <div>
                                    <select name="time">
                                          <option value="" disabled selected>
                                                TIMER
                                          </option>
                                          <option value="15">15 seconds</option>
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
                                    <select name="price">
                                          <option value="" disabled selected>
                                                PRICE
                                          </option>
                                          <option value="4000">
                                                upto $ 4000
                                          </option>
                                          <option value="3000">
                                                upto $ 3000
                                          </option>
                                          <option value="2000">
                                                upto $ 2000
                                          </option>
                                          <option value="1000">
                                                upto $ 1000
                                          </option>
                                    </select>
                                    <select name="cpuBrand">
                                          <option value="" disabled selected>
                                                CPU
                                          </option>
                                          <option value="Amd">Amd</option>

                                          <option value="Intel">Intel</option>
                                    </select>
                              </div>
                              <div>
                                    <select name="sort">
                                          <option value="" disabled selected>
                                                sortby
                                          </option>
                                          <option value="1">
                                                price low to high
                                          </option>

                                          <option value="-1">
                                                price high to low
                                          </option>
                                    </select>
                              </div>
                        </div>
                  </section>
            </>
      );
};
