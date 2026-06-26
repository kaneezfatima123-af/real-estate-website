import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"

function About() {
    const navigate = useNavigate()
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible")
                    }
                })
            },
            { threshold: 0.2 }
        )

        const elements = document.querySelectorAll(".scroll-reveal")
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <div className="min-h-screen bg-[#F6F9FC]">

            {/* ===== NAVBAR ===== */}
            <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-[#004274] cursor-pointer hover:text-[#0073e1] transition" onClick={() => navigate("/")}>
                    🏠 RealEstate PK
                </h1>
                <div className="hidden md:flex gap-6 text-gray-600 font-medium">
                    <span onClick={() => navigate("/")} className="hover:text-[#0073e1] cursor-pointer transition">Home</span>
                    <span onClick={() => navigate("/properties")} className="hover:text-[#0073e1] cursor-pointer transition">Properties</span>
                    <span className="text-[#004274] cursor-pointer font-semibold">About</span>
                    <span onClick={() => navigate("/contact")} className="hover:text-[#0073e1] cursor-pointer transition">Contact</span>
                </div>
                <div className="flex gap-3 items-center">
                    <button onClick={() => navigate(-1)} className="bg-[#004274] hover:bg-[#00335a] text-white px-4 py-2 rounded-md text-sm transition-all hover:scale-105">
                         Back
                    </button>
                </div>
            </nav>

            {/* ===== HERO ===== */}
            <div className="relative py-20 px-4 text-center" style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className="absolute inset-0 bg-[#004274]/80"></div>
                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        About <span className="text-[#0073e1]">RealEstate PK</span>
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Your trusted partner in finding the perfect property
                    </p>
                </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="max-w-6xl mx-auto px-4 py-16">

                {/* Section 1 */}
                <div className="scroll-reveal bg-white rounded-2xl shadow-md p-8 md:p-12 mb-10 transition-all duration-700">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#004274] mb-4">Who We Are</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        RealEstate PK is Pakistan's premier real estate platform, connecting buyers,
                        sellers, and renters with their dream properties. Founded with a vision to
                        simplify the property search process, we provide a seamless, transparent, and
                        trustworthy experience for all our users.
                    </p>
                </div>

                {/* Section 2 — Mission & Vision Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="scroll-reveal bg-white rounded-2xl shadow-md p-8 text-center transition-all duration-700" style={{ transitionDelay: "0.1s" }}>
                        <div className="text-5xl mb-4">🎯</div>
                        <h3 className="text-xl font-bold text-[#004274] mb-2">Our Mission</h3>
                        <p className="text-gray-600">
                            To make property buying, selling, and renting simple, fast, and accessible
                            for everyone across Pakistan.
                        </p>
                    </div>
                    <div className="scroll-reveal bg-white rounded-2xl shadow-md p-8 text-center transition-all duration-700" style={{ transitionDelay: "0.2s" }}>
                        <div className="text-5xl mb-4">👁️</div>
                        <h3 className="text-xl font-bold text-[#004274] mb-2">Our Vision</h3>
                        <p className="text-gray-600">
                            To become the most trusted and innovative real estate platform in Pakistan,
                            empowering communities and transforming the way people find homes.
                        </p>
                    </div>
                </div>

                {/* Section 3 — Why Choose Us */}
                <div className="scroll-reveal bg-[#004274] text-white rounded-2xl shadow-md p-8 md:p-12 text-center transition-all duration-700">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose Us</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                            <div className="text-4xl mb-2">🏠</div>
                            <h4 className="font-bold text-lg">Wide Listings</h4>
                            <p className="text-white/70 text-sm">Thousands of properties available</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-2">🔒</div>
                            <h4 className="font-bold text-lg">Trusted & Secure</h4>
                            <p className="text-white/70 text-sm">Verified listings and safe transactions</p>
                        </div>
                        <div>
                            <div className="text-4xl mb-2">⚡</div>
                            <h4 className="font-bold text-lg">Fast & Easy</h4>
                            <p className="text-white/70 text-sm">Simple search and quick results</p>
                        </div>
                    </div>
                </div>

                {/* Section 4 — Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    <div className="scroll-reveal bg-white rounded-xl shadow p-6 text-center transition-all duration-700" style={{ transitionDelay: "0.1s" }}>
                        <div className="text-3xl font-bold text-[#004274]">500+</div>
                        <div className="text-gray-500 text-sm">Properties</div>
                    </div>
                    <div className="scroll-reveal bg-white rounded-xl shadow p-6 text-center transition-all duration-700" style={{ transitionDelay: "0.2s" }}>
                        <div className="text-3xl font-bold text-[#004274]">200+</div>
                        <div className="text-gray-500 text-sm">Happy Clients</div>
                    </div>
                    <div className="scroll-reveal bg-white rounded-xl shadow p-6 text-center transition-all duration-700" style={{ transitionDelay: "0.3s" }}>
                        <div className="text-3xl font-bold text-[#004274]">50+</div>
                        <div className="text-gray-500 text-sm">Cities</div>
                    </div>
                    <div className="scroll-reveal bg-white rounded-xl shadow p-6 text-center transition-all duration-700" style={{ transitionDelay: "0.4s" }}>
                        <div className="text-3xl font-bold text-[#004274]">4.9⭐</div>
                        <div className="text-gray-500 text-sm">Rating</div>
                    </div>
                </div>

            </div>

            {/* ===== FOOTER ===== */}
            <footer className="bg-[#1a1a2e] text-gray-400 text-center py-5 text-sm">
                <p className="text-white/60">© 2026 RealEstate PK — Built by Kaneez Fatima</p>
            </footer>

            {/* ===== ANIMATIONS CSS ===== */}
            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .scroll-reveal {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.7s ease;
                }
                .scroll-reveal.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>

        </div>
    )
}

export default About