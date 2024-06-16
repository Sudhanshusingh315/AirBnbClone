import axios from "axios";
// axios.defaults.baseURL = 'https://airbnbclone-1-5wb7.onrender.com/';
export const newPost = async ({ places, token }) => {
  const response = await axios.post("/api/post/newPost", places, {
    headers: {
        authorization: `Bearer ${token}`,
    },
  });
  return response;
};
