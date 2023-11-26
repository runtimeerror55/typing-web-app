import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../context/auth";
import styles from "./userInformation.module.css";
import avatar from "../../assets/images/Avatar_icon_green.svg.png";

export const UserInformation = ({ setShowUserInformation }) => {
      const { token, logout } = useContext(authContext);
      const navigate = useNavigate();

      const logoutHandler = () => {
            logout();
            setShowUserInformation(false);
      };
      return (
            <section className={styles["user-information-section"]}>
                  <img
                        src={avatar}
                        className={styles["avatar-icon"]}
                        alt="profile icon"
                  ></img>
                  <div>aakash deep</div>
                  {token ? (
                        <button
                              onClick={logoutHandler}
                              className={styles["logout-button"]}
                        >
                              Logout
                        </button>
                  ) : null}
            </section>
      );
};
