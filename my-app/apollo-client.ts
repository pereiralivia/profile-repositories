import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});


const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_TOKEN

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge(existing, incoming) {
              return incoming
            }
          }
        }
      }
    }
  })
});

export default client;