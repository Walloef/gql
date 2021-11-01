import React, {useState} from 'react';

const PokemonImage = ({sprites: {front_default, back_default}, alt}) => {
  const [url, setUrl] = useState(front_default);
  const mouseHover = () => {
    setUrl(url === back_default ? front_default : back_default);
  };

  return (
    <div
      onMouseEnter={mouseHover}
      onMouseLeave={mouseHover}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} width={96} height={96} />
    </div>
  )
}

export default PokemonImage;