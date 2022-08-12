import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../layouts/LoadingSpinner';

const PokemonCard = ({url, type}) => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSprites, setPokemonSprites] = useState("");
  useEffect(() => {
    if(url)
      axios.get(url).then(({data}) => setPokemon(data));
  }, [url]);
  useEffect(() => {
    if(pokemon && pokemon.forms[0]?.url)
      axios.get(pokemon.forms[0].url).then(({data}) => setPokemonSprites(data.sprites));
  }, [pokemon]);
  
  return (<>
    {(type === 'simple' &&
    (<div className="pokemon-card position-relative d-flex justify-content-center align-items-center img-thumbnail">
      {(!pokemon?.forms[0] && <LoadingSpinner />)}
      {(pokemonSprites && <img src={pokemonSprites.front_default} alt={pokemon.name} className="img-fluid" />)}
      <div className="infos position-absolute d-flex flex-column justify-content-center align-items-center w-100 h-100 text-light">
        {(pokemon && <span>{pokemon.name}</span>)}
      </div>
    </div>)
    )}
    {(type === 'advanced' &&
      <div className='pokemon-card w-100 h-100 border border-dark rounded p-2'>
        {(pokemonSprites && <img src={pokemonSprites.front_default} alt={pokemon.name} className="img-fluid" />)}
      </div>)}
  </>);
};

export default PokemonCard;