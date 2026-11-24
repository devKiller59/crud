import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { editUserById, fetchAllUsers } from "../redux/crudSlice";
import { useDispatch } from "react-redux";
import { FaUserAlt, FaBirthdayCake, FaLock, FaAt } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

const defaultValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  birthday: ""
};

const UserForm = ({ onCreate, defValues, onEdit, isEdited, setIsEdited, clearDefValues }) => {

  const { register, handleSubmit, reset } = useForm({ defaultValues });
  const dispatch = useDispatch();

  useEffect(() => {
    if (defValues && Object.keys(defValues).length > 0) {
      const valoresFormateados = {
        ...defValues,
        // Si el usuario antiguo no tiene username, lo dejamos vacío para que pueda crearlo
        username: defValues.username || "",
        password: "", // Dejamos el campo de contraseña vacío para que el usuario pueda ingresar una nueva contraseña
        birthday: defValues.birthday ? defValues.birthday.split('T')[0] : ""
        // Recortamos la fecha si viene en formato ISO
      };
      
      reset(valoresFormateados);
    } else {
      reset(defaultValues);
    }
  }, [defValues, reset]);

  const onSubmit = async (userObj) => {
    if (!!isEdited) {
      const payload = { ...userObj };

      if (!payload.password || payload.password.trim() === "") {
        delete payload.password; // Eliminamos la propiedad password si está vacía
      }
      await dispatch(editUserById(payload));
      setIsEdited(false);
      if (clearDefValues) clearDefValues();
      reset(defaultValues);
      dispatch(fetchAllUsers());
    } else {
      onCreate(userObj);
      reset(defaultValues);
    }
  };

  const handleCancel = () => {
    setIsEdited(false);
    if (clearDefValues) clearDefValues();
    reset(defaultValues);
  };

  return (
    <form className='user-form' onSubmit={handleSubmit(onSubmit)} >
      <div className='user-field name-group'>
        <label htmlFor='first_name'><p><FaUserAlt /></p></label>
        <div className='name-inputs'>
          <input autoComplete="off" id='first_name' placeholder='First Name' required {...register("first_name")} />
          <input autoComplete="off" id='last_name' placeholder='Last Name' required {...register("last_name")} />
        </div>
      </div>

      <div className='user-field'>
        <label htmlFor='username'><p><FaAt /></p></label>
        <input autoComplete="off" id='username' type="text" placeholder="Username" required {...register("username")} />
      </div>

      <div className='user-field'>
        <label htmlFor='email'><p><AiOutlineMail /></p></label>
        <input autoComplete="off" id='email' type='email' placeholder='E-mail' required {...register("email")} />
      </div>

      <div className='user-field'>
        <label htmlFor='password'><p><FaLock /></p></label>
        <input autoComplete="new-password" id='password' type='password' placeholder={isEdited ? 'New password (optional)' : 'Password'} required={!isEdited} {...register("password")} />
      </div>

      <div className='user-field'>
        <label htmlFor='birthday'><p><FaBirthdayCake /></p></label>
        <input autoComplete="off" id='birthday' type='date' required {...register("birthday")} />
      </div>

      <div className="submit">
        {isEdited && (<input id='cancel' type='button' value='Cancel' onClick={handleCancel} />)}
        <input id='submit' type="submit" value={isEdited ? "Upload" : "Sign Up"} />
      </div>
    </form>
  );
};

export default UserForm;
