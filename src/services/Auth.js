import api from "../configs/api";

const sendOTP = async (mobile) => {
  try {
    const response = await api.post("auth/send-otp", { mobile });
    return { response };
  } catch (error) {
    return { error };
  }
};

const checkOTP = async (data) => {
  try {
    const response = await api.post("auth/check-otp", data);
    return { response };
  } catch (error) {
    return { error };
  }
};

export { sendOTP, checkOTP };
