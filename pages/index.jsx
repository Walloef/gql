import Link from 'next/link';
import { query } from '../client';
import { POKEMONS } from '../queries';
import styles from '../styles/Home.module.scss';
import { POKEMON_LIMIT } from '../constants';
import { Fragment } from 'react';

export default function Index({ pokemons, pagination }) {
  console.log(pagination);
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
            {pagination && (
              <div>
                {[...new Array(pagination.totalAmountOfPages)].map((_, i) => (
                  <Link key={i} href="/page/[page]" as={`/page/${i + 1}`}>
                    <a className={styles.link}>{i + 1}</a>
                  </Link>
                ))}
              </div>
            )}
          </Fragment>
        ) : (
          <p>Looks like all pokemons left</p>
        )}
        {/* {pokemons.length <= POKEMON_LIMIT && ( */}
        {/* <button className={styles.button} onClick={onClick}>
          Show more Pokemons
        </button> */}
        {/* )} */}
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
      pagination: {
        currentPage: 1,
        totalAmountOfPages: Math.ceil(count / POKEMON_LIMIT),
      },
    },
  };
};
