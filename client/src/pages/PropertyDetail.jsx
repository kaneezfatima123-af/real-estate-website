import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function PropertyDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [sending, setSending] = useState(false)

    useEffect(() => {
        axios.get(`https://real-estate-website-alpha-three.vercel.app/api/properties/${id}`)
            .then(res => {
                setProperty(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setProperty(null)
                setLoading(false)
            })
    }, [id])

    const handleSubmit = async () => {
        if (!name || !phone || !message) {
            alert("Please fill all fields!")
            return
        }

        setSending(true)
        try {
            await axios.post("https://real-estate-website-alpha-three.vercel.app/api/contact", {
                name,
                phone,
                message: `Property: ${property.title}\n\n${message}`,
                propertyId: id
            })
            alert("Message sent! Agent will contact you soon.")
            setName("")
            setPhone("")
            setMessage("")
        } catch (err) {
            alert("Could not send message, please try again")
        }
        setSending(false)
    }

    const shareWhatsApp = () => {
        const text = `Check out: ${property.title} - ${property.price} at ${property.location}. More details: ${window.location.href}`
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank")
    }

    if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>
    if (!property) return <div className="text-center py-20 text-gray-500">Property not found</div>

    const images = property.images || {}

    return (
        <div className="min-h-screen bg-[#F6F9FC]">

            <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="bg-[#F6F9FC] hover:bg-[#e8edf2] text-[#004274] font-medium px-5 py-2 rounded-full transition-all hover:scale-105 shadow-sm border border-gray-200">
                        Back
                    </button>
                    <h1 className="text-xl font-bold text-[#004274]">🏠 RealEstate PK</h1>
                </div>
                <button onClick={shareWhatsApp} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition">
                    📲 WhatsApp
                </button>
            </nav>

            <div className="max-w-5xl mx-auto px-4 py-8">

        
            <img src={images.main || Object.values(images)[0] || ""} alt={property.title} className="w-full h-72 object-contain bg-[#F6F9FC] rounded-xl shadow-md mb-6" />
                

                <h3 className="text-xl font-bold text-[#131313] mb-4">📸 Property Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {images.bedroom && (
                        <div className="relative">
                            <img src={images.bedroom} alt="Bedroom" className="w-full h-40 object-cover rounded-lg shadow" />
                            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">🛏 Bedroom</span>
                        </div>
                    )}
                    {images.bathroom && (
                        <div className="relative">
                            <img src={images.bathroom} alt="Bathroom" className="w-full h-40 object-cover rounded-lg shadow" />
                            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">🚿 Bathroom</span>
                        </div>
                    )}
                    {images.kitchen && (
                        <div className="relative">
                            <img src={images.kitchen} alt="Kitchen" className="w-full h-40 object-cover rounded-lg shadow" />
                            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">🍳 Kitchen</span>
                        </div>
                    )}
                    {images.living && (
                        <div className="relative">
                            <img src={images.living} alt="Living" className="w-full h-40 object-cover rounded-lg shadow" />
                            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">🛋️ Living</span>
                        </div>
                    )}
                    {images.lawn && (
                        <div className="relative">
                            <img src={images.lawn} alt="Lawn" className="w-full h-40 object-cover rounded-lg shadow" />
                            <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">🌿 Lawn</span>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <span className="inline-block bg-[#0073e1]/10 text-[#0073e1] text-xs px-3 py-1 rounded-full">{property.type}</span>
                    <h2 className="text-3xl font-bold text-[#131313] mt-3">{property.title}</h2>
                    <p className="text-gray-500 mt-1">📍 {property.location}</p>
                    <p className="text-[#004274] font-bold text-3xl mt-3">{property.price}</p>
                    <div className="flex gap-6 mt-4 text-gray-600">
                        {property.beds > 0 && <span>🛏 {property.beds} Bedrooms</span>}
                        {property.baths > 0 && <span>🚿 {property.baths} Bathrooms</span>}
                        <span>📐 {property.area}</span>
                    </div>
                    <hr className="my-6" />
                    <h3 className="text-xl font-bold text-[#131313] mb-3">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                    <hr className="my-6" />

                    <div className="bg-[#F6F9FC] rounded-xl p-6">
                        <h3 className="text-xl font-bold text-[#131313] mb-4">📞 Contact Agent</h3>
                        <p className="text-gray-600 mb-2">🧑 Agent: Kaneez Fatima</p>
                        <p className="text-gray-600 mb-2">📱 Phone: +92 300 1234567</p>
                        <p className="text-gray-600 mb-4">📧 Email: kaneezfatima78@gmail.com</p>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition"
                        />
                        <input
                            type="tel"
                            placeholder="Your Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition"
                        />
                        <textarea
                            placeholder="Your Message..."
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 mb-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={sending}
                            className="w-full bg-[#004274] hover:bg-[#00335a] text-white py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] shadow-md disabled:opacity-50"
                        >
                            {sending ? "Sending..." : "📩 Send Message"}
                        </button>
                    </div>
                </div>
            </div>

            <footer className="bg-[#004274] text-gray-300 text-center py-5 text-sm border-t border-[#00335a] mt-10">
                <p className="text-white/80">© 2026 RealEstate PK — Built by Kaneez Fatima</p>
            </footer>
        </div>
    )
}

export default PropertyDetail
