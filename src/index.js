import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';

import Routes from './screens';

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({ uri: 'http://localhost:4000/api/graphql' })
  ),
  cache: new InMemoryCache()
});

export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);
