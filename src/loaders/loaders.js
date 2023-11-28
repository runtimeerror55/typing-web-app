import { defer } from "react-router-dom";
import { getToken } from "../utilities/utilities";
let backEndUrl = "http://localhost:8080/";
export const getUserStats = async ({ request }) => {
      try {
            let url = new URL(request.url);
            let queryString = Array.from(url.searchParams).reduce(
                  (finalString, [key, value]) => {
                        if (finalString === "?") {
                              return finalString + key + "=" + value;
                        } else {
                              return finalString + "&" + key + "=" + value;
                        }
                  },
                  "?"
            );
            console.log(queryString);
            const response = await fetch(
                  `${backEndUrl}userStats${queryString}`,
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
};

export const getUserStatsOne = async ({ request }) => {
      try {
            let url = new URL(request.url);
            let queryString = Array.from(url.searchParams).reduce(
                  (finalString, [key, value]) => {
                        if (finalString === "?") {
                              return finalString + key + "=" + value;
                        } else {
                              return finalString + "&" + key + "=" + value;
                        }
                  },
                  "?"
            );
            console.log(queryString);
            const response = await fetch(
                  `${backEndUrl}userStatsOne${queryString}`,
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
};

const getUserSettings = async () => {
      try {
            const response = await fetch("http://localhost:8080/settings", {
                  headers: {
                        authorization: "Bearer " + getToken(),
                  },
            });
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const getUserPreviousSessionSettings = async () => {
      try {
            const response = await fetch(
                  "http://localhost:8080/previousSessionSettings",
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
};

export const getWords = async ({ request }) => {
      try {
            let url = new URL(request.url);
            let queryString = Array.from(url.searchParams).reduce(
                  (finalString, [key, value]) => {
                        if (finalString === "?") {
                              return finalString + key + "=" + value;
                        } else {
                              return finalString + "&" + key + "=" + value;
                        }
                  },
                  "?"
            );

            const response = await fetch(`${backEndUrl}words${queryString}`);
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const homePageLoader = async ({ request }) => {
      return defer({
            wordsLoaderData: new Promise((resolve, reject) => {
                  resolve({});
            }),
            settingsLoaderData: new Promise((resolve, reject) => {
                  resolve({});
            }),
            statsLoaderData: new Promise((resolve, reject) => {
                  resolve({});
            }),
      });
};

export const statsPageLoader = async ({ request }) => {
      return defer({
            loaderData: getUserStats({ request }),
            settingsData: await getUserSettings(),
      });
};
