import { useEffect, useState } from "react";
import { getAllOrderEmployees, getAllOrders } from "../../services/orderService";
import { Order } from "./Order";
import { OrderStatusTabs } from "../filters/OrderStatusTabs";
import { OrderSearchFilters } from "../filters/OrderSearchFilters";

export const OrderList = () => {
    
    const [allOrders, setAllOrders] = useState([]);
    const [allOrderEmployees, setAllOrderEmployees] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all"); 
    const [resetSignal, setResetSignal] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchOrderNum, setSearchOrderNum] = useState("");
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
    const [filterDateTime, setFilterDateTime] = useState("");
    
    // Fetch allOrders and allOrderEmployees 
    useEffect(() => {
        getAllOrders().then((ordersArray) => {
            setAllOrders(ordersArray);
        })

        getAllOrderEmployees().then((orderEmployeesArray) => {
            setAllOrderEmployees(orderEmployeesArray);
        })
    }, [])

    // Filters and sorts allOrders whenever inputs change
    useEffect(() => {
        let ordersToFilter = [...allOrders];

        // Status filter
        if (statusFilter === "open") {
            ordersToFilter = ordersToFilter.filter(order => order.dateTimeFulfilled === null);
        } else if (statusFilter === "fulfilled") {
            ordersToFilter = ordersToFilter.filter(order => order.dateTimeFulfilled !== null);
        }

        // Order # search
        if (searchOrderNum !== "") {
            const orderNum = parseInt(searchOrderNum)
            if (!isNaN(orderNum)) {
                ordersToFilter = ordersToFilter.filter(order => order.id === orderNum);
            }
        }

        // Server filter
        if (selectedEmployeeId !== 0) {
            const matchingOrderIds = allOrderEmployees
                .filter(oe => oe.employeeId === selectedEmployeeId && oe.role === "server")
                .map(oe => oe.orderId);
            ordersToFilter = ordersToFilter.filter(order => matchingOrderIds.includes(order.id));
        }

        // Date filter
        if (filterDateTime !== "") {
            const selectedDateStr = filterDateTime;
            ordersToFilter = ordersToFilter.filter(order => {
                const orderDateStr = new Date(order.dateTimePlaced).toLocaleDateString('en-CA');
                return orderDateStr === selectedDateStr;
            });
        }

        // Sort most recent first
        ordersToFilter.sort((a,b) => new Date(b.dateTimePlaced) - new Date(a.dateTimePlaced));
    
        setFilteredOrders(ordersToFilter);
    }, [
        allOrders, 
        statusFilter, 
        searchOrderNum, 
        selectedEmployeeId, 
        allOrderEmployees, 
        filterDateTime
    ])

    const handleEmployeeChange = (employeeId) => {
        setSelectedEmployeeId(employeeId);
    }

    const clearFilters = () => {
        setStatusFilter("all");
        setSearchOrderNum("");
        setSelectedEmployeeId(0);
        setFilterDateTime("");
        setResetSignal(prev => !prev); // toggles and triggers reset in child
    };

    return (
        <div className="flex flex-col px-4 py-8">
            <div className="font-sans w-full max-w-screen-2xl mx-auto space-y-10">    
            
                {/* Centered Header */}
                <div className="flex justify-center">
                    <div className="font-italianno text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
                        Shepherd's Pies 🇮🇹
                    </div>
                </div>

                {/* New Order Button */}
                <div className="flex justify-center">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200">
                        + New Order
                    </button>
                </div>
            
                {/* Page Title */}
                <h1 className="font-italianno text-center text-7xl">Orders</h1>

                {/* Status Filter */}
                <div className="flex justify-center">
                    <div className="p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
                        <OrderStatusTabs 
                            statusFilter={statusFilter} 
                            setStatusFilter={setStatusFilter} 
                        />
                    </div>
                </div>

                {/* Filter Fields */}
                <div className="flex justify-center">
                    <OrderSearchFilters
                        setSearchOrderNum={setSearchOrderNum}
                        onEmployeeChange={handleEmployeeChange}
                        selectedEmployeeId={selectedEmployeeId}
                        filterDateTime={filterDateTime}
                        setFilterDateTime={setFilterDateTime}
                        resetSignal={resetSignal}
                    />
                </div>

                {/* Clear Filters */}
                <div className="flex justify-center pt-4">
                    <button
                        className="p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow"
                        onClick={clearFilters}
                    >
                        <div className="bg-white rounded-lg px-6 py-2 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition">
                            Clear Filters
                        </div>
                    </button>
                </div>

                {/* Full-width Order Cards */}
                <div className="w-full space-y-6">
                    {filteredOrders.map((order) => (
                        <Order order={order} allOrderEmployees={allOrderEmployees} key={order.id} />
                    ))}
                </div>
            </div>
        </div>
      );
}