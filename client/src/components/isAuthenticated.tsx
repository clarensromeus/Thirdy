import isNil from "lodash/isNil";

function isAuthenticated(): boolean {
  const token: string | null = window.localStorage.getItem("TOKEN");
  let Authenticated: boolean = false;

  if (typeof window !== "undefined" && !isNil(token)) {
    Authenticated = true;
  }

  return Authenticated;
}

export default isAuthenticated;

// component which defines whether or not user is authenticated
