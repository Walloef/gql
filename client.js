import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://graphql-pokeapi.graphcdn.app/');

export const query = async (query, variables = {}) => {
  return client.request(query, variables);
};
