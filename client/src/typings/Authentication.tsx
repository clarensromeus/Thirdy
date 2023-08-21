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

export type { Iconnect, ISignUp, response };
