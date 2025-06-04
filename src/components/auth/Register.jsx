import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEmployee, getEmployeeByEmail } from "../../services/userService"

export const Register = () => {
  const [employee, setEmployee] = useState({
    name: "",
    hireDate: "",
    email: "",
  });

  const navigate = useNavigate()

  const registerNewUser = () => {
    createEmployee(employee).then((createdUser) => {
      if (Object.prototype.hasOwnProperty.call(createdUser, "id")) {
        localStorage.setItem(
          "shepherds_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );
        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getEmployeeByEmail(employee.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  }

  const updateEmployee = (evt) => {
    const copy = { ...employee };
    copy[evt.target.id] = evt.target.value;
    setEmployee(copy);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-red-300 p-4">
    <form 
      className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 border-4 border-green-600"
      onSubmit={handleRegister}
    >
      <div className="text-center">
        <h1 className="font-italianno text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
          Shepherd's Pies 🇮🇹
        </h1>
        <h2 className="text-xl font-serif text-red-700 mt-2">Please Register</h2>
      </div>

      {/* Name Field */}
      <fieldset>
        <input
          onChange={updateEmployee}
          type="text"
          id="name"
          className="w-full px-4 py-2 border rounded-xl text-lg font-serif focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter your name"
          required
          autoFocus
        />
      </fieldset>

      {/* Hire Date Field */}
      <fieldset>
      <label htmlFor="hireDate" className="block text-center text-sm font-medium text-gray-700 mb-1">
        Hire Date
      </label>
        <input
          onChange={updateEmployee}
          type="date"
          id="hireDate"
          className="w-full px-4 py-2 border rounded-xl text-lg font-serif focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </fieldset>

      {/* Email Field */}
      <fieldset>
        <input
          onChange={updateEmployee}
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-xl text-lg font-serif focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email address"
          required
        />
      </fieldset>

      {/* Register Button */}
      <fieldset>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-green-600 via-white to-red-600 text-black font-serif text-lg rounded-xl shadow hover:shadow-lg active:translate-y-[2px] transition duration-200"
        >
          Register
        </button>
      </fieldset>
    </form>
  </main>
  )
}
