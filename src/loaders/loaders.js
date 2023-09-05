import { defer } from "react-router-dom";
import { getToken } from "../utilities/utilities";

export const homePageLoader = async () => {
      return defer({
            loaderData: (async () => {
                  try {
                        const response = await fetch("http://localhost:8080");
                        const data = await response.json();
                        return data;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
            settingsData: await (async () => {
                  try {
                        const response = await fetch(
                              "http://localhost:8080/settings",
                              {
                                    headers: {
                                          authorization: "Bearer " + getToken(),
                                    },
                              }
                        );
                        const data = await response.json();
                        return data;
                  } catch (error) {
                        return { status: "error", message: error.message };
                  }
            })(),
      });
};

export const statsPageLoader = async () => {
      return defer({
            loaderData: (async () => {
                  const response = await fetch("http://localhost:8080/stats", {
                        headers: {
                              authorization: "Bearer " + getToken(),
                        },
                  });
                  const data = await response.json();

                  return data;
            })(),
            settingsData: await (async () => {
                  const response = await fetch(
                        "http://localhost:8080/settings",
                        {
                              headers: {
                                    authorization: "Bearer " + getToken(),
                              },
                        }
                  );
                  const data = await response.json();

                  return data;
            })(),
      });
};
