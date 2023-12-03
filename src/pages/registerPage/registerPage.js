import styles from "./registerPage.module.css";
import { Form, useFetcher, useNavigate } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authContext } from "../../context/auth";
export const RegisterPage = () => {
      const { login } = useContext(authContext);
      const navigate = useNavigate();
      const registerFetcher = useFetcher();
      const registerFetcherStatus =
            registerFetcher.state === "idle" && registerFetcher.data;
      useEffect(() => {
            if (registerFetcherStatus) {
                  const data = registerFetcher.data;
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

                        login(data);
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
      }, [registerFetcher]);
      return (
            <div className={styles["page"]}>
                  <ToastContainer />
                  <NavBar></NavBar>
                  <main className={styles["main"]}>
                        <registerFetcher.Form
                              action="/register"
                              method="post"
                              className={styles["register-form"]}
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
                                    className={styles["register-button"]}
                              >
                                    register
                              </button>
                        </registerFetcher.Form>
                  </main>
            </div>
      );
};
