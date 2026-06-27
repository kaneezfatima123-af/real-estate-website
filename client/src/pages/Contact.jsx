import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Contact() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !message) {
            alert("Name, email and message are required")
            return
        }

        setLoading(true)
        try {
            await axios.post("https://real-estate-website-alpha-three.vercel.app/api/contact", { name, email, phone, message })
            alert("Message sent! We will contact you soon.")
            setName("")
            setEmail("")
            setPhone("")
            setMessage("")
        } catch (err) {
            alert("Something went wrong, please try again")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#F6F9FC]">

            <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-[#004274] cursor-pointer hover:text-[#0073e1] transition" onClick={() => navigate("/")}>
                    🏠 RealEstate PK
                </h1>
                <button onClick={() => navigate("/")} className="bg-[#004274] hover:bg-[#00335a] text-white px-4 py-2 rounded-md text-sm transition-all hover:scale-105">
                    Back
                </button>
            </nav>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-[#004274] text-center mb-2">📞 Contact Us</h2>
                <p className="text-gray-500 text-center mb-10">Koi sawal ho to humein message karo</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* contact info */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
                            <span className="text-3xl">📱</span>
                            <div>
                                <p className="text-xs text-gray-400">Phone</p>
                                <p className="font-semibold text-[#131313]">+92 300 1234567</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
                            <span className="text-3xl">✉️</span>
                            <div>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="font-semibold text-[#131313]">kaneezfatima78@gmail.com</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
                            <span className="text-3xl">📍</span>
                            <div>
                                <p className="text-xs text-gray-400">Address</p>
                                <p className="font-semibold text-[#131313]">Lahore, Pakistan</p>
                            </div>
                        </div>
                    </div>

                    {/* contact form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
                        <input
                            type="text"
                            placeholder="Your Name *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]"
                        />
                        <input
                            type="email"
                            placeholder="Your Email *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]"
                        />
                        <textarea
                            placeholder="Your Message *"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#004274] hover:bg-[#00335a] text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "📩 Send Message"}
                        </button>
                    </form>
                </div>
            </div>

            <footer className="bg-[#1a1a2e] text-gray-400 text-center py-5 text-sm">
                <p className="text-white/60">© 2026 RealEstate PK — Built by Kaneez Fatima</p>
            </footer>
        </div>
    )
}

export default Contact
