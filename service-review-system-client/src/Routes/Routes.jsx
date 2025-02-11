import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AddServicePage from "../Pages/AddServicePage/AddServicePage";
import MyServicePage from "../Pages/MyServicePage/MyServicePage";
import MyReviewPage from "../Pages/MyReviewPage/MyReviewPage";
import AllServicePage from "../Pages/AllServicePage/AllServicePage";
import ServiceDetailsPage from "../Pages/ServiceDetailsPage/ServiceDetailsPage";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DynamicTittle from "../Components/DynamicTittle/DynamicTittle";
import ContactPage from "../Pages/ContactPage/ContactPage";

const router = createBrowserRouter([
    {
      path: "/",
      element:
      <>
      <DynamicTittle></DynamicTittle>
      <Root></Root>
      </>,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <HomePage></HomePage>,
        },
        {
          path: "/all-services",
          element:<AllServicePage></AllServicePage>,
        },
        {
          path: "/contact",
          element:<ContactPage></ContactPage>,
        },
        {
          path: "/add-service",
          element: <PrivateRoute>
          <AddServicePage></AddServicePage>
          </PrivateRoute>,
        },
        {
          path: "/service-details/:id",
          element: <ServiceDetailsPage></ServiceDetailsPage>,
        },
        {
          path: "/my-services",
          element: <PrivateRoute>
          <MyServicePage></MyServicePage>
          </PrivateRoute>,
        },
        {
          path: "/my-reviews",
          element:<PrivateRoute>
          <MyReviewPage></MyReviewPage>
          </PrivateRoute> ,
        },
        {
          path: "/login",
          element:<LoginPage></LoginPage>,
      },
      {
          path: "/register",
          element:<RegisterPage></RegisterPage>,
      }
      ],
    },
  ]);

export default router;