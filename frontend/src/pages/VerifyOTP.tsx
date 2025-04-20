import OtpForm from "@/components/verifyOtp/OtpForm";
import React from "react";

function VerifyOTP() {
  return (
    <div className="items-center justify-center flex">
      <div className=" w-3/4 items-center flex  gap-4 justify-center py-24">
        <OtpForm />
      </div>
    </div>
  );
}

export default VerifyOTP;
