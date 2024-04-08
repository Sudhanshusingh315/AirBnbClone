import { useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { userRegister } from "../../features/user/userSlice";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setUserCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register user", userCredentials);
    dispatch(userRegister(userCredentials)).then(res=>{
      if(res.payload.token){
          navigate("/")
      }
    });
  };
  return (
    <>
      <div className="container  w-full h-80 flex justify-center items-center">
        <div>
          <div className="text-2xl font-semibold text-gray-700 w-full text-center">
            Register
          </div>
          <input
            className="w-full h-10 border-2 border-gray-200 rounded-xl my-2 px-4 "
            placeholder="Your name"
            name="name"
            type="text"
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <input
            className="w-full h-10 border-2 border-gray-200 rounded-xl my-2 px-4  "
            placeholder="Your@email.com"
            name="email"
            type="text"
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <input
            className="w-full h-10 border-2 border-gray-200 rounded-xl my-2 px-4"
            placeholder="Enter your password"
            name="password"
            type="password"
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <button
            className="w-full h-10 bg-primary text-white font-bold rounded-xl"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Register
          </button>
          <div className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="underline text-black">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
