import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Home() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [filterType, setFilterType] = useState("")
    const [filterBeds, setFilterBeds] = useState("")
    const [loading, setLoading] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem("user") || "null")
    const [userProperties, setUserProperties] = useState([])
    const propertiesRef = useRef(null)

    useEffect(() => {
        axios.get("https://real-estate-website-alpha-three.vercel.app/api/properties")
            .then(res => {
                setUserProperties(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("visible")
            })
        }, { threshold: 0.2 })

        document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [userProperties, search, filterType, filterBeds])

    const handlePropertyClick = (id) => {
        const token = localStorage.getItem("token")
        if (!token) navigate("/signup")
        else navigate(`/property/${id}`)
    }

    const handleAddProperty = () => {
        const token = localStorage.getItem("token")
        if (!token) navigate("/signup")
        else navigate("/add-property")
    }

    const scrollToProperties = () => {
        setMenuOpen(false)
        propertiesRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const getImageUrl = (property) => {
        if (property.image) return property.image
        if (property.images?.main) return property.images.main
        if (property.images) {
            const firstImage = Object.values(property.images)[0]
            if (firstImage) return firstImage
        }
        return ""
    }

    const shareWhatsApp = (e, property) => {
        e.stopPropagation()
        const text = `Check out this property: ${property.title} - ${property.price} at ${property.location}`
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`
        window.open(url, "_blank")
    }

    const filteredProperties = userProperties.filter(p => {
        const matchSearch = !search ||
            p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.location?.toLowerCase().includes(search.toLowerCase()) ||
            p.type?.toLowerCase().includes(search.toLowerCase())
        const matchType = !filterType || p.type === filterType
        const matchBeds = !filterBeds || p.beds >= parseInt(filterBeds)
        return matchSearch && matchType && matchBeds
    })

    const featuredProperties = filteredProperties.filter(p => p.isFeatured === true)
    const normalProperties = filteredProperties.filter(p => p.isFeatured !== true)

    return (
        <div className="min-h-screen bg-[#F6F9FC]">

            {/* navbar */}
            <nav className="navbar-animate bg-white shadow-sm px-4 md:px-8 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-[#004274] cursor-pointer hover:text-[#0073e1] transition" onClick={() => navigate("/")}>
                    🏠 RealEstate PK
                </h1>

                {/* mobile menu button */}
                <button className="md:hidden text-2xl text-[#004274]" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? "✕" : "☰"}
                </button>

                <div className="hidden md:flex gap-6 text-gray-600 font-medium">
                    <span onClick={() => navigate("/")} className="nav-link active text-[#004274] font-semibold">Home</span>
                    <span onClick={scrollToProperties} className="nav-link hover:text-[#0073e1]">Properties</span>
                    <span onClick={() => navigate("/about")} className="nav-link hover:text-[#0073e1]">About</span>
                    <span onClick={() => navigate("/contact")} className="nav-link hover:text-[#0073e1]">Contact</span>
                </div>

                <div className="hidden md:flex gap-3 items-center flex-wrap">
                    {user ? (
                        <>
                            <span className="text-[#131313] font-semibold text-sm">👤 {user.name}</span>
                            <button onClick={() => navigate("/my-properties")} className="text-[#0073e1] font-semibold text-sm hover:text-[#004274] transition">
                                My Properties
                            </button>
                            <button onClick={handleAddProperty} className="btn-shine bg-[#004274] hover:bg-[#00335a] text-white px-4 py-2 rounded-md text-sm font-medium shadow-md">
                                + Add Property
                            </button>
                            <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.reload(); }}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all hover:scale-105 shadow-md">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/login")} className="text-[#0073e1] font-semibold hover:text-[#004274] transition">Login</button>
                            <button onClick={() => navigate("/signup")} className="bg-[#004274] hover:bg-[#00335a] text-white px-4 py-2 rounded-md text-sm font-medium transition-all hover:scale-105 shadow-md">Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            {/* mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3 shadow-md">
                    <p onClick={() => { navigate("/"); setMenuOpen(false) }} className="text-[#004274] font-semibold cursor-pointer">Home</p>
                    <p onClick={scrollToProperties} className="text-gray-600 cursor-pointer">Properties</p>
                    <p onClick={() => { navigate("/about"); setMenuOpen(false) }} className="text-gray-600 cursor-pointer">About</p>
                    <p onClick={() => { navigate("/contact"); setMenuOpen(false) }} className="text-gray-600 cursor-pointer">Contact</p>
                    {user ? (
                        <>
                            <p onClick={() => { navigate("/my-properties"); setMenuOpen(false) }} className="text-[#0073e1] cursor-pointer">My Properties</p>
                            <button onClick={handleAddProperty} className="w-full bg-[#004274] text-white py-2 rounded-md">+ Add Property</button>
                            <button onClick={() => { localStorage.clear(); window.location.reload() }} className="w-full bg-gray-600 text-white py-2 rounded-md">Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/login")} className="w-full text-[#0073e1] py-2">Login</button>
                            <button onClick={() => navigate("/signup")} className="w-full bg-[#004274] text-white py-2 rounded-md">Sign Up</button>
                        </>
                    )}
                </div>
            )}

            {/* hero */}
            <div className="relative text-white py-24 px-4 overflow-hidden">
                <div className="hero-zoom absolute inset-0" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#004274]/85 via-[#004274]/70 to-[#0073e1]/30"></div>
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                        <span className="hero-word" style={{ animationDelay: "0.2s" }}>Own</span>{" "}
                        <span className="hero-word" style={{ animationDelay: "0.45s" }}>Your</span>{" "}
                        <span className="hero-word text-[#E8B86D]" style={{ animationDelay: "0.7s" }}>Space</span>
                    </h2>
                    <p className="hero-subtitle text-lg md:text-xl opacity-90 mb-10">Find your dream property from thousands of listings</p>
                    <div className="hero-search bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 max-w-3xl mx-auto border border-white/20">
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Search by city, area or type..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-lg text-[#131313] bg-[#F6F9FC] focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition"
                            />
                            <button onClick={scrollToProperties} className="btn-shine bg-[#004274] hover:bg-[#00335a] text-white px-8 py-3 rounded-lg font-medium shadow-md">
                                🔍 Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* featured */}
            {featuredProperties.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h3 className="scroll-reveal text-2xl font-bold text-[#131313] mb-6">⭐ Featured Properties</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProperties.map((property) => (
                            <div key={property._id} onClick={() => handlePropertyClick(property._id)}
                                className="scroll-reveal scroll-reveal-stagger property-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group">
                                <div className="relative overflow-hidden">
                                    <img src={getImageUrl(property)} alt={property.title} className="w-full h-52 object-contain bg-[#F6F9FC]" />
                                    <span className="featured-badge absolute top-3 right-3 text-xs px-3 py-1 rounded-full shadow-md">⭐ Featured</span>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-lg font-bold text-[#131313]">{property.title}</h4>
                                    <p className="text-gray-500 text-sm mt-1">📍 {property.location}</p>
                                    <p className="text-[#004274] font-bold text-xl mt-2">{property.price}</p>
                                    <div className="flex gap-4 text-gray-500 text-sm mt-3 pt-3 border-t border-gray-100">
                                        {property.beds > 0 && <span>🛏 {property.beds} Beds</span>}
                                        {property.baths > 0 && <span>🚿 {property.baths} Baths</span>}
                                        <span>📐 {property.area}</span>
                                    </div>
                                    <button onClick={(e) => shareWhatsApp(e, property)} className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-md transition">
                                        📲 Share on WhatsApp
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* all properties */}
            <div ref={propertiesRef} className="max-w-7xl mx-auto px-4 py-12">
                <h3 className="scroll-reveal text-2xl font-bold text-[#131313] mb-6">
                    {search ? `🔍 Results for "${search}"` : "🏡 All Properties"}
                </h3>

                {/* filters */}
                <div className="scroll-reveal bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]">
                        <option value="">All Types</option>
                        <option>House for Sale</option>
                        <option>Apartment for Sale</option>
                        <option>Apartment for Rent</option>
                        <option>Plot for Sale</option>
                        <option>Farm House for Sale</option>
                        <option>Commercial for Sale</option>
                    </select>
                    <select value={filterBeds} onChange={(e) => setFilterBeds(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0073e1] bg-[#F6F9FC]">
                        <option value="">Any Beds</option>
                        <option value="1">1+ Beds</option>
                        <option value="2">2+ Beds</option>
                        <option value="3">3+ Beds</option>
                        <option value="4">4+ Beds</option>
                        <option value="5">5+ Beds</option>
                    </select>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                                <div className="w-full h-52 bg-gray-200"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-400 text-lg">No properties found</p>
                        <button onClick={handleAddProperty} className="mt-4 bg-[#004274] hover:bg-[#00335a] text-white px-6 py-2 rounded-md transition-all hover:scale-105">
                            + Add Your Property
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {normalProperties.map((property) => (
                            <div key={property._id} onClick={() => handlePropertyClick(property._id)}
                                className="scroll-reveal scroll-reveal-stagger property-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group">
                                <div className="relative overflow-hidden">
                                    <img src={getImageUrl(property)} alt={property.title} className="w-full h-52 object-cover" />
                                    <span className="absolute top-3 left-3 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">{property.type}</span>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-lg font-bold text-[#131313]">{property.title}</h4>
                                    <p className="text-gray-500 text-sm mt-1">📍 {property.location}</p>
                                    <p className="text-[#004274] font-bold text-xl mt-2">{property.price}</p>
                                    <div className="flex gap-4 text-gray-500 text-sm mt-3 pt-3 border-t border-gray-100">
                                        {property.beds > 0 && <span>🛏 {property.beds} Beds</span>}
                                        {property.baths > 0 && <span>🚿 {property.baths} Baths</span>}
                                        <span>📐 {property.area}</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#131313] font-medium py-2 rounded-md transition text-sm">
                                            View Details →
                                        </button>
                                        <button onClick={(e) => shareWhatsApp(e, property)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm transition" title="Share on WhatsApp">
                                            📲
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* sell section */}
            <div className="cta-section text-white text-center py-14 px-4 relative">
                <div className="relative z-10">
                    <h2 className="scroll-reveal text-2xl md:text-3xl font-bold mb-3">Want to Sell Your Property?</h2>
                    <p className="scroll-reveal text-md opacity-90 mb-6">List your property for free and reach thousands of buyers!</p>
                    <button onClick={handleAddProperty} className="scroll-reveal btn-shine bg-[#0073e1] hover:bg-[#005bb5] text-white font-bold px-8 py-3 rounded-lg shadow-lg">
                        + Add Your Property
                    </button>
                </div>
            </div>

            <footer className="bg-[#1a1a2e] text-gray-400 text-center py-5 text-sm">
                <p className="text-white/60">© 2026 RealEstate PK — Built by Kaneez Fatima</p>
            </footer>

            <style>{`
                .navbar-animate { animation: slideDown 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .hero-zoom { animation: zoomBg 20s ease-in-out infinite alternate; }
                @keyframes zoomBg {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                .hero-word {
                    display: inline-block;
                    opacity: 0;
                    animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .hero-subtitle { opacity: 0; animation: fadeUp 0.8s ease 0.9s forwards; }
                .hero-search { opacity: 0; animation: fadeUp 0.8s ease 1.1s forwards; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .scroll-reveal {
                    opacity: 0;
                    transform: translateY(35px);
                    transition: opacity 0.7s ease, transform 0.7s ease;
                }
                .scroll-reveal.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    )
}

export default Home
