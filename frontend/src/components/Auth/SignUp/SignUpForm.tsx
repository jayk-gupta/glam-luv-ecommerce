import React, { useState } from "react";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import ConfirmPasswordInput from "../components/ConfirmPasswordInput";
import FormWrapper from "../components/FormWrapper";

function RegisterForm() {
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

  ///////////////////////////////////////////////////////////////
  // JSX
  return (
    <div className="p-12">
      <FormWrapper title="Register" handleSubmit={handleSubmit}>
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
          Already have an account? <a href="/login">Log In</a>
        </p>
      </FormWrapper>
    </div>
  );
}

export default RegisterForm;
