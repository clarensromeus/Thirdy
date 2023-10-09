interface response {
  message?: string;
  token: string;
  success: boolean;
}

interface Iconnect {
  Connection: response;
}

interface ISignUp {
  Registeration: response;
}

interface isAuthenticated {
  isLoggedIn: boolean;
}

type IAuthentication = {
  isLoggedIn: isAuthenticated;
};

export type { Iconnect, ISignUp, response, isAuthenticated, IAuthentication };
