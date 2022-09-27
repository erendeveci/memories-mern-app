import * as api from "../api/index";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  try {
    const { data } = await api.fetchPosts();

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addPost = createAsyncThunk("addPost", async (postData) => {
  try {
    console.log(postData);
    const { data } = await api.createPosts(postData);
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export const update = createAsyncThunk("updatePost", async (data) => {
  const dataForUpdate = data;
  try {
    const { currentId } = dataForUpdate;
    const { updatedData } = dataForUpdate;

    const { data } = await api.updatePost(currentId, updatedData);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk("deleletePost", async (id) => {
  try {
    const { data } = await api.deletePost(id);

    return data;
  } catch (error) {
    console.log(error.message);
  }
});

export const likePost = createAsyncThunk("likePost", async (id) => {
  try {
    const { data } = await api.likePost(id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    //increment , decrement est.
  },
  extraReducers: {
    [fetchPosts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      if (payload !== null) {
        return {
          ...state,
          posts: payload,
        };
      }
    },
    [fetchPosts.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    [addPost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, { payload }) => {
      if (payload !== null) {
        //  state.posts.push({ ...payload });

        return {
          ...state,
          posts: [...state.posts, payload],
        };
      }
    },
    [addPost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [update.pending]: (state, { payload }) => {
      state.loadingUpdate = true;
    },
    [update.fulfilled]: (state, { payload }) => {
      if (payload !== null) {
        console.log(payload);
        const updatedPost = state.posts.map((post) =>
          post._id === payload._id ? payload : post
        );

        return {
          ...state,
          posts: updatedPost,
        };
      }
    },
    [update.rejected]: (state, { payload }) => {},

    [deletePost.pending]: (state, { payload }) => {},

    [deletePost.fulfilled]: (state, { payload }) => {
      if (payload !== null) {
        const deletedPost = state.posts.filter(
          (post) => post._id !== payload._id
        );
        return {
          ...state,
          posts: deletedPost,
        };
      }
    },
    [deletePost.rejected]: (state, { payload }) => {},
    [likePost.fulfilled]: (state, { payload }) => {
      if (payload !== null) {
        const updatedPost = state.posts.map((post) =>
          post._id === payload._id ? payload : post
        );

        return {
          ...state,
          posts: updatedPost,
        };
      }
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice;
