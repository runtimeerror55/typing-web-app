import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../context/auth";
import styles from "./userInformation.module.css";
import avatar from "../../assets/images/Avatar_icon_green.svg.png";

export const UserInformation = ({ setShowUserInformation, theme }) => {
      const { token, logout, user } = useContext(authContext);

      const logoutHandler = () => {
            logout();
            setShowUserInformation(false);
      };
      return (
            <section
                  className={
                        styles["user-information-section"] +
                        " " +
                        styles["user-information-section-" + theme]
                  }
            >
                  <img
                        src={avatar}
                        className={styles["avatar-icon"]}
                        alt="profile icon"
                  ></img>
                  <div>{user ? user.name : ""}</div>
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
