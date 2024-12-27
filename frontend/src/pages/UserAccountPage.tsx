
import { useSelector } from "react-redux";
import LoginForm from "../components/Auth/Login/LoginForm";

import { RootState } from "../redux/store";

function UserAccountPage() {
 const isAuthenticated = useSelector((state:RootState)=> state.auth.isAuthenticated)
  console.log(isAuthenticated)
  return <div>{isAuthenticated ?
    <div>user account</div> : <LoginForm />}</div>;
}

export default UserAccountPage;
