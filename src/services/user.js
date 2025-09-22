import api from "../configs/api";

const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const deletePost = (id) => api.delete(`post/delete/${id}`);

const getAllPosts = () => api.get("/");

export { getProfile, getPosts, deletePost, getAllPosts };
