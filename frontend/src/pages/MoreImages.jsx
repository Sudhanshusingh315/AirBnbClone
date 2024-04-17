import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export default function MoreImages() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    async function fetchForImages() {
      const { data } = await axios.get(`/api/post/places/?id=${id}`);
      setImages(data.photos);
    }
    fetchForImages();
  }, [id]);
  console.log(images);
  return (
    <div className="absolute w-full h-screen bg-black top-0 bottom-0">
      <div onClick={()=>{navigate(-1)}} className="text-white p-4 fixed top-8 left-8 hover:bg-white hover:text-black hover:rounded-full all ease-in-out duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {images?.map((photo) => {
        return (
          <>
            <div className="bg-black flex justify-center items-center ">
              <img
                src={photo}
                alt="/"
                className="w-[90%] object-cover my-2 rounded-lg md:w-[60%] min-h-full"
              />
            </div>
          </>
        );
      })}
    </div>
  );
}
