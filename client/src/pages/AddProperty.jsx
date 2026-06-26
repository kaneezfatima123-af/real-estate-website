import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const ADMIN_EMAIL = "kaneezfatima15078@gmail.com"

function AddProperty() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [location, setLocation] = useState("")
  const [beds, setBeds] = useState("")
  const [baths, setBaths] = useState("")
  const [area, setArea] = useState("")
  const [type, setType] = useState("House for Sale")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [previews, setPreviews] = useState({})
  const [files, setFiles] = useState({})
  const [isFeatured, setIsFeatured] = useState(false)

  const CLOUD_NAME = "dngbbpx8p"
  const UPLOAD_PRESET = "realestate_upload"

  const compressAndUpload = async (file) => {
    const compressed = await compressImage(file)
    const formData = new FormData()
    formData.append("file", compressed)
    formData.append("upload_preset", UPLOAD_PRESET)
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      { timeout: 60000 }
    )
    return res.data.secure_url
  }

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const img = new Image()
        img.src = e.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          const maxSize = 1024
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          } else if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }))
          }, 'image/jpeg', 0.7)
        }
      }
    })
  }

  const handleImageChange = async (e, key) => {
    let file = e.target.files[0]
    if (file) {
      setFiles(prev => ({ ...prev, [key]: file }))
      setPreviews(prev => ({ ...prev, [key]: URL.createObjectURL(file) }))
    }
  }

  const handleSubmit = async () => {
    if (!title || !price || !location || !area || !description) {
      alert("Please fill all required fields!")
      return
    }
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login first!")
      navigate("/login")
      return
    }

    setLoading(true)
    try {
      const imageKeys = ['main', 'bedroom', 'bathroom', 'kitchen', 'living', 'lawn']
      const uploadedImages = {}
      
      for (const key of imageKeys) {
        if (files[key]) {
          uploadedImages[key] = await compressAndUpload(files[key])
        } else {
          uploadedImages[key] = ""
        }
      }

      await axios.post("http://localhost:5000/api/properties/add", {
        title, price, location, beds, baths, area, type, description,
        images: uploadedImages,
        isFeatured: isFeatured
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      alert("Property added successfully!")
      navigate("/")
    } catch (error) {
      console.error("Upload error:", error)
      alert("Something went wrong! Please try again.")
    }
    setLoading(false)
  }

  const ImageUpload = ({ label, keyName }) => (
    <div className="mb-4">
      <label className="block text-[#131313] font-semibold mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, keyName)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
      />
      {previews[keyName] && (
        <img src={previews[keyName]} alt="preview" className="mt-2 w-full h-40 object-cover rounded-lg" />
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F6F9FC]">

      {/* ===== NAVBAR ===== */}
      <nav className="bg-white shadow-sm px-4 md:px-8 py-4 flex flex-wrap justify-between items-center sticky top-0 z-50 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-[#004274] cursor-pointer hover:text-[#0073e1] transition" onClick={() => navigate("/")}>
          🏠 RealEstate PK
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-[#F6F9FC] hover:bg-gray-200 text-[#004274] font-medium px-4 py-2 rounded-full transition-all hover:scale-105 shadow-sm border border-gray-200"
        >
          Back 
        </button>
      </nav>

      {/* ===== FORM ===== */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-[#004274] mb-2">🏠 Add Your Property</h2>
          <p className="text-gray-500 text-sm mb-6">Fill in the details to list your property</p>

          <label className="block text-[#131313] font-semibold mb-1">Property Title *</label>
          <input
            type="text"
            placeholder="e.g. Beautiful House in DHA Lahore"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
          />

          <label className="block text-[#131313] font-semibold mb-1">Property Type *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC] text-[#131313]"
          >
            <option>House for Sale</option><option>Apartment for Sale</option><option>Apartment for Rent</option>
            <option>Plot for Sale</option><option>Farm House for Sale</option><option>Commercial for Sale</option>
          </select>

          <label className="block text-[#131313] font-semibold mb-1">Price *</label>
          <input
            type="text"
            placeholder="e.g. PKR 1.5 Crore"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
          />

          <label className="block text-[#131313] font-semibold mb-1">Location *</label>
          <input
            type="text"
            placeholder="e.g. DHA Phase 5, Lahore"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
          />

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-[#131313] font-semibold mb-1">Bedrooms</label>
              <input
                type="number"
                placeholder="3"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
              />
            </div>
            <div>
              <label className="block text-[#131313] font-semibold mb-1">Bathrooms</label>
              <input
                type="number"
                placeholder="2"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
              />
            </div>
            <div>
              <label className="block text-[#131313] font-semibold mb-1">Area *</label>
              <input
                type="text"
                placeholder="10 Marla"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
              />
            </div>
          </div>

          <label className="block text-[#131313] font-semibold mb-1">Description *</label>
          <textarea
            placeholder="Describe your property..."
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#0073e1] transition bg-[#F6F9FC]"
          />

          {user && user.email === ADMIN_EMAIL && (
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#004274] focus:ring-[#0073e1]"
                />
                <span className="text-[#131313]">Featured Property (shows on top)</span>
              </label>
            </div>
          )}

          <h3 className="text-xl font-bold text-[#004274] mb-4 mt-2">📸 Upload Photos</h3>
          <ImageUpload label="🏠 Main Photo *" keyName="main" />
          <ImageUpload label="🛏 Bedroom Photo" keyName="bedroom" />
          <ImageUpload label="🚿 Bathroom Photo" keyName="bathroom" />
          <ImageUpload label="🍳 Kitchen Photo" keyName="kitchen" />
          <ImageUpload label="🛋️ Living Room Photo" keyName="living" />
          <ImageUpload label="🌿 Lawn Photo" keyName="lawn" />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#004274] hover:bg-[#00335a] text-white py-4 rounded-lg text-lg font-semibold transition-all hover:scale-[1.02] shadow-md mt-4 disabled:opacity-50"
          >
            {loading ? "Uploading... Please wait..." : "🏠 Submit Property"}
          </button>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1a1a2e] text-gray-400 text-center py-5 text-sm mt-10">
        <p className="text-white/60">© 2026 RealEstate PK — Built by Kaneez Fatima</p>
      </footer>

    </div>
  )
}

export default AddProperty