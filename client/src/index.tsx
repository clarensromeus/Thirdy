// internal imports of resources
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// external imports of resources
import grey from "@mui/material/colors/grey";
import CssBaseline from "@mui/material/CssBaseline";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import CloseIcon from "@mui/icons-material/Close";
import { RecoilRoot } from "recoil";
import { split } from "@apollo/client";
import {
  getMainDefinition,
  relayStylePagination,
} from "@apollo/client/utilities";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  NormalizedCacheObject,
  from,
  ApolloLink,
} from "@apollo/client";
import {
  SnackbarProvider,
  MaterialDesignContent,
  closeSnackbar,
} from "notistack";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
// internally crafted imports of resources
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Authentication } from "./Global/GlobalAuth";

// noti stack global style overriding
const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#ffffff",
  },

  "&.notistack-MuiContent-error": {
    backgroundColor: "#ffffff",
  },
}));

const uploadLink: ApolloLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const token: string | null = localStorage.getItem("TOKEN");

// webSocket link
const wsLink: GraphQLWsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:5000/graphql",
    connectionParams: {
      authentication: token ? `${token}` : "",
    },
    lazy: true,
  })
);

// split communication by operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  uploadLink
);

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

// initialize ApolloClient and add configuration within its constructor
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([splitLink, retryLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          AllPosts: {
            keyArgs: false,
            merge: (existing, incoming) => {
              if (!incoming) {
                return existing;
              }
              return {
                ...existing,
                ...incoming,
              };
            },
          },
          isLoggedIn: {
            read(__) {
              const isUserTokenExist = window.localStorage.getItem("TOKEN");
              // if user is not yet authenticated  return isLoggedIn false
              if (!isUserTokenExist) {
                return Authentication({ isLoggedIn: false });
              }
              // if user is authenticated return isLoggedIn true
              return Authentication({ isLoggedIn: true });
            },
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SnackbarProvider
          disableWindowBlurListener // for closing snack out of window focus
          iconVariant={{
            success: "✅",
          }}
          action={(snackbarId) => (
            <IconButton onClick={() => closeSnackbar(snackbarId)}>
              <CloseIcon sx={{ color: grey[600] }} />
            </IconButton>
          )}
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
          }}
        >
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </SnackbarProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
