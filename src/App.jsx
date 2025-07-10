import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import DesignLab from "./components/DesignLab";
import GitHub from "./components/GitHub";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar"; 

// Define layout with navbar
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // Default page at /srikumar
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "design-lab",
        element: <DesignLab />,
      },
      {
        path: "github",
        element: <GitHub />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
