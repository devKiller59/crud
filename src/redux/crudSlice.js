import { createSlice } from "@reduxjs/toolkit";
import getAllUsers from "../services/getAllUsers";
import editUser from "../services/editUser";
import createNewUser from '../services/createNewUser';
import deleteUser from '../services/deleteUser';

export const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    isLoaded: false,
    editUserId: 0
  },

  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload
    },
    setEditUserId: (state, action) => {
      state.editUserId = action.payload
    }
  }
});

export const { setUserList, setEditUserById } = userSlice.actions;
export default userSlice.reducer;

export const fetchAllUsers = () => (dispatch) => {
  getAllUsers()
    .then(res => {
      dispatch(setUserList(res));
    })
    .catch(err => {
      console.log(err);
    })
}

export const editUserById = (userObj) => (dispatch) => {
  editUser(userObj)
    .then(res => {
      dispatch(fetchAllUsers());
    })
    .catch(err => {
      console.log(err);
    })
}

export const deleteUserById = (_id) => (dispatch) => {
  deleteUser(_id)
    .then(res => {
      dispatch(fetchAllUsers());
    })
    .catch(err => {
      console.log(err);
    })
}

export const createUser = (data) => (dispatch) => {
  createNewUser(data)
    .then(res => {
      dispatch(fetchAllUsers());
    })
    .catch(err => {
      console.log(err);
    })
}