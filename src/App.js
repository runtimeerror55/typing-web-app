import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage, homePageLoader } from "./pages/homePage/homePage";
import { StatsPage, statsPageLoader } from "./pages/statsPage/statsPage";
import {
      updateSettings,
      registerAction,
      loginAction,
      logoutAction,
} from "./actions/actions";
import { RegisterPage } from "./pages/registerPage/registerPage";
import { LoginPage } from "./pages/loginPage/loginPage";
import { AuthProvider } from "./context/auth";
import { ErrorPage } from "./pages/errorPage/errorPage";

const router = createBrowserRouter([
      {
            path: "/",
            element: <HomePage></HomePage>,
            loader: homePageLoader,
            shouldRevalidate: ({ currentUrl }) => {
                  console.log(currentUrl);
                  return currentUrl === "http://localhost:3000/logout";
            },
      },
      {
            path: "/stats",
            element: <StatsPage></StatsPage>,
            loader: statsPageLoader,
      },
      {
            path: "/settings",

            action: updateSettings,
      },
      {
            path: "/register",
            element: <RegisterPage></RegisterPage>,
            action: registerAction,
      },
      {
            path: "/login",
            element: <LoginPage></LoginPage>,
            action: loginAction,
      },
      {
            path: "logout",
            action: logoutAction,
      },
]);

function App() {
      return (
            <AuthProvider>
                  <RouterProvider router={router} />
            </AuthProvider>
      );
}

export default App;
