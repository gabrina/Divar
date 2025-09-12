import  { useState } from "react";
import SendOTPForm from "../components/templates/SendOTPForm";
import CheckOTPForm from "../components/templates/CheckOTPForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  return (
    <div>
      {step === 1 && (
        <SendOTPForm setMobile={setMobile} setStep={setStep} mobile={mobile} />
      )}
      {step === 2 && (
        <CheckOTPForm
          code={code}
          setCode={setCode}
          mobile={mobile}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default AuthPage;
