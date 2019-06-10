module.exports = {
  set: (key, value, expires) => {
    document.cookie = `${key}=${value}; expires ${new Date(
      +new Date() + expires
    ).toUTCString()}`;
  },

  get: key => {
    const cookies = document.cookie.split(";").reduce((cookies, cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
      return cookies;
    }, {});

    return cookies[key] || undefined;
  }
};
