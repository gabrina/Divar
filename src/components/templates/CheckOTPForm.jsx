import { toast } from "react-toastify";
import { checkOTP } from "../../services/Auth";
import { setCookie } from "../../utils/cookie";

function CheckOTPForm({ code, setCode, mobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();

    //Code Validation
    if (!code) {
      toast.warn("لطفا کد پیامک شده را وارد کنید");
      return;
    }

    //Sending POST request
    const { response, error } = await checkOTP({ mobile, code });

    //Checking response
    if (response) {
      // console.log(response);
      setCookie(response.data);
      toast.success("ورود با موفقیت انجام شد");
    }

    //Checking for errors
    if (error) {
      error.status === 401
        ? toast.error("کد وارد شده اشتباه است یا منقضی شده است ")
        : toast.error("خطایی پیش آمده، مجددا تلاش کنید");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <p>تأیید کد ورود</p>
      <span>کد پیامک شده به«{mobile}» را وارد کنید</span>
      <label htmlFor="input">کد تأیید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تأیید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>
    </form>
  );
}

export default CheckOTPForm;
