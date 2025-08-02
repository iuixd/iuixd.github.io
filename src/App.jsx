import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./components/Home";
import { lazy, Suspense } from "react";
const About = lazy(() => import("./components/About"));
const VibeCodingApps = lazy(() => import("./components/VibeCodingApps"));
const GitHub = lazy(() => import("./components/GitHub"));
const Contact = lazy(() => import("./components/Contact"));
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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "vibe-coding-apps",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VibeCodingApps />
          </Suspense>
        ),
      },
      {
        path: "github",
        element: <GitHub />,
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
