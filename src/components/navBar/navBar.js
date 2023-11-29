import { Link, Form, useNavigate } from "react-router-dom";
import styles from "./navBar.module.css";
import { useContext, useState } from "react";
import { authContext } from "../../context/auth";
import { UserInformation } from "./userInformation";
export const NavBar = ({ theme }) => {
      const { decodedToken, logout } = useContext(authContext);
      const [showUserInfromation, setShowUserInformation] = useState(false);

      const accountClickHandler = () => {
            setShowUserInformation((previous) => {
                  return !previous;
            });
      };
      return (
            <>
                  <nav className={styles["nav-bar"]}>
                        <h1 className={styles.logo}>MINITYPE</h1>

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
                                    to={"/statsPage"}
                              >
                                    STATS
                              </Link>
                              {!decodedToken ? (
                                    <>
                                          <Link
                                                to="/login"
                                                className={styles["nav-link"]}
                                          >
                                                LOGIN
                                          </Link>
                                          <Link
                                                to="/practise"
                                                className={styles["nav-link"]}
                                          >
                                                PRACTISE
                                          </Link>
                                    </>
                              ) : null}
                              {decodedToken ? (
                                    <button
                                          onClick={accountClickHandler}
                                          className={
                                                styles["logout-button"] +
                                                " " +
                                                styles["nav-link"]
                                          }
                                    >
                                          ACCOUNT
                                    </button>
                              ) : null}
                        </div>
                        {showUserInfromation ? (
                              <UserInformation
                                    setShowUserInformation={
                                          setShowUserInformation
                                    }
                                    theme={theme}
                              ></UserInformation>
                        ) : null}
                  </nav>
            </>
      );
};
