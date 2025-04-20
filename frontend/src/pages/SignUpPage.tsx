import CompleteSignupForm from "@/components/Signup/CompleteSignupForm";
import SignupForm from "@/components/Signup/SignupForm";
import OtpForm from "@/components/verifyOtp/OtpForm";
import { useState } from "react";

type SignupStep = "start" | "verifyOtp" | "complete";

function SignUpPage() {
  const [step, setStep] = useState<SignupStep>("start");
  return (
    <div className="items-center justify-center flex">
      <div className=" w-3/4 items-center flex  gap-4 justify-center py-24">
        {step === "start" && (
          <SignupForm onSuccess={() => setStep("verifyOtp")} />
        )}
        {step === "verifyOtp" && (
          <OtpForm onSuccess={() => setStep("complete")} />
        )}
        {step === "complete" && <CompleteSignupForm />}
      </div>
    </div>
  );
}

export default SignUpPage;
