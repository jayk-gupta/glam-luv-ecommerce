
import { useSelector } from "react-redux";
import LoginForm from "../components/Auth/Login/LoginForm";

import { RootState } from "../redux/store";
import UserDetailsForm from "../components/AccountPage/UserDetailsForm";

function UserAccountPage() {
 const isAuthenticated = useSelector((state:RootState)=> state.auth.isAuthenticated)
  // console.log(isAuthenticated)
  return(
  <div className="flex justify-center">{isAuthenticated ?
      <div>user account</div> : <LoginForm />}
      <div>
        <UserDetailsForm/>
      </div>
  </div>)
}

export default UserAccountPage;
