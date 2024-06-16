import axios from 'axios'
// axios.defaults.baseURL = 'https://airbnbclone-1-5wb7.onrender.com/';
export const authUser = async(userCredentials)=>{
const response = await axios.post('/api/user',userCredentials);
  console.log("response from login ",response)
  return response
}

export const registerUser = async(userCredentials)=>{
    const response = await axios.post('/api/user/register',userCredentials);
    return response;
}