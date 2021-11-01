import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://graphql-pokeapi.graphcdn.app/');

export const query = (query, variables = {}) => {
  console.log(client.request(query, variables));
  return client.request(query, variables);
};
