import { useState } from "react";

const UserProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        mobile: "9876543210",
        photo: "https://i.pravatar.cc/150?img=3",
    });

    const [formData, setFormData] = useState(user);

    const [passwordData, setPasswordData] = useState({
        current: "",
        newPass: "",
        confirm: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save profile
    const handleSave = () => {
        setUser(formData);
        setIsEditing(false);
    };

    // Password change
    const handlePasswordSave = () => {
        if (passwordData.newPass !== passwordData.confirm) {
            alert("Passwords do not match");
            return;
        }
        alert("Password updated (demo)");
        setPasswordData({ current: "", newPass: "", confirm: "" });
        setShowPassword(false);
    };

    return (
        <div>

            <h2 className="text-xl font-semibold mb-6">My Profile</h2>

            {/* Profile Card */}
            <div className="bg-gray-50 p-6 rounded-2xl">

                <div className="flex items-center gap-6">

                    {/* Profile Image */}
                    <img
                        src={user.photo}
                        alt="profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1 space-y-2">

                        {isEditing ? (
                            <>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                                <input
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </>
                        ) : (
                            <>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                                <p className="text-gray-500 text-sm">{user.mobile}</p>
                            </>
                        )}

                    </div>

                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">

                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-black text-white px-6 py-2 rounded-lg"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="border px-6 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Edit Profile
                        </button>
                    )}

                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="border px-6 py-2 rounded-lg hover:bg-gray-100"
                    >
                        Change Password
                    </button>

                </div>

            </div>

            {/* PASSWORD SECTION */}
            {showPassword && (
                <div className="mt-6 bg-gray-50 p-6 rounded-2xl space-y-4">

                    <h3 className="font-semibold">Change Password</h3>

                    <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full border p-2 rounded-lg"
                        value={passwordData.current}
                        onChange={(e) =>
                            setPasswordData({ ...passwordData, current: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full border p-2 rounded-lg"
                        value={passwordData.newPass}
                        onChange={(e) =>
                            setPasswordData({ ...passwordData, newPass: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border p-2 rounded-lg"
                        value={passwordData.confirm}
                        onChange={(e) =>
                            setPasswordData({ ...passwordData, confirm: e.target.value })
                        }
                    />

                    <button
                        onClick={handlePasswordSave}
                        className="bg-black text-white px-6 py-2 rounded-lg"
                    >
                        Save Password
                    </button>

                </div>
            )}

        </div>
    );
};

export default UserProfilePage;