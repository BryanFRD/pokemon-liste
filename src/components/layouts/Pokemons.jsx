import React, { useRef, useState, useCallback } from 'react';
import usePokemonSearch from '../../js/usePokemonSearch';
import PokemonCard from '../generics/PokemonCard';
import LoadingSpinner from './LoadingSpinner';
import '../../styles/components/PokemonCard.scss';

const Pokemons = (props) => {
  const [offset, setOffset] = useState(0);
  const {loading, error, pokemons, next} = usePokemonSearch(offset);
  const observer = useRef();
  const loader = useCallback(node => {
    if(loading)
      return;
    if(observer.current)
      observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && next){
        setOffset(offset + 100);
      }
    });
    
    if(node)
      observer.current.observe(node);
  }, [loading, next]);
  
  return (
    <div className='container my-5'>
      <div className='d-flex flex-wrap gap-3 justify-content-center'>
        {
          pokemons.map((pokemonUrl, index) => {
            if(pokemons.length === index + 1){
              return <div key={index + 'Loader'} ref={loader}><PokemonCard key={index} url={pokemonUrl} /></div>
            } else {
              return <PokemonCard key={index} url={pokemonUrl} />
            }
          })
        }
      </div>
      <div className="my-5 text-center">
        {(loading && (<LoadingSpinner />))}
      </div>
    </div>
  );
};

export default Pokemons;