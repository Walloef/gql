import Link from "next/link";
import { query } from "../client";
import { POKEMONS } from "../queries";
import styles from "../styles/Home.module.css";

export default function Home({ results }) {
  const pokemons = results;

  return (
    <div className={styles.container}>
      <main>
        <h1>Select your favorite</h1>
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {pokemons.map((pokemon, index) => {
            return (
              <Link
                href="/base-pokemons/[slug]"
                as={`/base-pokemons/${pokemon.name}`}
                key={index}
              >
                <a>{pokemon.name}</a>
              </Link>
            );
          })}
        </nav>
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
