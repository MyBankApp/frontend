import { Route, Routes } from "react-router-dom"
import { publicRoutes } from "../Routes"
import type { JSX } from "react"
import type { RouteType } from "../types/RouteType"


const AppRouter = () => {

    return (
        <Routes>
            {publicRoutes.map(
                ({ path, component }: RouteType): JSX.Element => (
                    <Route key={path} path={path} element={component} />
                )
            )}
        </Routes>
    )
}

export default AppRouter