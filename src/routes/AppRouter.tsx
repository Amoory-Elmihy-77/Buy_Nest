import { lazy, Suspense } from "react";

const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Cart = lazy(() => import("@pages/Cart"));
const Categories = lazy(() => import("@pages/Categories"));
const Home = lazy(() => import("@pages/Home"));
const Login = lazy(() => import("@pages/Login"));
const Products = lazy(() => import("@pages/Products"));
const Register = lazy(() => import("@pages/Register"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Profile = lazy(() => import("@pages/Profile"));
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "@pages/Error";
import SuspenseFallback from "@components/feedback/SuspenseFallback/SuspenseFallback";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import ProtectedRoute from "@components/Auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>
            <LottieHandler type="loading" />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <SuspenseFallback>
            <Home />
          </SuspenseFallback>
        ),
      },
      {
        path: "categories",
        element: (
          <SuspenseFallback>
            <Categories />
          </SuspenseFallback>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <SuspenseFallback>
            <Products />
          </SuspenseFallback>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <SuspenseFallback>
            <AboutUs />
          </SuspenseFallback>
        ),
      },
      {
        path: "cart",
        element: (
          <SuspenseFallback>
            <Cart />
          </SuspenseFallback>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <SuspenseFallback>
              <Wishlist />
            </SuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseFallback>
            <Login />
          </SuspenseFallback>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseFallback>
            <Register />
          </SuspenseFallback>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <SuspenseFallback>
              <Profile />
            </SuspenseFallback>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
