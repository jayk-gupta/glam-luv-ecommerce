import React from "react";

function EmailInput({ email, handleEmail, errors }) {
  return (
    <div className="form-group flex flex-col">
      <label htmlFor="password" className="pr-4 font-semibold mb-2">
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
