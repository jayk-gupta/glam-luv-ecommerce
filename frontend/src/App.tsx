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
import VerifyOTP from "./pages/VerifyOTP";
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
        path: "/products/:category/:subCategory",
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
        path: "/verify-otp",
        element: <VerifyOTP />,
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
      dispatch(setCredentials({ email: data.email }));
    }
  }, [isSuccess, data, dispatch]);
  return (
    <div className="w-full bg-[#FAFAFA]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
