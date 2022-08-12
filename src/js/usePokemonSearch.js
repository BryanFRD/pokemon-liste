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
    }).then(res => {
      setPokemons(prevPokemons => [...new Set([...prevPokemons, ...res.data.results])]);
      setNext(res.data.next ?? false);
      setLoading(false);
    }).catch(err => {
      if(axios.isCancel(err))
        return;
      setError(true);
    });
    
    return () => cancel();
  }, [offset]);
  
  return { loading, error, pokemons, next }
};

export default usePokemonSearch;