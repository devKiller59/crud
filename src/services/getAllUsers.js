import axios from 'axios';

const getAllUsers = async () =>{
  const URL = `https://dk59-crud-api.onrender.com/users`;
  const req = await axios.get(URL);
  return req.data
}

export default getAllUsers