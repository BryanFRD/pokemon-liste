import axios from 'axios';
import { useEffect, useState } from 'react';

const usePokemonSearch = (offset) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon',
      params: {limit: 100, offset: offset},
      cancelToken: new axios.CancelToken((c) => cancel = c)
    }).then(async res => {
      res.data.results.forEach(pokemon => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(pokemon => {
          setPokemons(prevPokemons => [...prevPokemons, pokemon.data])
          setNext(res.data.next ?? false);
          setLoading(false);
        });
      });
    }).catch(err => {
      if(axios.isCancel(err))
        return;
      setError(true);
    });
    
    return () => cancel();
  }, [offset]);
  
  useEffect(() => {
    pokemons.sort((a, b) => a.id - b.id);
    pokemons.forEach(pokemon => {
      if(!pokemon.hasSpecies){
        if(!pokemon.species.url)
          return;
        axios.get(pokemon.species.url).then(res => {
          Object.assign(pokemon, res.data);
          pokemon.hasSpecies = true;
        });
      }
    });
  }, [pokemons]);
  
  return { loading, error, pokemons, next }
};

export default usePokemonSearch;