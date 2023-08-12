import { Link, Outlet } from "react-router-dom";
import styles from "./navBar.module.css";
export const NavBar = () => {
      return (
            <>
                  <nav className={styles["nav-bar"]}>
                        <h1 class={styles.logo}>TYPINGO</h1>

                        <div>
                              <Link to={"/"} className={styles["nav-link"]}>
                                    HOME
                              </Link>
                              <Link
                                    className={
                                          styles["cart-link"] +
                                          " " +
                                          styles["nav-link"]
                                    }
                                    to={"/stats"}
                              >
                                    STATS
                              </Link>
                              <Link
                                    to="/account"
                                    className={styles["nav-link"]}
                              >
                                    ACCOUNT
                              </Link>
                        </div>
                  </nav>
            </>
      );
};
