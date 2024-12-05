import React from "react";
import styles from "../Register/RegisterForm.module.css";
function EmailInput({ email, handleEmail, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        value={email}
        required
        className={styles.input}
        onChange={handleEmail}
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}
    </div>
  );
}

export default EmailInput;
