import React from "react";

interface EmailInputProps {
  email: string;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    email?: string;
  };
}

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  handleEmail,
  errors,
}) => {
  return (
    <div className="form-group flex flex-col">
      <label htmlFor="email" className="pr-4 font-semibold mb-2">
        E-mail
      </label>
      <input
        type="email"
        value={email}
        required
        className="bg-white border-2 w-[16rem]"
        onChange={handleEmail}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
      )}
    </div>
  );
};

export default EmailInput;
