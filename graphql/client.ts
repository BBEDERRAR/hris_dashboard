// A simple GraphQL client for our mock GraphQL server

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// HTTP link
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql',
});

// Create the Apollo Client instance for client-side only
// We need to check if we're on the client to avoid issues during SSR
const createApolloClient = () => {
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
    ssrMode: typeof window === 'undefined',
  });
};

// Export a function to get the client, ensuring it's created only on the client side
let clientInstance: ApolloClient<any> | null = null;

export function getClient() {
  // Create the client once in the client side
  if (!clientInstance && typeof window !== 'undefined') {
    clientInstance = createApolloClient();
  }
  return clientInstance;
}

// For compatibility with existing code
export default getClient(); 