import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { User } from "../shared/interface.ts";
import { user } from "../assets/data.ts";

interface UserState {
  user?: User;
  edit: boolean;
}

const initialState: UserState = {
  user: JSON.parse(window?.localStorage.getItem("user")) || user,
  edit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: { payload: User }) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },

    updateProfile(state, action: { payload: boolean }) {
      state.edit = action.payload;
    },
  },
});

export default userSlice.reducer;

export const UserLogin = (user: User) => (dispatch: Dispatch) => {
  dispatch(userSlice.actions.login(user));
};

export const Logout = () => (dispatch: Dispatch) => {
  dispatch(userSlice.actions.logout());
};

// export const UpdateProfile = (val: User) => (dispatch: Dispatch) => {
//   dispatch(userSlice.actions.updateProfile(val));
// };

export function UpdateProfile(val: User) {
  return (dispatch: Dispatch, setState) => {
    dispatch(userSlice.actions.updateProfile(val));
  };
}
