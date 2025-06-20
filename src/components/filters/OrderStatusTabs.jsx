export const OrderStatusTabs = ({ statusFilter, setStatusFilter }) => {
    
    return (
        <select 
            className="w-full bg-white rounded-lg px-6 py-2.5 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
        >
            <option value="all">All Orders</option>
            <option value="open">Open Orders</option>
            <option value="fulfilled">Fulfilled Orders</option>
        </select>
    );
}