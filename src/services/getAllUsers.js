import axios from 'axios';

const getAllUsers = async () =>{
  const URL = `${process.env.REACT_APP_API_URL}/api/users`;
  const req = await axios.get(URL);
  return req.data
}

export default getAllUsers
