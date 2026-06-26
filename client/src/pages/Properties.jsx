import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Properties() {
    const navigate = useNavigate()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filterType, setFilterType] = useState("")
    const [filterBeds, setFilterBeds] = useState("")

    useEffect(() => {
        axios.get("http://localhost:5000/api/properties")
            .then(res => {
                setProperties(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    const getImageUrl = (property) => {
        if (property.images?.main) return property.images.main
        if (property.images) {
            const first = Object.values(property.images)[0]
            if (first) return first
        }
        return ""
    }

    const handleClick = (id) => {
        const token = localStorage.getItem("token")
        if (!token) navigate("/signup")
        else navigate(`/property/${id}`)
    }

    const filtered = properties.filter(p => {
        const matchSearch = !search ||
            p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.location?.toLowerCase().includes(search.toLowerCase())
        const matchType = !filterType || p.type === filterType
        const matchBeds = !filterBeds || p.beds >= parseInt(filterBeds)
        return matchSearch && matchType && matchBeds
    })

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

            <div className="max-w-7xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-[#131313] mb-6">🏡 All Properties</h2>

                {/* filters */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search city or area..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]"
                    />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]"
                    >
                        <option value="">All Types</option>
                        <option>House for Sale</option>
                        <option>Apartment for Sale</option>
                        <option>Apartment for Rent</option>
                        <option>Plot for Sale</option>
                    </select>
                    <select
                        value={filterBeds}
                        onChange={(e) => setFilterBeds(e.target.value)}
                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]"
                    >
                        <option value="">Any Beds</option>
                        <option value="1">1+ Beds</option>
                        <option value="2">2+ Beds</option>
                        <option value="3">3+ Beds</option>
                        <option value="4">4+ Beds</option>
                    </select>
                </div>

                {loading ? (
                    <p className="text-center text-gray-400 py-16">Loading properties...</p>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-gray-400 py-16">No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(property => (
                            <div key={property._id} onClick={() => handleClick(property._id)}
                                className="property-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group">
                                <img src={getImageUrl(property)} alt={property.title} className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
                                <div className="p-5">
                                    <h4 className="text-lg font-bold text-[#131313]">{property.title}</h4>
                                    <p className="text-gray-500 text-sm mt-1">📍 {property.location}</p>
                                    <p className="text-[#004274] font-bold text-xl mt-2">{property.price}</p>
                                    <div className="flex gap-4 text-gray-500 text-sm mt-3">
                                        {property.beds > 0 && <span>🛏 {property.beds}</span>}
                                        {property.baths > 0 && <span>🚿 {property.baths}</span>}
                                        <span>📐 {property.area}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <footer className="bg-[#1a1a2e] text-gray-400 text-center py-5 text-sm">
                <p className="text-white/60">© 2026 RealEstate PK — Built by Kaneez Fatima</p>
            </footer>
        </div>
    )
}

export default Properties
