import { json, redirect } from "react-router-dom";
import { getToken } from "../utilities/utilities.js";

export const postTestStats = async (testStats) => {
      try {
            const response = await fetch("http://localhost:8080/userStats", {
                  headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + getToken(),
                  },
                  method: "POST",
                  body: JSON.stringify(testStats),
            });
            const data = await response.json();
            return data;
      } catch (error) {
            return {
                  status: "error",
                  message: error.message,
            };
      }
};
export const updateSettings = async (body) => {
      console.log(body);
      let y = JSON.stringify(body);
      console.log(y);
      try {
            const response = await fetch("http://localhost:8080/settings", {
                  headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + getToken(),
                  },
                  method: "PUT",
                  body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const registerAction = async ({ request, params }) => {
      try {
            const formData = await request.formData();
            const body = Object.fromEntries(formData);
            const response = await fetch("http://localhost:8080/register", {
                  headers: {
                        "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const loginAction = async ({ request, params }) => {
      try {
            const formData = await request.formData();
            const body = Object.fromEntries(formData);
            const response = await fetch("http://localhost:8080/login", {
                  headers: {
                        "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(body),
            });
            const data = await response.json();
            return data;
      } catch (error) {
            return { status: "error", message: error.message };
      }
};

export const logoutAction = () => {
      localStorage.removeItem("token");
      return redirect("/");
};
