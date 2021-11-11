import { query } from '../../client';
import { POKEMONS } from '../../queries';
import { POKEMON_LIMIT } from '../../constants';
import Index from '../index';

export const getStaticProps = async ({ params }) => {
  const {
    pokemons: { results, count },
  } = await query(POKEMONS, {
    limit: POKEMON_LIMIT,
    offset: POKEMON_LIMIT * (params.page - 1),
  });

  return {
    props: {
      pokemons: results,
      totalAmountOfPages: Math.ceil(count / POKEMON_LIMIT),
    },
  };
};

export const getStaticPaths = async () => {
  const {
    pokemons: { count },
  } = await query(POKEMONS, { limit: 1 });

  return {
    paths: [...new Array(Math.ceil(count / POKEMON_LIMIT))].map((_, index) => {
      return {
        params: {
          page: `${index + 1}`,
        },
      };
    }),
    fallback: false,
  };
};

export default Index;
