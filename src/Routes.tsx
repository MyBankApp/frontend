import { MAIN_ROUTE } from "./const/constants";
import MainPage from "./pages/MainPage/MainPage";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        component: <MainPage />
    }
]