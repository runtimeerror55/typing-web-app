import styles from "./loginPage.module.css";
import { useNavigate, useFetcher } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authContext } from "../../context/auth";
export const LoginPage = () => {
      const { setToken, setUser } = useContext(authContext);
      const navigate = useNavigate();
      const loginFetcher = useFetcher();
      const logingFetcherStatus =
            loginFetcher.state === "idle" && loginFetcher.data;
      console.log(loginFetcher.state, loginFetcher.data);
      useEffect(() => {
            if (logingFetcherStatus) {
                  const data = loginFetcher.data;
                  if (data.status === "success") {
                        toast.success(data.message, {
                              position: "bottom-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                        });
                        console.log(data);
                        setToken(data.payload.token);
                        setUser(data.payload.user);
                        localStorage.setItem(
                              "token",
                              JSON.stringify(data.payload.token)
                        );
                        navigate("/");
                  } else {
                        toast.error(data.message, {
                              position: "bottom-right",
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
      }, [loginFetcher]);
      return (
            <div className={styles["page"]}>
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
                        <loginFetcher.Form
                              action="/login"
                              method="post"
                              className={styles["login-form"]}
                        >
                              <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                              <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="name"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                              <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                              <button
                                    type="submit"
                                    className={styles["login-button"]}
                              >
                                    login
                              </button>
                        </loginFetcher.Form>
                  </main>
            </div>
      );
};
