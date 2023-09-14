import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AwaitHomePage } from "./pages/homePage/awaitHomePage";
import { AwaitStatsPage } from "./pages/statsPage/awaitStatsPage";
import { updateSettings, registerAction, loginAction } from "./actions/actions";
import { statsPageLoader, homePageLoader } from "./loaders/loaders";
import { RegisterPage } from "./pages/registerPage/registerPage";
import { LoginPage } from "./pages/loginPage/loginPage";
import { AuthProvider } from "./context/auth";

const router = createBrowserRouter([
      {
            path: "/",
            element: <AwaitHomePage></AwaitHomePage>,
            loader: homePageLoader,
            shouldRevalidate: ({ currentUrl }) => {
                  return false;
            },
      },
      {
            path: "/stats",
            element: <AwaitStatsPage></AwaitStatsPage>,
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
]);

function App() {
      return (
            <AuthProvider>
                  <RouterProvider router={router} />
            </AuthProvider>
      );
}

export default App;
