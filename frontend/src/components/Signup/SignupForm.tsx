import { useStartSignUpMutation } from "@/redux/user/authAPI";
import { Form } from "../ui/form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormSchema, formSchema } from "./FormSchema";
import { setSignupEmail } from "@/redux/user/authSlice";
import { FormInput } from "../ui/custom/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "../ui/custom/Error";

function SignupForm() {
  const dispatch = useDispatch();
  const navigte = useNavigate();
  const [startSignup, { isLoading, error }] = useStartSignUpMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: FormSchema) {
    const email = values.email;
    try {
      await startSignup({ email }).unwrap();
      dispatch(setSignupEmail(email));
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h3>Log in</h3>
            <p>Enter your email and we'll send you a login code</p>
            <FormInput
              name="email"
              label="Email"
              placeholder="Email"
              form={form}
            />
          </div>
          {error && <Error error={error} />}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending code" : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
