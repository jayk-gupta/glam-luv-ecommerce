import { RootState } from "@/redux/store";
import { useCompleteSignupMutation } from "@/redux/user/authAPI";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { FormInput } from "../ui/custom/FormInput";
import { Button } from "../ui/button";
import Error from "../ui/custom/Error";
const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" }),
});

type FormSchema = z.infer<typeof formSchema>;

function CompleteSignupForm() {
  const email = useSelector((state: RootState) => state.auth.signupEmail);
  const navigate = useNavigate();
  const [completeSignup, { isLoading, error }] = useCompleteSignupMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  async function onSubmit(values: FormSchema) {
    try {
      await completeSignup({ email, password: values.password }).unwrap();
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" flex flex-col gap-2">
            <h3 className="text-xl font-bold">Set Your Password</h3>
            <p>Email: {email}</p>
            <FormInput
              name="password"
              label="Password"
              placeholder="password"
              form={form}
              className="py-6"
            />
            <FormInput
              name="password"
              label="confirm Password"
              placeholder="confirm password"
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
            {isLoading ? "Logging In" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CompleteSignupForm;
