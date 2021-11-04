import { Fragment } from "react";
import { query } from "../../client";
import { POKEMON, POKEMONS } from "../../queries";
import pokemonStype from "../../styles/PokemonStype.module.css";
import PokemonImage from '../../components/PokemonImage'
const PokemonView = ({ pokemon }) => {
  // console.log('pokemon');
  const {
    sprites,
    name,
    id,
    weight,
    height,
    stats,
    types,
  } = pokemon;

  return (
    <div className={pokemonStype.wrapper}>
      <div className={pokemonStype.container}>
        <div
          className={pokemonStype.image}
        >
          {/*eslint-disable-next-line @next/next/no-img-element */}
          <PokemonImage sprites={sprites} alt={`a picture of ${name}`}/>
        </div>
        <div className={pokemonStype.name}>
          <h1>{name} </h1> <span>#{id}</span>
        </div>

        <div className={pokemonStype.size}>
          <h2>Size</h2>
          <p>Height: {height / 10} m</p>
          <p>Weight: {weight / 10} kg</p>
        </div>

        <div className={pokemonStype.type}>
          <h2>{types.length > 1 ? "Types" : "Type"}</h2>
          <p>
            {types.map((type, index) => (
              <Fragment key={index}>
                {type.type.name}
                {types.length !== index + 1 && ", "}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      <ul className={pokemonStype.skills}>
        {stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
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
  const { pokemons } = await query(POKEMONS, { limit: 151 });
  const paths = pokemons.results.map((pokemon) => {
    return { params: { slug: pokemon.name } };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export default PokemonView;
