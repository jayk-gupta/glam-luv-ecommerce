import { useVerifyOtpMutation } from "@/redux/user/authAPI";
import { Form } from "../ui/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormSchema, formSchema } from "./FormSchema";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "../ui/custom/Error";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { RootState } from "@/redux/store";

function OtpForm() {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.signupEmail);
  const navigate = useNavigate();
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });
  async function onSubmit(values: FormSchema) {
    try {
      await verifyOtp({ email, otp: values.otp }).unwrap();
      // Optionally navigate to password step
      navigate("/signup/set-password");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h3>Enter Code </h3>
            <p>sent to email {email}</p>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {error && <Error error={error} />}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OtpForm;
