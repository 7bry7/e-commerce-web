import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { AuthPage } from "./pages/AuthPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LibraryPage } from "./pages/LibraryPage";
import { CartPage } from "./pages/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "product/:id", Component: ProductPage },
      { path: "cart", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "library", Component: LibraryPage },
    ],
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
]);
