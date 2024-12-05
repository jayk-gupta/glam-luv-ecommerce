import React from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

function PasswordInput({
  password,
  handlePassword,
  showPassword,
  handlePasswordVisibility,
  errors,
}) {
  return (
    <div className="form-group">
      <label htmlFor="password" className="pr-4">
        Password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        required
        value={password}
        className="bg-white border-[0.5px] w-[16rem]"
        onChange={handlePassword}
      />
      <span
        onClick={handlePasswordVisibility}
        className="relative bottom-5 left-[315px] cursor-pointer"
      >
        {showPassword ? (
          <VscEye className="visible" />
        ) : (
          <VscEyeClosed className="visible" />
        )}
      </span>
      {errors.password && <p className="">{errors.password}</p>}
    </div>
  );
}

export default PasswordInput;
