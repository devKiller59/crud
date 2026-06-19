import { useEffect, useState } from 'react';
import './assets/styles/App.css';
import UserForm from './components/UserForm';
import UserCard from './components/UserCard';
import { createUser, deleteUserById, fetchAllUsers } from "./redux/crudSlice";
import { useSelector, useDispatch } from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGithub, FaHeart } from 'react-icons/fa';

function App() {

  const [newUser, setNewUser] = useState({});
  const [deleteId, setDeleteId] = useState('');
  const [editDefValues, setEditDefValues] = useState({});
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();
  const { list } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  useEffect(() => {
    if (newUser.first_name) {
      dispatch(createUser(newUser))
    }
  }, [newUser, dispatch])

  useEffect(() => {
    if (deleteId) {
      dispatch(deleteUserById(deleteId))
    }
  }, [deleteId, dispatch]);

  const handlerOnCreateUser = (event) => {
    setNewUser(event);
    toast.success('¡Usuario creado con éxito! 🎉');
  };

  const handlerOnDelete = (id) => {
    setDeleteId(id)
    toast.error('Usuario eliminado correctamente 🗑️');
  };

  const handlerOnEdit = (userObj) => {
    setEditDefValues(userObj)
    setIsEdited(true);
  };

  // Limpia el estado del usuario seleccionado para editar
  const handlerClearDefValues = () => {
    setEditDefValues(null);
  }

  const userList = list.map((user) => <UserCard userObj={user} onDelete={handlerOnDelete} onEdit={handlerOnEdit} key={user.id} />);

  return (
    <div className="App">
      <ToastContainer position='top-right' autoClose={3000} theme='colored' />
      <div className='userform'>
        <UserForm 
        onCreate={handlerOnCreateUser} 
        onEdit={handlerOnEdit} 
        defValues={editDefValues} 
        isEdited={isEdited} 
        setIsEdited={setIsEdited} 
        clearDefValues={handlerClearDefValues}
        />
      </div>
      <div className='userlist'>
        {userList}
      </div>
      <footer className="app-footer">
        <p>Hecho con <FaHeart style={{ color: '#e74c3c' }} /> por <strong>DevKiller59</strong> &copy; 2026</p>
        <div className="footer-links">
          <a href="https://github.com/devkiller59" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
        </div>
      </footer>
    </div>
  )
};

export default App;