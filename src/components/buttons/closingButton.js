import styles from "./closingButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export const ClosingButton = ({ clickHandler }) => {
      return (
            <button onClick={clickHandler} className={styles["closing-button"]}>
                  <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
      );
};
