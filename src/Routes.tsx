import { DEPOSIT_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, OPENING_DEPOSIT_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, TRANSACTIONS_ROUTE, TRANSFER_ROUTE } from "./const/constants";
import DepositPage from "./pages/DepositPage/DepositPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import OpeningDepositPage from "./pages/OpeningDepositPage/OpeningDepositPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import TransferPage from "./pages/TransferPage/TransferPage";

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
    },
    {
        path: PROFILE_ROUTE,
        component: <ProfilePage />
    },
    {
        path: TRANSACTIONS_ROUTE,
        component: <TransactionsPage />
    },
    {
        path: TRANSFER_ROUTE,
        component: <TransferPage />
    },
    {
        path: DEPOSIT_ROUTE,
        component: <DepositPage />
    },
    {
        path: OPENING_DEPOSIT_ROUTE,
        component: <OpeningDepositPage />
    }
]