import Axios from "../../utils/axios";


// ==============================
// GET ALL CATEGORY
// ==============================
export const getAllCategoryAPI = async (page = 1, limit = 10, search = "") => {
    // const response = await Axios.get(`/api/admin/category/all?page=${page}&limit=${limit}&search=${search}`);
    const response = await Axios.get(`/api/admin/category/all`);
    return response.data;
};


// ==============================
// GET SINGLE CATEGORY
// ==============================
export const getSingleCategoryAPI = async (id) => {
    const response = await Axios.get(`/api/admin/category/${id}`);
    return response.data;
};


// ==============================
// ADD CATEGORY
// ==============================
export const addCategoryAPI = async (formData) => {
    const response = await Axios.post(`/api/admin/category/add`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};


// ==============================
// UPDATE CATEGORY
// ==============================
export const updateCategoryAPI = async (id, formData) => {
    const response = await Axios.patch(`/api/admin/category/update/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
};


// ==============================
// DELETE CATEGORY
// ==============================
export const deleteCategoryAPI = async (id) => {
    const response = await Axios.delete(`/api/admin/category/delete/${id}`);
    return response.data;
};


// ==============================
// CHANGE CATEGORY STATUS
// ==============================
export const changeCategoryStatusAPI = async (id) => {
    const response = await Axios.patch(`/api/admin/category/status/${id}`);
    return response.data;
};