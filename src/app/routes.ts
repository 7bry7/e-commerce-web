import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import UserDashboard from "./pages/UserDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/product/:id",
    Component: ProductDetailsPage,
  },
  {
    path: "/cart",
    Component: CartPage,
  },
  {
    path: "/dashboard",
    Component: UserDashboard,
  },
  {
    path: "/creator",
    Component: CreatorDashboard,
  },
  {
    path: "*",
    Component: Home, // Fallback to Home for now
  }
]);
