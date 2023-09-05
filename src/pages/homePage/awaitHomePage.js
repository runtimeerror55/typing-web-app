import { useRef, useState, Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { NavBar } from "../../components/navBar/navBar";
import { TypingArea } from "./typingArea";
import { QuickSettings } from "./quickSettings";
import styles from "./homePage.module.css";
import flastTwo from "../../assets/sounds/flash-2.mp3";
import { Howl } from "howler";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { colorRingOptions } from "../../utilities/utilities";
import "react-toastify/dist/ReactToastify.css";
import { HomePage } from "./homePage";

export const AwaitHomePage = () => {
      const { loaderData } = useLoaderData();

      return (
            <Suspense
                  fallback={
                        <div className={styles["page"]}>
                              <ColorRing {...colorRingOptions} />
                        </div>
                  }
            >
                  <Await resolve={loaderData}>
                        <HomePage></HomePage>
                  </Await>
            </Suspense>
      );
};
