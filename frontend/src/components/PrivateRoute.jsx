// this contains the info that will decide if the route can be accessed or  not?
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const {userInfo} = useSelector(state => state.user)
  return (
    <>
    {userInfo ? <Outlet /> : <Navigate to='/login'/>}
    </>
  )
};

export default PrivateRoute;