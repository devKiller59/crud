import axios from 'axios';

const editUser = async(userObj) => {
  const URL = `https://dk59-crud-api.onrender.com/users/${userObj.id}/`;
  const req = await axios.put(URL, userObj);
  return req.data
}

export default editUser;