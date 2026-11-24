import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"; // Opcional: para mantener tus alertas bonitas
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

export const { setUserList, setEditUserId } = userSlice.actions;
export default userSlice.reducer;

export const fetchAllUsers = () => (dispatch) => {
  return getAllUsers()
    .then(res => {
      dispatch(setUserList(res));
    })
    .catch(err => {
      console.log(err);
    });
}

export const editUserById = (userObj) => (dispatch) => {
  return editUser(userObj)
    .then(res => {
      toast.success('¡Usuario editado con éxito! ✏️');
      dispatch(fetchAllUsers());
    })
    .catch(err => {
      console.log(err);
    });
}

export const deleteUserById = (_id) => (dispatch) => {
  return deleteUser(_id)
    .then(res => {
      toast.success('Usuario eliminado correctamente 🗑️');
      dispatch(fetchAllUsers());
    })
    .catch(err => {
      console.log(err);
    });
}

export const createUser = (data) => (dispatch) => {
  return createNewUser(data)
    .then(res => {
      toast.success('¡Usuario creado con éxito! 🎉');
    })
    .catch(err => {
      if (err.response?.status === 500) {
        toast.warning('Usuario guardado, sincronizando lista...');
      } else {
        const mensajeError = err.response?.data?.message || 'Error al registrar usuario';
        toast.error(mensajeError);
      }
    })
    .finally(() => {
      dispatch(fetchAllUsers());
    });
}
