import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function AllPlace() {
  const dispatch = useDispatch();
  const [posts,setPosts]= useState([]);
  useEffect(() => {
//    const response = axios.get("/api/post/") 
  }, []);
  return (
    <>
      <div>all new places will be here</div>
    </>
  );
}
