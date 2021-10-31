import { useState } from "react";
import { query } from "../../client";
import { POKEMON, POKEMONS } from "../../queries";

const PokemonView = ({ pokemon }) => {
  console.log(pokemon);
  const {
    sprites: { front_default, back_default },
    name,
    id,
    weight,
    height,
    stats,
    types,
  } = pokemon;

  const [imgUrl, setImageUrl] = useState(front_default);

  const mouseHover = (enter) => {
    setImageUrl(enter ? back_default : front_default);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10vh",
      }}
    >
      <div
        onMouseEnter={() => mouseHover(true)}
        onMouseLeave={() => mouseHover(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgUrl} alt={`a picture of ${name}`} width={96} height={96} />
      </div>

      <div
        style={{
          position: "relative",
        }}
      >
        <h1
          style={{
            textTransform: "uppercase",
            marginTop: 0,
          }}
        >
          {name}
        </h1>
        <span
          style={{
            position: "absolute",
            top: -18,
            right: -21,
            fontSize: 23,
            fontWeight: "bold",
          }}
        >
          #{id}
        </span>
      </div>
      <div>
        <h3>{types.length > 1 ? "Types" : "Type"}</h3>
        {types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
      </div>
      <div>
        {stats.map((stat, index) => (
          <p key={index}>
            {stat.stat.name}: {stat.base_stat}
          </p>
        ))}
      </div>
      <div>
        <p>Height: {height / 10} m</p>
        <p>Weight: {weight / 10} kg</p>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  console.log(params.slug);

  const { pokemon } = await query(POKEMON, { name: params.slug });
  console.log(pokemon);
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
