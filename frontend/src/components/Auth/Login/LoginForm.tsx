import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";

interface Errors {
  [key: string]: string;
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setshowPassword] = useState<boolean>(true);
  const navigate = useNavigate();
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handlePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("hi");
    e.preventDefault();
    // try {
    //   console.log("in try");
    //   const response = await loginUser({ email, password });
    //   // store the token in a cookie
    //   document.cookie = `token=${response.token}; path=/`;
    //   axios.defaults.headers.common[
    //     "Authorization"
    //   ] = `Bearer ${response.token}`;
    //   console.log(response);
    //   navigate("/home");
    // } catch (err) {
    //   console.error("Error registering user");
    // }
  }
  return (
    <div className="p-12">
      <FormWrapper title="Login" handleSubmit={handleSubmit}>
        <EmailInput email={email} handleEmail={handleEmail} errors={errors} />
        <PasswordInput
          password={password}
          handlePassword={handlePassword}
          showPassword={showPassword}
          handlePasswordVisibility={handlePasswordVisibility}
          errors={errors}
        />
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
}

export default LoginForm;
