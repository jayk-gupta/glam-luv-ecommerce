import React from "react";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import ConfirmPasswordInput from "../components/ConfirmPasswordInput";
import FormWrapper from "../components/FormWrapper";
import { userRegisterForm } from "../../../contexts/SignUpFormContext";
import { Link } from "react-router-dom";

function SignUpForm() {
   const {
     email,
     setEmail,
     password,
     setPassword,
     confirmPassword,
     setConfirmPassword,
     errors,
     showPassword,
     setshowPassword,
     handleSubmit,
   } = userRegisterForm();
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }
  function handlePasswordVisibility() {
    setshowPassword(!showPassword);
  }
  return (
    <div className="p-12 bg-gray-50">
      <FormWrapper title="SignUp" handleSubmit={handleSubmit}>
        <EmailInput email={email} handleEmail={handleEmail} errors={errors} />
        <PasswordInput
          password={password}
          handlePassword={handlePassword}
          showPassword={showPassword}
          handlePasswordVisibility={handlePasswordVisibility}
          errors={errors}
        />
        <ConfirmPasswordInput
          confirmPassword={confirmPassword}
          handleConfirmPassword={handleConfirmPassword}
          errors={errors}
        />
        <p>
          Already have an account? <Link to="/login" className="text-blue-500 underline">Log In</Link>
        </p>
      </FormWrapper>
    </div>
  );
}

export default SignUpForm