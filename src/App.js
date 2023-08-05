import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

const router = createBrowserRouter([
      {
            path: "/home",
            element: <HomePage></HomePage>,
      },
]);
function App() {
      return <RouterProvider router={router} />;
}

export default App;
