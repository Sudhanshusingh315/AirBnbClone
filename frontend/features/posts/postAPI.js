import axios from "axios";
export const newPost = async ({ places, token }) => {
  const response = await axios.post("/api/post/newPost", places, {
    headers: {
        authorization: `Bearer ${token}`,
    },
  });
  return response;
};
