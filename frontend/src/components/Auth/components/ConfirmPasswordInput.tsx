import React from "react";

function ConfirmPasswordInput({
  confirmPassword,
  handleConfirmPassword,
  errors,
}) {
  return (
    <div className="form-group">
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        id="confirm-password"
        required
        value={confirmPassword}
        className="bg-white"
        onChange={handleConfirmPassword}
      />
      {errors.confirmPassword && (
        <p className="">{errors.confirmPassword}</p>
      )}
    </div>
  );
}

export default ConfirmPasswordInput;
