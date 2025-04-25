import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CartPage from "../pages/CartPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import AdminDashboard from "../pages/Admin/AdminDashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <h1>Error page</h1>,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Register />,
            },
            {
                path: "payment/success",
                element: <PaymentSuccess />,
            },
        ],
    },
    {
        path: "/admin",
        element: <UserLayout />,
        children: [
            {
                path: "login",
                element: <Login role="admin" />
            },{
                path: "dashboard",
                element: <AdminDashboard />
            }
        ],
    },
]);
