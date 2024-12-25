import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useRegisterUserMutation } from "../redux/AuthAPI";

// schema
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
});

type FormErrors = Record<string, string>;

type RegisterFormContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: FormErrors;
  showPassword: boolean;
  setshowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterFormContext = createContext<RegisterFormContextType | undefined>(
  undefined
);

export const RegisterFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setshowPassword] = useState<boolean>(true);
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationResult = schema.safeParse({
      email,
      password,
      confirmPassword,
    });
    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.reduce(
        (acc, error) => {
          acc[error.path[0] as string] = error.message;
          return acc;
        },
        {} as Record<string, string>
      );
      setErrors(validationErrors);
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await registerUser({ email, password });
      alert("Registration successful");

      navigate("/login");
    } catch (err) {
      console.error("Error registering user");
    }
  }
  return (
    <RegisterFormContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        showPassword,
        setshowPassword,
        handleSubmit,
      }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

export const userRegisterForm = () => {
  const context = useContext(RegisterFormContext);
  if (!context) {
    throw new Error(
      "useRegisterForm must be used within a RegisterFormProvider"
    );
  }
  return context;
};
