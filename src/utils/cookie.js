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
    .find((token) => token.split("=")[0] === cookieName)
    ?.split("=")[1];
};

//?is used in case that if either of the tokens is non-existent,
//  getCookie wouldn't return undefined

const clearCookie = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

export { setCookie, getCookie, clearCookie };
