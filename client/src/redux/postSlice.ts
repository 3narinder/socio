import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "./store";
import { Dispatch } from "redux";
import { Post } from "../shared/interface";

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export default postSlice.reducer;

export const SetPost = (post: Post[]) => {
  return (dispatch: Dispatch) => {
    dispatch(postSlice.actions.getPosts(post));
  };
};
