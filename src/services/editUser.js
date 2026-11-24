import axios from 'axios';

const editUser = async(userObj) => {
  const URL = `${process.env.REACT_APP_API_URL}/api/users/${userObj._id}/`;
  const req = await axios.put(URL, userObj);
  return req.data
}

export default editUser;
