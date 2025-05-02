import { useVerifyOtpMutation } from "@/redux/user/authAPI";
import { Form } from "../ui/form";
import { useSelector } from "react-redux";
import { FormSchema, formSchema } from "./FormSchema";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Error from "../ui/custom/Error";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { RootState } from "@/redux/store";

function OtpForm({ onSuccess }: { onSuccess: () => void }) {
  // const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.signupEmail);
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
      onSuccess();
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div className="w-1/3 p-16 rounded-2xl bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
        >
          <div className=" flex flex-col gap-2">
            <h3 className="font-bold text-lg">Enter Code </h3>
            <p>sent to email {email}</p>
            <Controller
              control={form.control}
              name="otp"
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  className="w-full"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup className="w-full ">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            ></Controller>
          </div>
          {error && <Error error={error} />}

          <Button
            variant="default"
            type="submit"
            className="w-full bg-gray-800 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Verifying" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default OtpForm;
