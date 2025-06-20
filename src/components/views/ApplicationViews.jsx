import { Outlet, Route, Routes } from "react-router-dom"
import { Navbar } from "../nav/NavBar"
import { OrderList } from "../orders/OrderList"
import { OrderDetails } from "../orders/OrderDetails"
import { NewOrder } from "../forms/NewOrder"

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
                <Route path="orders/:orderId" element={<OrderDetails/>} />
                <Route path="newOrder" element={<NewOrder />} />
            </Route>
        </Routes>
    )
}