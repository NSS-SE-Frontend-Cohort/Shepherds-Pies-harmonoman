import { useEffect, useState } from "react";
import { createEmployee, getAllEmployees } from "../../services/employeeService";

export const Employees = () => {

    const [allEmployees, setAllEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [employeeHireDate, setEmployeeHireDate] = useState("");

    useEffect(() => {
        getAllEmployees().then((employeesArray) => {
            setAllEmployees(employeesArray);
        })
    },[])

    // Handle creating a new employee
    const handleNewEmployee = async (event) => {
        event.preventDefault();

        const newEmployeeObj = {
            name: employeeName,
            hireDate: employeeHireDate,
            email: employeeEmail
        }

        const savedEmployee = await createEmployee(newEmployeeObj).then(res => res.json())

        setAllEmployees(prev => [...prev, savedEmployee]);
        setEmployeeName("");
        setEmployeeEmail("");
        setEmployeeHireDate("");
    }

    const gradientWrapper = "p-[2px] bg-gradient-to-r from-green-500 via-white to-red-500 rounded-xl shadow";
    const inputControl = "w-full bg-white rounded-lg px-6 py-2 text-gray-800 font-semibold text-lg hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none";

    const isFormInvalid = !employeeName || !employeeEmail || !employeeHireDate.trim();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-red-300 p-4">
            <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto mt-10 space-y-4">

                {/* Header */}
                <div className="flex justify-center">
                    <div className="font-italianno italic text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
                        Shepherd's Pies 🇮🇹
                    </div>
                </div>

                <h1 className="font-italianno italic text-center text-6xl mt-15 mb-15">Employees</h1>
            
                {/* Employees List */}
                <div className="w-full flex flex-col items-center space-y-6">
                    {allEmployees.map(employee => (
                        <div 
                            key={employee.id}
                            className="text-xl font-serif text-center space-y-2">
                        <div className="font-bold">{employee.name}</div>
                        <div className="text-base text-gray-700">
                            <p>{employee.email}</p>
                            <p>{employee.hireDate}</p>
                        </div>
                    </div>))}
                </div>
                
                {/* New Employee */}
                <div className="flex justify-center font-serif italic text-2xl font-bold mt-25">
                    <span>Add New Employee</span> 
                </div>
                <form onSubmit={handleNewEmployee} className="space-y-4 w-full flex flex-col items-center px-4 py-6">
                    {/* Add Employee */}
                    <div className="space-y-4 w-full flex flex-col items-center px-4 py-6">
                        {/* Name Field */}
                        <div className="w-full max-w-md flex flex-col space-y-1">
                            <span>Employee Name</span>
                            <div className={gradientWrapper}>
                                <input
                                    value={employeeName}
                                    onChange={(event) => setEmployeeName(event.target.value)}
                                    type="text"
                                    placeholder="Enter Name"
                                    className="bg-white rounded-lg px-6 py-2 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="w-full max-w-md flex flex-col space-y-1">
                            <span>Email Address</span>
                            <div className={gradientWrapper}>
                                <input
                                    value={employeeEmail}
                                    onChange={(event) => setEmployeeEmail(event.target.value)}
                                    type="email"
                                    placeholder="Enter Email"
                                    className="bg-white rounded-lg px-6 py-2 w-full text-gray-800 font-semibold text-lg hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Hire Date Field */}
                        <div className="w-full max-w-md flex flex-col space-y-1">
                            <span>Hire Date</span>
                            <div className={gradientWrapper}>
                                <input
                                    value={employeeHireDate}
                                    onChange={(event) => setEmployeeHireDate(event.target.value)}
                                    type="date"
                                    placeholder="Enter Hire Date"
                                    className={inputControl}
                                    required
                                />
                            </div>
                        </div>

                        {/* Add Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                onClick={handleNewEmployee}
                                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 ${
                                    isFormInvalid ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-[2px]'
                                }`}    
                                disabled={isFormInvalid}
                            >
                            Add Employee
                            </button>
                        </div> 
                    </div> 
                </form>
            </section>
        </div>
    )
}