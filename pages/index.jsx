import Link from 'next/link';
import { query } from '../client';
import { POKEMONS } from '../queries';
import styles from '../styles/Home.module.scss';
import { POKEMON_LIMIT } from '../constants';
import { Fragment } from 'react';

import Pagination from '../components/Pagination';

export default function Index({ pokemons, totalAmountOfPages }) {
  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.heading}>Select your favorite</h1>
        {pokemons.length > 0 ? (
          <Fragment>
            <ul className={styles.pokemonNav}>
              {pokemons.map((pokemon, index) => (
                <li key={index}>
                  <Link href="/[slug]" as={`/${pokemon.name}`}>
                    <a className={styles.link}>
                      <img
                        src={pokemon.image}
                        alt={`image of ${pokemon.name}`}
                      />
                      {pokemon.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            {totalAmountOfPages && (
              <Pagination totalAmountOfPages={totalAmountOfPages} />
            )}
          </Fragment>
        ) : (
          <p>Looks like all pokemons left</p>
        )}
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const {
    pokemons: { results, count },
  } = await query(POKEMONS, { limit: POKEMON_LIMIT });

  return {
    props: {
      pokemons: results,
      totalAmountOfPages: Math.ceil(count / POKEMON_LIMIT),
    },
  };
};
