import { Link, Form, useNavigate } from "react-router-dom";
import styles from "./navBar.module.css";
import { useContext } from "react";
import { authContext } from "../../context/auth";
export const NavBar = () => {
      const { token, user, setToken, setUser, logout } =
            useContext(authContext);

      const navigate = useNavigate();

      const logoutHandler = () => {
            logout();
            navigate("/");
      };
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
                              {token ? (
                                    <button
                                          onClick={logoutHandler}
                                          className={styles["logout-button"]}
                                    >
                                          LOGOUT
                                    </button>
                              ) : (
                                    <>
                                          <Link
                                                to="/login"
                                                className={styles["nav-link"]}
                                          >
                                                LOGIN
                                          </Link>
                                          <Link
                                                to="/register"
                                                className={styles["nav-link"]}
                                          >
                                                REGISTER
                                          </Link>
                                    </>
                              )}
                        </div>
                  </nav>
            </>
      );
};
