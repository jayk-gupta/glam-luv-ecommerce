import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Product from "./components/Product/Product";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "./redux/user/authAPI";
import { useEffect } from "react";
import { setCredentials } from "./redux/user/authSlice";
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
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
]);
function App() {
  const { data, isSuccess } = useGetMeQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials(data));
    }
  });
  return (
    <div className="w-full">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
