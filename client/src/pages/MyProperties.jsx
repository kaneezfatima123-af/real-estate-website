import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function MyProperties() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user") || "null")
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }

        axios.get("https://real-estate-website-alpha-three.vercel.app/api/properties/my", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setProperties(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [navigate])

    const getImageUrl = (property) => {
        if (property.images?.main) return property.images.main
        if (property.images) {
            const first = Object.values(property.images)[0]
            if (first) return first
        }
        return ""
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return

        const token = localStorage.getItem("token")
        try {
            await axios.delete(`https://real-estate-website-alpha-three.vercel.app/api/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setProperties(properties.filter(p => p._id !== id))
            alert("Property deleted")
        } catch (err) {
            alert(err.response?.data?.message || "Could not delete property")
        }
    }

    if (loading) {
        return <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center text-gray-500">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-[#F6F9FC]">

            <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-[#004274] cursor-pointer hover:text-[#0073e1] transition" onClick={() => navigate("/")}>
                    🏠 RealEstate PK
                </h1>
                <button onClick={() => navigate("/")} className="bg-[#004274] hover:bg-[#00335a] text-white px-4 py-2 rounded-md text-sm transition-all hover:scale-105">
                    Back to Home
                </button>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-[#004274] mb-2">📋 My Properties</h2>
                <p className="text-gray-500 mb-8">Hi {user?.name}, here are your listed properties.</p>

                {properties.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-400 text-lg mb-4">No properties added yet</p>
                        <button onClick={() => navigate("/add-property")} className="bg-[#004274] hover:bg-[#00335a] text-white px-6 py-2 rounded-md transition-all hover:scale-105">
                            + Add Property
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map(property => (
                            <div key={property._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                <img src={getImageUrl(property)} alt={property.title} className="w-full h-48 object-cover" />
                                <div className="p-5">
                                    <h4 className="text-lg font-bold text-[#131313]">{property.title}</h4>
                                    <p className="text-gray-500 text-sm mt-1">📍 {property.location}</p>
                                    <p className="text-[#004274] font-bold text-xl mt-2">{property.price}</p>
                                    {property.isFeatured && (
                                        <span className="inline-block mt-2 bg-[#0073e1] text-white text-xs px-2 py-1 rounded-full">⭐ Featured</span>
                                    )}
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => navigate(`/property/${property._id}`)}
                                            className="flex-1 bg-[#004274] hover:bg-[#00335a] text-white py-2 rounded-md text-sm transition"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(property._id)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <footer className="bg-[#1a1a2e] text-gray-400 text-center py-5 text-sm mt-10">
                <p className="text-white/60">© 2026 RealEstate PK — Built by Kaneez Fatima</p>
            </footer>
        </div>
    )
}

export default MyProperties
