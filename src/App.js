import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homePage/homePage";
const router = createBrowserRouter([
      {
            path: "/",
            element: <HomePage></HomePage>,
      },
]);
function App() {
      return <RouterProvider router={router} />;
}

export default App;
