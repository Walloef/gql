import React from 'react';
import { query } from '../../client';
import { POKEMONS } from '../../queries';

const Pokemon = ({ p }) => {
  return (
    <div>{p.length > 0 && p.map((x) => <p key={x.name}>{x.name}</p>)}</div>
  );
};

export async function getStaticProps() {
  const {
    pokemons: { results },
  } = await query(POKEMONS, { limit: 9 });

  return {
    props: { p: results },
  };
}
export default Pokemon;
