import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const VendorPage = () => {
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FORM STATE (UI-DRIVEN, BACKEND-MAPPED)
  const [formData, setFormData] = useState({
    vendorType: "",
    name: "",
    description: "",
    location: "",
    contact: "",
    images: [],

    // dynamic fields
    venueType: "",
    rooms: "",
    pricePerDay: "",

    style: "",
    experience: "",
    startingPrice: "",

    accessoryCategory: "",
    gender: "",
    priceRange: ""
  });

  /* =============================
     FETCH VENDOR PRODUCTS
  ============================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/vendor/products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setServices(data.products);
      } catch {
        console.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  /* =============================
     INPUT HANDLERS
  ============================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (i) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== i)
    }));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingService(null);
    setFormData({
      vendorType: "",
      name: "",
      description: "",
      location: "",
      contact: "",
      images: [],
      venueType: "",
      rooms: "",
      pricePerDay: "",
      style: "",
      experience: "",
      startingPrice: "",
      accessoryCategory: "",
      gender: "",
      priceRange: ""
    });
    setImagePreviews([]);
  };

  /* =============================
     SUBMIT → BACKEND CONTRACT
  ============================= */
  const handleSubmit = async (e) => {
   e.preventDefault();
  setLoading(true);

  const token = localStorage.getItem("token");

  if ( !token) {
    alert("Authentication not ready. Please wait.");
    setLoading(false);
    return;
  }

    try {
      // 🔥 Build dynamic details
      const details = { description: formData.description };

      if (formData.vendorType === "venue") {
        details.type = formData.venueType;
        details.rooms = Number(formData.rooms);
        details.pricePerDay = Number(formData.pricePerDay);
      }

      if (formData.vendorType === "decorator") {
        details.style = formData.style;
        details.experience = formData.experience;
        details.startingPrice = Number(formData.startingPrice);
      }

      if (formData.vendorType === "accessories") {
        details.category = formData.accessoryCategory;
        details.gender = formData.gender;
        details.priceRange = formData.priceRange;
      }

      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("vendorType", formData.vendorType);
      fd.append("location", formData.location);
      fd.append("contact", formData.contact);
      fd.append("details", JSON.stringify(details));
      formData.images.forEach((img) => fd.append("images", img));

      const token = localStorage.getItem("token");

      const res = await fetch(
        editingService
          ? `http://localhost:3000/api/vendor/update/${editingService._id}`
          : "http://localhost:3000/api/vendor/create",
        {
          method: editingService ? "PUT" : "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setServices((prev) =>
        editingService
          ? prev.map((p) => (p._id === data.product._id ? data.product : p))
          : [...prev, data.product]
      );

      resetForm();
    } catch (err) {
      alert(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  /* =============================
     EDIT
  ============================= */
  const handleEdit = (service) => {
    setEditingService(service);
    setShowAddForm(true);

    setFormData({
      vendorType: service.vendorType,
      name: service.name,
      description: service.details?.description || "",
      location: service.location,
      contact: service.contact,
      images: [],
      venueType: service.details?.type || "",
      rooms: service.details?.rooms || "",
      pricePerDay: service.details?.pricePerDay || "",
      style: service.details?.style || "",
      experience: service.details?.experience || "",
      startingPrice: service.details?.startingPrice || "",
      accessoryCategory: service.details?.category || "",
      gender: service.details?.gender || "",
      priceRange: service.details?.priceRange || ""
    });

    setImagePreviews(service.images || []);
  };

  /* =============================
     UI (ORIGINAL STYLE)
  ============================= */
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white p-6 rounded shadow mb-6 flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
            <p className="text-gray-600">Welcome, {user?.username}</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-pink-500 text-white px-6 py-2 rounded"
          >
            Add New Service
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 space-y-4">

            {/* COMMON */}
            <select name="vendorType" value={formData.vendorType} onChange={handleChange} required className="w-full border p-2 rounded">
              <option value="">Select Vendor Type</option>
              <option value="venue">Venue</option>
              <option value="decorator">Decorator</option>
              <option value="accessories">Accessories</option>
            </select>

            <input name="name" placeholder="Service Name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="w-full border p-2 rounded" required />

            {/* VENUE */}
            {formData.vendorType === "venue" && (
              <>
                <input name="venueType" placeholder="Venue Type (Hall/Villa)" value={formData.venueType} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="rooms" placeholder="Rooms" value={formData.rooms} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="pricePerDay" placeholder="Price Per Day" value={formData.pricePerDay} onChange={handleChange} className="w-full border p-2 rounded" />
              </>
            )}

            {/* DECORATOR */}
            {formData.vendorType === "decorator" && (
              <>
                <input name="style" placeholder="Decoration Style" value={formData.style} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="startingPrice" placeholder="Starting Price" value={formData.startingPrice} onChange={handleChange} className="w-full border p-2 rounded" />
              </>
            )}

            {/* ACCESSORIES */}
            {formData.vendorType === "accessories" && (
              <>
                <input name="accessoryCategory" placeholder="Accessory Category" value={formData.accessoryCategory} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded" />
                <input name="priceRange" placeholder="Price Range" value={formData.priceRange} onChange={handleChange} className="w-full border p-2 rounded" />
              </>
            )}

            {/* IMAGES */}
            <input type="file" multiple onChange={handleImageUpload} className="w-full" />

            <div className="flex gap-2 flex-wrap">
              {imagePreviews.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-20 h-20 rounded object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded">×</button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button type="button" onClick={resetForm} className="border px-4 py-2 rounded">Cancel</button>
              <button type="submit" disabled={loading} className="bg-pink-500 text-white px-6 py-2 rounded">
                {loading ? "Saving..." : editingService ? "Update" : "Create"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
