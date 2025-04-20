import { useLoginMutation } from "@/redux/user/authAPI";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { formSchema, FormSchema } from "./FormSchema";
import { setCredentials } from "@/redux/user/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../ui/custom/FormInput";
import Error from "../ui/custom/Error";
import { Button } from "../ui/button";

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
      dispatch(setCredentials(values.email))
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-1/3 p-16 rounded-2xl bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" flex flex-col gap-2">
            <h3 className="text-xl font-bold">Log In</h3>
            <p>Enter your email and we'll send you a login code</p>
            <FormInput
              name="email"
              label="Email"
              placeholder="Email"
              form={form}
              className="py-6"
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="password"
              form={form}
              className="py-6"
            />
          </div>
          {error && <Error error={error} />}

          <Button
            variant="default"
            type="submit"
            className="w-full bg-gray-800 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging In" : "Log In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
