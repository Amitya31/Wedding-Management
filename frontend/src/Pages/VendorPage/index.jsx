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
        console.log('Fetching vendor products...');
        const token = localStorage.getItem("token");
        console.log('Token exists:', !!token);
        
        const res = await fetch("http://localhost:3000/api/vendor/products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('Response data:', data);
        
        if (res.ok) {
          console.log('Setting services:', data.products);
          setServices(data.products);
        } else {
          console.error('Failed to fetch products:', data.message);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
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
      
      // Handle image upload properly
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((img, index) => {
          fd.append(`images`, img);
        });
      }

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
     DELETE SERVICE
  ============================= */
  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/vendor/delete/${serviceId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await res.json();
      if (res.ok) {
        setServices(services.filter(s => s._id !== serviceId));
        alert('Service deleted successfully');
      } else {
        alert(data.message || 'Failed to delete service');
      }
    } catch (error) {
      alert('Failed to delete service');
      console.error(error);
    }
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

        {/* SERVICES DISPLAY */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Services</h2>
          
          {console.log('Current services state:', services)}
          {console.log('Services length:', services.length)}
          {services.length === 0 ? (
            <div className="bg-white p-8 rounded shadow text-center">
              <p className="text-gray-500">No services added yet. Click "Add New Service" to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                console.log('Service:', service);
                console.log('Service images:', service.images);
                return (
                <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Service Images */}
                  <div className="aspect-square bg-gray-200">
                    {service.images && service.images.length > 0 ? (
                      <>
                        {console.log('Rendering image:', service.images[0])}
                        <img 
                          src={service.images[0]} 
                          alt={service.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.log('Image failed to load:', service.images[0]);
                            e.target.style.display = 'none';
                          }}
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Service Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                      <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full capitalize">
                        {service.vendorType}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                    
                    <div className="space-y-1 text-sm text-gray-500">
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {service.location}
                      </p>
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {service.contact}
                      </p>
                    </div>

                    {/* Dynamic Details Display */}
                    {service.details && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        {service.vendorType === 'venue' && (
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Type:</span> {service.details.venueType}</p>
                            <p><span className="font-medium">Rooms:</span> {service.details.rooms}</p>
                            <p><span className="font-medium">Price/Day:</span> ${service.details.pricePerDay}</p>
                          </div>
                        )}
                        {service.vendorType === 'decorator' && (
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Style:</span> {service.details.style}</p>
                            <p><span className="font-medium">Experience:</span> {service.details.experience}</p>
                            <p><span className="font-medium">Starting Price:</span> ${service.details.startingPrice}</p>
                          </div>
                        )}
                        {service.vendorType === 'accessories' && (
                          <div className="text-sm space-y-1">
                            <p><span className="font-medium">Category:</span> {service.details.category}</p>
                            <p><span className="font-medium">Gender:</span> {service.details.gender}</p>
                            <p><span className="font-medium">Price Range:</span> {service.details.priceRange}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
