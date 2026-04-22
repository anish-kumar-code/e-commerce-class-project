import { useState } from "react";

const UserAddressPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            city: "Lucknow",
            pincode: "226010",
            landmark: "Near Metro Station",
            house: "H-12",
            address: "Gomti Nagar",
            name: "Anish Kumar",
            mobile: "9876543210",
            label: "Home",
        },
    ]);

    const [form, setForm] = useState({
        city: "",
        pincode: "",
        landmark: "",
        house: "",
        address: "",
        name: "",
        mobile: "",
        label: "Home",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 📍 Get Location
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;

            console.log("Lat:", latitude, "Lng:", longitude);

            // Demo fill (real me API use karna)
            setForm((prev) => ({
                ...prev,
                city: "Detected City",
                address: `Lat: ${latitude}, Lng: ${longitude}`,
            }));
        });
    };

    // ➕ Add / Update
    const handleSave = () => {
        if (editId) {
            setAddresses((prev) =>
                prev.map((item) =>
                    item.id === editId ? { ...form, id: editId } : item
                )
            );
            setEditId(null);
        } else {
            setAddresses([...addresses, { ...form, id: Date.now() }]);
        }

        setForm({
            city: "",
            pincode: "",
            landmark: "",
            house: "",
            address: "",
            name: "",
            mobile: "",
            label: "Home",
        });

        setShowForm(false);
    };

    // ✏️ Edit
    const handleEdit = (addr) => {
        setForm(addr);
        setEditId(addr.id);
        setShowForm(true);
    };

    // ❌ Delete
    const handleDelete = (id) => {
        setAddresses((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div>

            <h2 className="text-xl font-semibold mb-6">My Addresses</h2>

            {/* Address List */}
            <div className="space-y-4">

                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="bg-gray-50 p-4 rounded-xl border"
                    >
                        <p className="font-semibold">
                            {addr.label} - {addr.city} ({addr.pincode})
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                            {addr.house}, {addr.address}, {addr.landmark}
                        </p>

                        {(addr.name || addr.mobile) && (
                            <p className="text-sm text-gray-500 mt-1">
                                {addr.name} • {addr.mobile}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 mt-3">
                            <button
                                onClick={() => handleEdit(addr)}
                                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(addr.id)}
                                className="text-sm px-3 py-1 border text-red-500 rounded hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}

            </div>

            {/* Add Button */}
            <button
                onClick={() => {
                    setShowForm(!showForm);
                    setEditId(null);
                }}
                className="mt-6 bg-black text-white px-6 py-2 rounded-lg"
            >
                {showForm ? "Cancel" : "Add Address"}
            </button>

            {/* FORM */}
            {showForm && (
                <div className="mt-6 bg-gray-50 p-6 rounded-2xl space-y-4">

                    <h3 className="font-semibold">
                        {editId ? "Edit Address" : "Add New Address"}
                    </h3>

                    {/* Detect Location */}
                    <button
                        onClick={handleGetLocation}
                        className="text-sm border px-3 py-1 rounded"
                    >
                        Detect My Location 📍
                    </button>

                    <div className="grid md:grid-cols-2 gap-4">

                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded-lg" />
                        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border p-2 rounded-lg" />
                        <input name="house" value={form.house} onChange={handleChange} placeholder="House No" className="border p-2 rounded-lg" />
                        <input name="landmark" value={form.landmark} onChange={handleChange} placeholder="Landmark" className="border p-2 rounded-lg" />

                        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded-lg md:col-span-2" />

                        <input name="name" value={form.name} onChange={handleChange} placeholder="Receiver Name" className="border p-2 rounded-lg" />
                        <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile No" className="border p-2 rounded-lg" />

                    </div>

                    {/* Label */}
                    <div className="flex gap-3 flex-wrap">
                        {["Home", "Office", "Work", "Friends"].map((label) => (
                            <button
                                key={label}
                                onClick={() => setForm({ ...form, label })}
                                className={`px-4 py-1 rounded-full border text-sm ${form.label === label
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Save */}
                    <button
                        onClick={handleSave}
                        className="bg-black text-white px-6 py-2 rounded-lg"
                    >
                        {editId ? "Update Address" : "Save Address"}
                    </button>

                </div>
            )}

        </div>
    );
};

export default UserAddressPage;