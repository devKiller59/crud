import axios from 'axios';

const deleteUser = async(_id) => {
  const URL = `${process.env.REACT_APP_API_URL}/api/users/${_id}/`;
  const req = await axios.delete(URL);
  return req
}

export default deleteUser;
