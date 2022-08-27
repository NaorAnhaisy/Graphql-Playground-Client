import { ApolloClient, InMemoryCache } from "@apollo/client";
import { apolloClientConfiguration } from "../config/config";

const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? apolloClientConfiguration.devUri
      : apolloClientConfiguration.prodUri,
  cache: new InMemoryCache(),
});

export default apolloClient;
