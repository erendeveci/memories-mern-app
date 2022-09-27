import axios from "axios";

const API = axios.create({
  baseURL: "https://memory-app-api-backend.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  // now backend know user logged in

  return req;
});

export const fetchPosts = async () => await API.get("/posts");
export const createPosts = async (newPost) => await API.post("/posts", newPost);
export const updatePost = async (id, updatedPost) =>
  await API.put(`/posts/${id}`, updatedPost);
export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const likePost = async (id) => await API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
