import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PokemonCard = ({url}) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSprites, setPokemonSprites] = useState("");
  useEffect(() => {
    axios.get(url).then(({data}) => setPokemon(data));
  }, []);
  useEffect(() => {
    if(pokemon)
      axios.get(pokemon.forms[0].url).then(({data}) => setPokemonSprites(data.sprites));
  }, [pokemon]);
  
  return (
    <div className="pokemon-card position-relative d-flex justify-content-center align-items-center img-thumbnail">
      {(pokemonSprites && <img src={pokemonSprites.front_default} alt={pokemon.name} className="img-fluid" />)}
      <div className="infos position-absolute d-flex flex-column justify-content-center align-items-center w-100 h-100 text-light">
        {(pokemon && <span>{pokemon.name}</span>)}
      </div>
    </div>
  );
};

export default PokemonCard;