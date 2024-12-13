import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

interface ThemeState {
  theme: "light" | "dark";
}

const initialState: ThemeState = {
  theme: JSON.parse(window?.localStorage.getItem("theme")) || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export default themeSlice.reducer;

export const setTheme = (value: "light" | "dark") => (dispatch: Dispatch) => {
  dispatch(themeSlice.actions.setTheme(value));
};
