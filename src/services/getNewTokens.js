import api from "../configs/api";
import { getCookie } from "../utils/cookie";

const getNewTokens = async () => {
  // send refresh token to ServerRouter, get new access token
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;//means it's user first time, or after a long time
  try {
    const response = await api.post("auth/check-refresh-token", {
      refreshToken,
    });
    return response;
  } catch (error) {
    return { error };
  }
};

export {getNewTokens}