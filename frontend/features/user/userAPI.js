import axios from 'axios'

export const authUser = async(userCredentials)=>{
  const response = await axios.post('/api/user',userCredentials);
  console.log("response from login ",response)
  return response
}

export const registerUser = async(userCredentials)=>{
    const response = await axios.post('/api/user/register',userCredentials);
    return response;
}