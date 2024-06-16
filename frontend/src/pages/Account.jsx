import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/user/userSlice";
import Place from "./Place";
export default function Account() {
  const { userInfo } = useSelector((state) => state.user);
  const { subpage } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += " bg-primary rounded-full text-white";
    } else {
      classes += " hover:bg-gray-300 hover:rounded-full";
    }
    return classes;
  }
  const handleLogout = (e) => {
    e.preventDefault();
    const response = dispatch(logOut());
    console.log("resposne form dispatch", response);
    // writing the dipatch for logout
  };
  return (
    <>
      <div className="container">
        <div className="bg-primary text-white w-11 flex justify-center items-center h-11 rounded-full hover:shadow-md" onClick={()=>{navigate(-1)}}>&lt;</div>
        <nav className="flex justify-center gap-3 mb-6">
          <Link to="/account" className={linkClasses("profile")}>
            My Profile
          </Link>
          <Link to="/account/booking" className={linkClasses("booking")}>
            My Booking
          </Link>
          <Link to="/account/places" className={linkClasses("places")}>
            My Accommodation
          </Link>
        </nav>
        {subpage === undefined && (
          <>
            <div className="container text-center text-2xl">
              Hello{" "}
              {
                <span className="font-bold font-mono italic ">
                  {userInfo.name}
                </span>
              }{" "}
              welcome to the profile
            </div>
            <button
              onClick={(e) => handleLogout(e)}
              className="container py-4 text-white font-bold text-xl bg-primary rounded-2xl"
            >
              Logout
            </button>
          </>
        )}
        {
          subpage === 'places' && (
            <Place/>
          )
        }
      </div>
    </>
  );
}
