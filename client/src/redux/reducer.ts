import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./userSlice.ts";
import themeSlice from "./themeSlice.ts";
import postSlice from "./postSlice.ts";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postSlice,
  theme: themeSlice,
});

export { rootReducer };
