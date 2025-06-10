import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Order = ({ order, allOrderEmployees }) => {
    const [server, setServer] = useState("");

    // Filter through allOrderEmployees to find the server for the order
    useEffect(()=> {
        const orderEmployees = allOrderEmployees.filter(oE => oE.orderId === order.id)
        const serverEmployee = orderEmployees.find(emp => emp.role === "server");
        setServer(serverEmployee ? serverEmployee.employee.name : "");
    }, [order, allOrderEmployees])

    return (
        <div className="p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow-md w-full mx-auto">
            <section className="bg-white p-6 rounded-[10px] w-full">
                <div className="flex flex-wrap md:flex-nowrap items-center justify-between text-gray-700 gap-4">
                    <h2 className="text-2xl font-bold">
                        <Link to={`/orders/${order.id}`} className="hover:text-blue-600">
                            Order # {order.id}
                        </Link> 
                    </h2>
                    <p className="text-lg">{server}</p>

                    <p className="text-sm text-gray-500 whitespace-nowrap">
                        {new Date(order.dateTimePlaced).toLocaleString()}
                    </p>
                </div>
            </section>
        </div>
    );
}