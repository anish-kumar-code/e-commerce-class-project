import AddressModel from "../../models/addressModel.js";



// =============================
// ADD NEW ADDRESS
// =============================
export const addNewAddress = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            name,
            receiverName,
            receiverMobileNo,
            addressLine1,
            addressLine2,
            landmark,
            city,
            pincode,
            tag,
            isDefault
        } = req.body;

        if (!receiverName || !receiverMobileNo || !addressLine1 || !city || !pincode) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        // if this address default then make all old false
        if (isDefault === true) {
            await AddressModel.updateMany(
                { userId },
                { $set: { isDefault: false } }
            );
        }

        const newAddress = await AddressModel.create({
            userId,
            name,
            receiverName,
            receiverMobileNo,
            addressLine1,
            addressLine2,
            landmark,
            city,
            pincode,
            tag,
            isDefault
        });

        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            address: newAddress
        });

    } catch (error) {
        console.log("Add Address Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =============================
// GET ALL MY ADDRESSES
// =============================
export const getMyAddresses = async (req, res) => {
    try {
        const userId = req.user._id;

        const addresses = await AddressModel.find({ userId }).sort({ isDefault: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalAddress: addresses.length,
            addresses
        });

    } catch (error) {
        console.log("Get Addresses Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =============================
// GET SINGLE ADDRESS
// =============================
export const getSingleAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.params;

        const address = await AddressModel.findOne({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            address
        });

    } catch (error) {
        console.log("Get Single Address Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =============================
// UPDATE ADDRESS
// =============================
export const updateAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.params;

        const {
            name,
            receiverName,
            receiverMobileNo,
            addressLine1,
            addressLine2,
            landmark,
            city,
            pincode,
            tag,
            isDefault
        } = req.body;

        const address = await AddressModel.findOne({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        if (isDefault === true) {
            await AddressModel.updateMany(
                { userId },
                { $set: { isDefault: false } }
            );
        }

        address.name = name || address.name;
        address.receiverName = receiverName || address.receiverName;
        address.receiverMobileNo = receiverMobileNo || address.receiverMobileNo;
        address.addressLine1 = addressLine1 || address.addressLine1;
        address.addressLine2 = addressLine2 || address.addressLine2;
        address.landmark = landmark || address.landmark;
        address.city = city || address.city;
        address.pincode = pincode || address.pincode;
        address.tag = tag || address.tag;
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

        await address.save();

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address
        });

    } catch (error) {
        console.log("Update Address Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =============================
// DELETE ADDRESS
// =============================
export const deleteAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.params;

        const address = await AddressModel.findOneAndDelete({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });

    } catch (error) {
        console.log("Delete Address Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// =============================
// MAKE DEFAULT ADDRESS
// =============================
export const makeDefaultAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addressId } = req.params;

        const address = await AddressModel.findOne({ _id: addressId, userId });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        await AddressModel.updateMany(
            { userId },
            { $set: { isDefault: false } }
        );

        address.isDefault = true;
        await address.save();

        return res.status(200).json({
            success: true,
            message: "Default address updated",
            address
        });

    } catch (error) {
        console.log("Default Address Error", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};