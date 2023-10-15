import { defer } from "react-router-dom";
import { getToken } from "../utilities/utilities";

const getUserStats = async () => {
      try {
            const response = await fetch("http://localhost:8080/UserStats", {
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

const getWords = async () => {
      try {
            const response = await fetch("http://localhost:8080");
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const homePageLoader = async () => {
      console.log("homepageloader");
      return defer({
            wordsLoaderData: getWords(),
            settingsLoaderData: getUserSettings(),
            statsLoaderData: getUserStats(),
      });
};

export const statsPageLoader = async () => {
      return defer({
            loaderData: getUserStats(),
            settingsData: await getUserSettings(),
      });
};
