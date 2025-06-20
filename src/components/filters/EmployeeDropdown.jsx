export const EmployeeDropdown = ({ employees, onEmployeeChange, selectedEmployeeId }) => {
  
    const handleChange = (e) => {
        const employeeId = parseInt(e.target.value);
        onEmployeeChange(employeeId);
    };

    return (
        <>
            <select
                className="bg-white rounded-lg px-6 py-2.5 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition focus:outline-none"
                onChange={handleChange}
                value={selectedEmployeeId}
            >
                <option value={0}>All Employees</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                        {employee?.name}
                    </option>
                ))}
            </select>
        </>
    );
};