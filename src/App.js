import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage, homePageLoader } from "./pages/homePage/homePage";
import { StatsPage, statsPageLoader } from "./pages/statsPage/statsPage";
const router = createBrowserRouter([
      {
            path: "/",
            element: <HomePage></HomePage>,
            loader: homePageLoader,
      },
      {
            path: "/stats",
            element: <StatsPage></StatsPage>,
            loader: statsPageLoader,
      },
]);
function App() {
      return <RouterProvider router={router} />;
}

export default App;
