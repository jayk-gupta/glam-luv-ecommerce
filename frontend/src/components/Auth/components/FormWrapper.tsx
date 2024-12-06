import React from "react";

interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  children,
  handleSubmit,
}) => {
  return (
    <div className="p-12 flex flex-col items-center">
      <h2 className="mb-12 text-2xl">{title}</h2>
      <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
        {children}
        <button
          className="bg-[#EB008B] w-full p-2 text-white font-bold uppercase"
          type="submit"
        >
          {title}
        </button>
      </form>
    </div>
  );
};

export default FormWrapper;
