const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-aged=${
    1 * 24 * 60 * 60
  }`;

  document.cookie = `refreshToken=${tokens.refreshToken}; max-aged=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    .trim()
    .split("=")[1];
};

export { setCookie, getCookie };
