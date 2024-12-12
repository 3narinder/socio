import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./userSlice.js";
import themeSlice from "./themeSlice.js";
import postSlice from "./postSlice.js";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postSlice,
  theme: themeSlice,
});

export { rootReducer };
