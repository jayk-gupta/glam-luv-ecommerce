import React from "react";

function EmailInput({ email, handleEmail, errors }) {
  return (
    <div className="form-group">
      <label htmlFor="email" className="pr-8">
        E-mail
      </label>
      <input
        type="email"
        value={email}
        required
        className="bg-white border-2 w-[16rem]"
        onChange={handleEmail}
      />
      {errors.email && <p className="">{errors.email}</p>}
    </div>
  );
}

export default EmailInput;
