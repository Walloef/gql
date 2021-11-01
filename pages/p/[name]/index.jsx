import React from "react";
import { useRouter } from "next/dist/client/router";

const Pokemon = () => {
  const { query } = useRouter();

  return <h1>{query.name}</h1>;
};

export default Pokemon;
