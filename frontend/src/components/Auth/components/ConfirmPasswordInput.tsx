import React from "react";

interface ConfirmPasswordInputProps {
  confirmPassword: string;
  handleConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    confirmPassword?: string;
  };
}

const ConfirmPasswordInput: React.FC<ConfirmPasswordInputProps> = ({
  confirmPassword,
  handleConfirmPassword,
  errors,
}) => {
  return (
    <div className="form-group flex flex-col">
      <label htmlFor="confirmPassword" className="pr-4 font-semibold mb-2">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirm-password"
        required
        value={confirmPassword}
        className="bg-white border-[0.5px] w-[16rem]"
        onChange={handleConfirmPassword}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
      )}
    </div>
  );
};

export default ConfirmPasswordInput;
