import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
  const {adminInfo} = useSelector((state) => state.auth);
  return adminInfo ?<Outlet/> : <Navigate to='/admin' replace></Navigate>
}

export default AdminPrivateRoute