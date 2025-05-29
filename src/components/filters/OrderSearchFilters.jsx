import { useEffect, useState } from "react";
import { EmployeeDropdown } from "./EmployeeDropdown";

export const OrderSearchFilters = ({ 
    setSearchOrderNum, 
    onEmployeeChange, 
    selectedEmployeeId,
    setFilterDateTime,
    resetSignal
}) => {
    const [localOrderNum, setLocalOrderNum] = useState("");
    const [localDate, setLocalDate] = useState("");

    useEffect(() => {
        setLocalOrderNum("");
        setLocalDate("");
    }, [resetSignal]);

    const gradientWrapper = "p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow";
    const inputControl = "bg-white rounded-lg px-6 py-2 w-64 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none";

    return (
        <div className="flex space-x-4">

            {/* Order Number Input */}
            <div className={gradientWrapper}>
                <input
                    type="number"
                    min="0"
                    value={localOrderNum}
                    onChange={(e) => {
                        const value = e.target.value;
                        const parsedValue = parseInt(value);
                        setLocalOrderNum(value);
                        setSearchOrderNum(value === "" ? "" : Math.max(parsedValue, 0));
                    }}
                    placeholder="Search by Order #"
                    className={inputControl}
                />
            </div>

            {/* Employee Dropdown */}
            <EmployeeDropdown
                onEmployeeChange={onEmployeeChange}
                selectedEmployeeId={selectedEmployeeId}
            />

            {/* Date Input */}
            <div className={gradientWrapper}>
                <input
                    type="date"
                    value={localDate}
                    onChange={(e) => {
                        const value = e.target.value;
                        setLocalDate(value);
                        setFilterDateTime(value);
                    }}
                    className={inputControl}
                />
            </div>
        </div>
    );
};