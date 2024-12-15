import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
import { login, loginUser, logoutUser } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";

interface Errors {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" })); // Clear email error
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" })); // Clear password error
  }

  function handlePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side validation
    const validationErrors: Errors = {};
    if (!email) validationErrors.email = "Email is required.";
    if (!password) validationErrors.password = "Password is required.";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser({ email, password });
      console.log(response);
      // Store the token in a cookie
      document.cookie = `token=${response.token}; path=/`;
      console.log(document.cookie);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
      dispatch(login(true));
      navigate("/account");
      
    } catch (err: any) {
      // Handle server-side errors
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors); // Assumes server returns an `errors` object
      } else {
        setErrors({ email: "Invalid email or password." });
      }
    }
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
