import React from "react";
import styles from "../Register/RegisterForm.module.css";
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
        className={styles.input}
        onChange={handleConfirmPassword}
      />
      {errors.confirmPassword && (
        <p className={styles.error}>{errors.confirmPassword}</p>
      )}
    </div>
  );
}

export default ConfirmPasswordInput;
