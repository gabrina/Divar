import api from "../configs/api";

const addCategory = async (data) => await api.post("category", data);

const getCategory = async () => await api.get("category");

const deleteCategory = async (id) => await api.delete(`category/${id}`);

export { addCategory, getCategory, deleteCategory };
