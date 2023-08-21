// for data types
interface IinfoState<T> {
  _id?: string | null;
  Firstname: T;
  Lastname: T;
  Email?: T | null;
  Password: T;
  Sex: T;
  Bio?: T | null;
  Image?: T | null;
  DOB: T;
}

interface IGetData {
  Data: IinfoState<string>;
}

type IAuthState = {
  Data: Partial<IinfoState<string>>;
};

export type { IAuthState, IGetData, IinfoState };
