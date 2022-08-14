import axios from 'axios';
import React from 'react';
import { useState, } from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const PokemonInfoScreen = () => {
  const {id} = useParams();
  const [pokemon, setPokemon] = useState();
  
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(({data}) => setPokemon(data));
  }, [id])
  
  return (
    <div className='container-fluid'>
      {pokemon && <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="d-block mx-auto" />}
    </div>
  );
};

export default PokemonInfoScreen;