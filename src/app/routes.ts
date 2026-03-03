import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { 
  ProtectedCartPage,
  ProtectedUserDashboard,
  ProtectedCreatorDashboard,
  ProtectedBecomeSellerPage
} from "./routes/ProtectedRoutes";

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
    Component: ProtectedCartPage,
  },
  {
    path: "/dashboard",
    Component: ProtectedUserDashboard,
  },
  {
    path: "/creator",
    Component: ProtectedCreatorDashboard,
  },
  {
    path: "/become-seller",
    Component: ProtectedBecomeSellerPage,
  },
  {
    path: "*",
    Component: Home, // Fallback to Home for now
  }
]);
