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
    .find((token) => token.split("=")[0] === cookieName)?.split("=")[1];
};

//?is used in case that if either of the tokens is non-existent,
//  getCookie wouldn't return undefined

export { setCookie, getCookie };
