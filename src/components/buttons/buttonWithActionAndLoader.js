import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import styles from "./buttonWithActionAndLoader.module.css";
import { toastOptions, barsOptions } from "../../utilities/utilities";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";

export const ButtonWithActionAndLoader = ({
      action,
      method,
      buttonClass,
      children,
      buttonText,
      formClass,
      loaderHeight,
      loaderWidth,
      callBack,
      loaderColor,
}) => {
      const updatePlayListsFetcher = useFetcher();

      const updatePlayListsFetcherStatus =
            updatePlayListsFetcher.state === "idle" &&
            updatePlayListsFetcher.data;

      const [showUpdatePlayListLoader, setShowUpdatePlayListLoader] =
            useState(false);
      useEffect(() => {
            if (updatePlayListsFetcherStatus) {
                  const data = updatePlayListsFetcher.data;
                  console.log(data);
                  if (data.status === "success") {
                        toast.success(data.message, toastOptions);
                        if (callBack) {
                              callBack(data);
                        }
                  } else {
                        toast.error(data.message, toastOptions);
                  }
                  setShowUpdatePlayListLoader(false);
            } else if (updatePlayListsFetcher.state !== "idle") {
                  setShowUpdatePlayListLoader(true);
            }
      }, [updatePlayListsFetcher]);

      return (
            <>
                  <updatePlayListsFetcher.Form
                        method={method}
                        action={action}
                        className={formClass ? formClass : ""}
                  >
                        {children}

                        {showUpdatePlayListLoader ? (
                              <button
                                    type="button"
                                    className={
                                          buttonClass
                                                ? buttonClass
                                                : styles[
                                                        "button-with-action-and-loader"
                                                  ]
                                    }
                              >
                                    <Bars
                                          height={loaderHeight}
                                          width={loaderWidth}
                                          color={
                                                loaderColor
                                                      ? loaderColor
                                                      : "white"
                                          }
                                          ariaLabel="bars-loading"
                                          visible={true}
                                    />
                              </button>
                        ) : (
                              <button
                                    type="submit"
                                    className={
                                          buttonClass
                                                ? buttonClass
                                                : styles[
                                                        "button-with-action-and-loader"
                                                  ]
                                    }
                              >
                                    {buttonText}
                              </button>
                        )}
                  </updatePlayListsFetcher.Form>
            </>
      );
};
