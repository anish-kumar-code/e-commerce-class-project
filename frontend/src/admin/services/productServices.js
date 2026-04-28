import Axios from "../../utils/axios";



// ==============================
// GET ALL PRODUCTS
// ==============================
export const getAllProductsAPI = async (page = 1, limit = 10, search = "") => {
    // const response = await Axios.get(`/api/admin/product/all?page=${page}&limit=${limit}&search=${search}`);

    const response = await Axios.get(`/api/admin/product/all`);
    return response.data;
};


// ==============================
// GET SINGLE PRODUCT
// ==============================
export const getSingleProductAPI = async (id) => {
    const response = await Axios.get(`/admin/product/details/${id}`);
    return response.data;
};


// ==============================
// ADD PRODUCT
// ==============================
export const addProductAPI = async (formData) => {
    const response = await Axios.post(`/api/admin/product/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};


// ==============================
// UPDATE PRODUCT
// ==============================
export const updateProductAPI = async (id, formData) => {
    const response = await Axios.put(`/api/admin/product/update/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};


// ==============================
// DELETE PRODUCT
// ==============================
export const deleteProductAPI = async (id) => {
    const response = await Axios.delete(`/api/admin/product/delete/${id}`);
    return response.data;
};


// ==============================
// CHANGE PRODUCT STATUS
// ==============================
export const changeProductStatusAPI = async (id) => {
    const response = await Axios.patch(`/api/admin/product/status/${id}`);
    return response.data;
};