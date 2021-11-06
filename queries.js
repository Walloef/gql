import { gql } from 'graphql-request';

export const POKEMONS = gql`
  query getPokemons($limit: Int = 10, $offset: Int = 0) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        name
        image
      }
    }
  }
`;

export const POKEMON = gql`
  query getPokemon($name: String = "venusaur") {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
        back_default
        front_shiny_female
        back_shiny_female
      }
      stats {
        stat {
          name
        }
        base_stat
      }
      types {
        type {
          name
        }
      }
      height
      weight
      moves {
        move {
          name
        }
      }
    }
  }
`;
