import React, { useRef, useState, useCallback } from 'react';
import usePokemonSearch from '../../js/usePokemonSearch';
import PokemonCard from '../generics/PokemonCard';
import LoadingSpinner from './LoadingSpinner';
import '../../styles/components/Pokemons.scss'
import '../../styles/components/PokemonCard.scss';

const Pokemons = (props) => {
  const [type, setType] = useState('simple');
  const [search, setSearch] = useState('');
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
        setOffset(offsetValue => offsetValue + 100);
      }
    });
    
    if(node)
      observer.current.observe(node);
  }, [loading, next]);
  
  return (
    <div className='container my-5'>
      <nav className='d-flex align-items-center gap-5'>
        <input type='text' className='search-pokemon form-control w-25' value={search} placeholder='Rechercher un pokémon'
        onChange={(event) => setSearch(event.target.value.toLowerCase())} />
        
        <span className='display-type my-3 rounded'>
          <img src="./applications.png" alt="simple" className={type ==='simple' ? 'active' : ''} onClick={() => setType('simple')}/>
          <img src="./aligner-justifier.png" alt="advanced" className={type ==='advanced' ? 'active' : ''} onClick={() => setType('advanced')}/>
        </span>
      </nav>
      <div className='d-flex flex-wrap gap-3'>
        {
          pokemons
          .filter((pokemon) => !search || pokemon.name.toLowerCase().includes(search))
          .map((pokemon, index) => {
            if(pokemons.length === index + 1){
              return <div key={index + 'Loader'} ref={loader}><PokemonCard key={index} url={pokemon.url} /></div>
            } else {
              return <PokemonCard key={index} url={pokemon.url} type={type} />
            }
          })
        }
      </div>
      <div className="my-5 text-center">
        {(loading && (<LoadingSpinner />))}
        {(error && <span>{error}</span>)}
      </div>
    </div>
  );
};

export default Pokemons;