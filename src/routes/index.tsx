import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import RootPage from "../pages/RootPage";
import HomePage from "../pages/HomePage";



const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <RegistrationPage />
    },
    {
        path: '/',
        element: <RootPage />,
        children: [
            {
                path: '',
                element: <HomePage />
            }
        ]
    }
])

export default router;