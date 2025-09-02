const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-aged=${
    1 * 24 * 60 * 60
  }`;

  document.cookie = `refreshToken=${tokens.refreshToken}; max-aged=${
    30 * 24 * 60 * 60
  }`;
};

export { setCookie };
