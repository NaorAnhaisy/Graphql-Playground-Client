import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo-client";
import { AppWrapper } from "../context/state"; // import based on where you put it

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </AppWrapper>
  );
}

export default MyApp;
