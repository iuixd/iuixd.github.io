import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import VibeCodingApps from "./components/VibeCodingApps";
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

const router = createHashRouter([
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
        path: "vibe-coding-apps",
        element: <VibeCodingApps />,
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
