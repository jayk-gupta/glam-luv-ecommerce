import { useLoginMutation } from "@/redux/user/authAPI";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formSchema, FormSchema } from "./FormSchema";
import { setCredentials } from "@/redux/user/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const [LogIn, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: FormSchema) {
    try {
      const response = await LogIn(values).unwrap()
      dispatch(setCredentials(response))
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred",
        details: error.message,
      });
    }
  }
  return <div></div>;
}

export default LoginForm;
