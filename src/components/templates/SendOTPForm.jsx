import { sendOTP } from "../../services/Auth";
import { toast } from "react-toastify";

function SendOTPForm({ setMobile, setStep, mobile }) {
  const submitHandler = async (event) => {
    event.preventDefault();
    //phone validation
    const iranPhoneRegex = /^(?:(?:0098|98|0)?9\d{9})$/;

    if (!mobile) {
      toast.warn("لطفا شماره همراه خود را وارد کنید");
      return;
    } else if (!iranPhoneRegex.test(mobile)) {
      toast.warn("شماره وارد شده اشتباه است");
      return;
    }

    //sending OTP
    const { response, error } = await sendOTP(mobile);
    // console.log({ response, error });

    //Logged in successfully
    if (response) {
      setStep(2);
      toast.success("کد تأیید به شماره شما ارسال شد");
    }

    //login failed
    if (error) {
      toast.error("خطایی پیش آمده، لطفا مجددا سعی کنید");
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
        تأیید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input"> شماره موبایل خود را وارد کنید:</label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تأیید</button>
    </form>
  );
}

export default SendOTPForm;
