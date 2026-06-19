import axios from 'axios';

const deleteUser = async(_id) => {
  const URL = `https://dk59-crud-api.onrender.com/users/${_id}/`;
  const req = await axios.delete(URL);
  return req
}

export default deleteUser;