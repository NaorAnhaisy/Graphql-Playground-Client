import { SSRProvider } from "@react-aria/ssr";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo-client";
import { AppWrapper } from "../context/state"; // import based on where you put it
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <AppWrapper>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AppWrapper>
    </SSRProvider>
  );
}

export default MyApp;
