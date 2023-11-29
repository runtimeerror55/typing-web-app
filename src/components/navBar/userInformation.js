import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../context/auth";
import styles from "./userInformation.module.css";
import avatar from "../../assets/images/Avatar_icon_green.svg.png";

export const UserInformation = ({ setShowUserInformation, theme }) => {
      const { decodedToken, logout } = useContext(authContext);
      const navigate = useNavigate();

      const logoutHandler = () => {
            logout();
            setShowUserInformation(false);
            window.location = "/";
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
                  <div>{decodedToken ? decodedToken.email : ""}</div>
                  {decodedToken ? (
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
