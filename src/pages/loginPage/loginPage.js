import styles from "./loginPage.module.css";
import { useNavigate, Link } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { authContext } from "../../context/auth";
import { ButtonWithActionAndLoader } from "../../components/buttons/buttonWithActionAndLoader";
export const LoginPage = () => {
      const { login } = useContext(authContext);

      const navigate = useNavigate();

      const callBack = (data) => {
            login(data);
            navigate("/");
      };

      return (
            <div className={styles["page"]}>
                  <NavBar></NavBar>
                  <ToastContainer></ToastContainer>
                  <main className={styles["main"]}>
                        <section className={styles["login-form-section"]}>
                              <ButtonWithActionAndLoader
                                    buttonText="Login"
                                    buttonClass={styles["login-button"]}
                                    loaderHeight="25"
                                    loaderWidth="100"
                                    action="/login?type=login+user"
                                    method="POST"
                                    formClass={styles["login-form"]}
                                    callBack={callBack}
                                    loaderColor="black"
                              >
                                    <input
                                          type="text"
                                          id="name"
                                          name="name"
                                          placeholder="name"
                                          required
                                          className={
                                                styles["user-details-input"]
                                          }
                                          autoComplete="off"
                                    ></input>
                                    <input
                                          type="password"
                                          id="password"
                                          name="password"
                                          placeholder="password"
                                          required
                                          className={
                                                styles["user-details-input"]
                                          }
                                          autoComplete="off"
                                    ></input>
                              </ButtonWithActionAndLoader>
                              <Link
                                    to="/register"
                                    className={styles["register-button"]}
                              >
                                    sign up
                              </Link>
                        </section>
                  </main>
            </div>
      );
};
