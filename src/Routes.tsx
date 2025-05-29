import { LOGIN_ROUTE, MAIN_ROUTE, REGISTER_ROUTE } from "./const/constants";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        component: <MainPage />
    },
    {
        path: LOGIN_ROUTE,
        component: <LoginPage />
    },
    {
        path: REGISTER_ROUTE,
        component: <RegisterPage />
    }
]