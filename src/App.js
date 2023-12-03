import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AwaitHomePage } from "./pages/homePage/awaitHomePage";
import { AwaitStatsPage } from "./pages/statsPage/awaitStatsPage";
import { updateSettings, registerAction, loginAction } from "./actions/actions";
import {
      statsPageLoader,
      homePageLoader,
      getWords,
      getUserPreviousSessionSettings,
      getUserStats,
      getUserStatsOne,
      getUserDetails,
} from "./loaders/loaders";
import { RegisterPage } from "./pages/registerPage/registerPage";
import { LoginPage } from "./pages/loginPage/loginPage";
import { AuthProvider } from "./context/auth";
import { PractisePage } from "./pages/practisePage/practisePage";

const router = createBrowserRouter([
      {
            path: "/",
            element: <AwaitHomePage></AwaitHomePage>,
            loader: homePageLoader,
      },
      {
            path: "/statsPage",
            element: <AwaitStatsPage></AwaitStatsPage>,
            loader: statsPageLoader,
      },
      {
            path: "/stats",
            loader: getUserStats,
      },
      {
            path: "/statsOne",
            loader: getUserStatsOne,
      },

      {
            path: "/settings",
            action: updateSettings,
      },
      { path: "/userDetails", loader: getUserDetails },
      {
            path: "/previousSessionSettings",
            loader: getUserPreviousSessionSettings,
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
            path: "/words",
            loader: getWords,
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
