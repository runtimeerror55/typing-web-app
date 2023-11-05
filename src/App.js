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
} from "./loaders/loaders";
import { RegisterPage } from "./pages/registerPage/registerPage";
import { LoginPage } from "./pages/loginPage/loginPage";
import { AuthProvider } from "./context/auth";
import { PractisePage } from "./pages/practisePage/practisePage";
import { SettingsProvider } from "./context/settings";
import { postTestStats } from "./actions/actions";

const router = createBrowserRouter([
      {
            path: "/",
            element: <AwaitHomePage></AwaitHomePage>,
            loader: homePageLoader,
            shouldRevalidate: ({ formAction }) => {
                  return true;
            },
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
            path: "/practise",
            element: <PractisePage></PractisePage>,
      },
      {
            path: "/settings",
            action: updateSettings,
      },
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
