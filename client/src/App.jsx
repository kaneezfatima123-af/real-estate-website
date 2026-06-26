import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import PropertyDetail from "./pages/PropertyDetail"
import AddProperty from "./pages/AddProperty"
import About from "./pages/About"
import Contact from "./pages/Contact"
import MyProperties from "./pages/MyProperties"
import Properties from "./pages/Properties"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-properties" element={<MyProperties />} />
                <Route path="/properties" element={<Properties />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
