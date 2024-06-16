import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { userAuth } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.user);
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
    console.log("userCredentials ", userCredentials);
    dispatch(userAuth(userCredentials)).then((res) => {
      if (res.payload.token) {
        navigate("/")
      }
    })
    // dipatch logic -> reset the login box and navigate
  };
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  return (
    <>
      <div className="container  w-full h-80 flex justify-center items-center">
        <div>
          <div className="text-2xl font-semibold text-gray-700 w-full text-center">
            Login
          </div>
          <input
            className="w-full h-10 border-2 border-gray-200 rounded-xl my-2 px-4"
            value={userCredentials.email}
            placeholder="Your@email.com"
            name="email"
            type="text"
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <input
            className="w-full h-10 border-2 border-gray-200 rounded-xl my-2 px-4"
            name="password"
            value={userCredentials.password}
            placeholder="Enter your password "
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
            Login
          </button>
          {/* guest users */}
          {/* <button className="w-full h-10 my-1 bg-primary text-white font-bold rounded-xl"
            onClick={() => {
              userCredentials(() => {
                return { email: "sudhanshu@gmail.com", password: "qwezxc!!@!" }
              });

            }}
          >
            Guest User
          </button> */}
          <div className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline text-black">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
