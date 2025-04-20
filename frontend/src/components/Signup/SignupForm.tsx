import { useStartSignUpMutation } from "@/redux/user/authAPI";
import { Form } from "../ui/form";
import { useDispatch } from "react-redux";
import { FormSchema, formSchema } from "./FormSchema";
import { setSignupEmail } from "@/redux/user/authSlice";
import { FormInput } from "../ui/custom/FormInput";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "../ui/custom/Error";

function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch();
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
      onSuccess();
    } catch (error: any) {
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
          </div>
          {error && <Error error={error} />}

          <Button
            variant="default"
            type="submit"
            className="w-full bg-gray-800 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending code" : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
