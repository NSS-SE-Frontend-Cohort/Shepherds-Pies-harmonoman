import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService";

export const EmployeeDropdown = ({ onEmployeeChange, selectedEmployeeId }) => {
    const [allEmployees, setAllEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees().then((employeeArray) => {
            setAllEmployees(employeeArray);
        });
    }, []);

    const handleChange = (e) => {
        const employeeId = parseInt(e.target.value);
        onEmployeeChange(employeeId);
    };

    return (
        <div className="p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow">
  <div className="bg-white rounded-lg w-64">
    <select
      className="bg-white rounded-lg px-6 py-2.5 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition focus:outline-none"
      onChange={handleChange}
      value={selectedEmployeeId}
    >
      <option value={0}>All Servers</option>
      {allEmployees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee?.name}
        </option>
      ))}
    </select>
  </div>
</div>
    );
};