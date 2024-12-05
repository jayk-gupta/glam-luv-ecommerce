import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import UserAccountPage from "./pages/UserAccountPage";

import Layout from "./Layout/Layout";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ContactUs from "./pages/ContactUs";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/account",
        element: <UserAccountPage />,
      }, {
        path: "/products",
        element : <ProductsPage/>
      }
      , {
        path: "/login",
        element : <LoginPage/>
      }
      , {
        path: "/signup",
        element : <SignUpPage/>
      }
      , {
        path: "/contact",
        element : <ContactUs/>
      }
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
