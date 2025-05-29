import { Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "../nav/NavBar"
import { OrderList } from "../orders/OrderList"


export const ApplicationViews = () => {


    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <Navbar />
                        <Outlet />
                    </>
                }
            >
                <Route index element={<OrderList />} />
            </Route>
        </Routes>
    )

}