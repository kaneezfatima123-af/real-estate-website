import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://real-estate-website-alpha-three.vercel.app/api/auth/login", {
                email,
                password
            })
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data))
            navigate("/")
        } catch (err) {
            alert("Invalid email or password!")
        }
    }

    return (
        <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-[#004274] mb-6">Welcome Back</h2>
                <p className="text-center text-gray-500 text-sm mb-6">Login to your account</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
                        required
                    />
                    <button type="submit" className="w-full bg-[#004274] hover:bg-[#00335a] text-white py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] shadow-md">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account? <a href="/signup" className="text-[#0073e1] font-semibold hover:text-[#004274] transition">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default Login
