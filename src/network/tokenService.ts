enum Tokens {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

class TokenService {
  isAccessToken = () => localStorage.getItem(Tokens.accessToken);

  setAccessToken = (token: string) => {
    localStorage.removeItem(Tokens.accessToken);
    localStorage.setItem(Tokens.accessToken, token);
  };

  setRefreshToken = (token: string) => {
    localStorage.removeItem(Tokens.refreshToken);
    localStorage.setItem(Tokens.refreshToken, token);
  };

  getAccessToken = () => {
    const token = localStorage.getItem(Tokens.accessToken);
    return token;
  };

  getRefreshToken = () => {
    const token = localStorage.getItem(Tokens.refreshToken);
    return token;
  };

  clear = () => {
    localStorage.removeItem(Tokens.accessToken);
    localStorage.removeItem(Tokens.refreshToken);
  };
}

const tokenService = new TokenService();

export { tokenService };
