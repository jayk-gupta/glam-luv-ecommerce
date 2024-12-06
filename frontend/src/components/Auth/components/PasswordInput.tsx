import React from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface PasswordInputProps {
  password: string;
  handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  handlePasswordVisibility: () => void;
  errors: {
    password?: string;
  };
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  handlePassword,
  showPassword,
  handlePasswordVisibility,
  errors,
}) => {
  return (
    <div className="form-group flex flex-col">
      <label htmlFor="password" className="pr-4 font-semibold mb-2">
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
        className="relative bottom-5 left-[230px] cursor-pointer"
      >
        {showPassword ? (
          <VscEye className="visible" />
        ) : (
          <VscEyeClosed className="visible" />
        )}
      </span>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
      )}
    </div>
  );
};

export default PasswordInput;
