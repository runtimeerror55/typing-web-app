import { defer } from "react-router-dom";
const loader = async () => {
      const response = await fetch("http://localhost:8080");
      const data = await response.json();
      return data;
};

export const homePageLoader = async () => {
      return defer({
            loaderData: loader(),
      });
};
