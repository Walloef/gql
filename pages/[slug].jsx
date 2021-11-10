import { Fragment } from 'react';
import { query } from '../client';
import { POKEMON, POKEMONS } from '../queries';
import pokemonStype from '../styles/PokemonStype.module.scss';
import PokemonImage from '../components/PokemonImage';
import { POKEMON_LIMIT } from '../constants';

const PokemonView = ({ pokemon }) => {
  const { sprites, name, id, weight, height, stats, types } = pokemon;

  return (
    <div className={pokemonStype.wrapper}>
      <div className={pokemonStype.container}>
        <div className={pokemonStype.image}>
          <PokemonImage sprites={sprites} alt={`a picture of ${name}`} />
        </div>
        <div className={pokemonStype.name}>
          <h1>{name} </h1> <span>#{id}</span>
        </div>

        <div className={pokemonStype.size}>
          <h2>Size</h2>
          <p>Height: {height / 10}m</p>
          <p>Weight: {weight / 10}kg</p>
        </div>

        <div className={pokemonStype.type}>
          <h2>{types.length > 1 ? 'Types' : 'Type'}</h2>
          <p>
            {types.map((type, index) => (
              <Fragment key={index}>
                {type.type.name}
                {types.length !== index + 1 && ', '}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      <h2>Base stats</h2>
      <ul className={pokemonStype.skills}>
        {stats.map((stat, index) => (
          <li key={index}>
            <p>
              {stat.stat.name}: {stat.base_stat}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { pokemon } = await query(POKEMON, { name: params.slug });
  return { props: { pokemon } };
};

export const getStaticPaths = async () => {
  const allPokemons = [];
  const {
    pokemons: { count },
  } = await query(POKEMONS, { limit: 1 });
  const promises = [...new Array(Math.ceil(count / POKEMON_LIMIT))].map(
    (_, i) => {
      return query(POKEMONS, {
        limit: POKEMON_LIMIT,
        offset: i * POKEMON_LIMIT,
      });
    }
  );

  const allPromises = await Promise.all(promises);

  allPromises.forEach((prom) =>
    prom.pokemons.results.forEach((res) => allPokemons.push(res))
  );

  const paths = allPokemons.map((pokemon) => {
    return { params: { slug: pokemon.name } };
  });
  return {
    paths,
    fallback: false,
  };
};

export default PokemonView;
