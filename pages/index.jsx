import { useState, useEffect } from 'react';
import Link from 'next/link';
import { query } from '../client';
import { POKEMONS } from '../queries';
import styles from '../styles/Home.module.css';

export default function Home({ results }) {
  const [pokemons, setPokemons] = useState(results);
  const [currentLimit, setCurrentLimit] = useState(9);

  const onClick = () => {
    setCurrentLimit(currentLimit + 9);
  };

  useEffect(() => {
    if (currentLimit > 9) {
      (async () => {
        const {
          pokemons: { results },
        } = await query(POKEMONS, { limit: currentLimit });
        setPokemons(results);
      })();
    }
  }, [currentLimit]);

  return (
    <div className={styles.container}>
      <main>
        <h1>Select your favorite</h1>

        <div className={styles.pokemonNav}>
          {pokemons.map((pokemon, index) =>
            index > 150 ? null : (
              <Link
                key={index}
                href="/base-pokemons/[slug]"
                as={`/base-pokemons/${pokemon.name}`}
              >
                <a className={styles.link}>
                  <img src={pokemon.image} alt={`image of ${pokemon.name}`} />
                  {pokemon.name}
                </a>
              </Link>
            )
          )}
        </div>
        {pokemons.length <= 151 && (
          <button className={styles.button} onClick={onClick}>
            Show more Pokemons
          </button>
        )}
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const {
    pokemons: { results },
  } = await query(POKEMONS, { limit: 9 });
  return {
    props: { results },
  };
};
