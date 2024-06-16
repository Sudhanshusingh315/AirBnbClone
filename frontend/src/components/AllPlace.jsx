import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function AllPlace() {
  
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let jwt = JSON.parse(localStorage.getItem("userInfo"));
    if(jwt){
      axios.get("/api/post/",{
        headers:{
          'Access-Control-Allow-Origin':"https://airbnbclone-1-5wb7.onrender.com",
          Authorization: jwt.token
        }
      }).then((res) => {
        console.log(res);
        const { allPosts } = res.data;
        console.log("these are all the posts ", allPosts);
        setPosts([...allPosts]);
      });
    }
  }, []);
  console.log("posts state", posts);
  const handleDelete = (e, id) => {
    e.preventDefault();
    console.log("deleting the post", id);
  };
  return (
    <>
      <div className="container my-8">
        {posts.map((item) => {
          return (
            <>
              <Link
                to={`/account/places/new/${item._id}`}
                key={item.title}
                className="bg-gray-100 flex gap-4 justify-center items-center py-4 my-4 rounded-lg cursor-pointer"
              >
                {/* images */}
                <div className="w-40 h-40 overflow-hidden shrink-0 rounded-lg ">
                  <img
                    src={item.photos[0]}
                    className="w-[100%] h-[100%] object-cover"
                    alt="/"
                  />
                </div>
                {/* title */}
                <div>
                  <h2 className="text-xl font-bold underline">{item.title}</h2>
                  <div>
                    <button
                      className="hover:bg-primary rounded-full px-1 py-1 hover:text-white"
                      onClick={(e) => {
                        handleDelete(e, item._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm">{item.description}</p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
}
