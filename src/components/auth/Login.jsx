import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getEmployeeByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("giuseppe.shepherd@shepherdspies.com")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getEmployeeByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "shepherds_user",
          JSON.stringify({
            id: user.id,
          })
        )
        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-white to-red-300 p-4">
        <form 
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 border-4 border-green-600" 
          onSubmit={handleLogin}
        >
          <div className="text-center">
            <h1 className="font-italianno text-6xl text-red-700 bg-gradient-to-r from-green-500 via-white to-red-500 font-bold p-10 text-center shadow-xl rounded-xl border-4 border-white">
              Shepherd's Pies 🇮🇹
            </h1>
            <h2 className="text-xl font-serif text-red-700 mt-2">Please sign in</h2>
          </div>
          
          {/* Email Field */}
          <fieldset>
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="w-full px-4 py-2 border rounded-xl text-lg font-serif focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Email address"
                required
                autoFocus
              />
          </fieldset>
          
          {/* Sign in Button */}
          <fieldset>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-green-600 via-white to-red-600 text-black font-serif text-lg rounded-xl shadow hover:shadow-lg active:translate-y-[2px] transition duration-200" type="submit">
                Sign in
              </button>
          </fieldset>
          
          {/* Register Link */}
          <div className="text-center">
            <Link 
              to="/register" 
              className="text-sm font-serif text-red-700 hover:underline"
            >
              Not a member yet?
            </Link>
          </div>
        </form>
    </main>
  )
}
