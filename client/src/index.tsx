import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  HttpLink,
  NormalizedCacheObject,
  from,
  ApolloLink,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
// internally crafted imports of ressources
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const httpLink: HttpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
});

// link defines to set configuration to retry on network failure
const retryLink: RetryLink = new RetryLink({
  delay: {
    initial: 2000, // maximum millisecond of delay to retry initially
    max: Infinity, // maximum millisecond of delay after each retry
    jitter: true, // randomize delays
  },
  attempts: {
    max: 3, // maximum attempts to retry
    retryIf: (error, _operation) => !!error, // retry only on error
  },
});

const authLink: ApolloLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("TOKEN");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// initialize ApolloClient and add configuration within its constructor
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([authLink, httpLink, retryLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
