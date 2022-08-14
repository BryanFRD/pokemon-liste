import React, { useRef, useState, useCallback } from 'react';
import usePokemonSearch from '../../js/usePokemonSearch';
import PokemonCard from '../generics/PokemonCard';
import LoadingSpinner from './LoadingSpinner';
import '../../styles/components/Pokemons.scss'
import '../../styles/components/PokemonCard.scss';
import { useEffect } from 'react';
import axios from 'axios';

const Pokemons = (props) => {
  const [type, setType] = useState('simple');
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const {loading, error, pokemons, next} = usePokemonSearch(offset);
  const [languages, setLanguages] = useState([]);
  const [lang, setLang] = useState('en');
  const [generations, setGenerations] = useState([]);
  const [genera, setGenera] = useState('Aucune')
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
  
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/language').then(res => {
      res.data.results.forEach(({url}) => {
        axios.get(url).then(({data}) => {
          setLanguages(prevValue => {
            if(prevValue && !prevValue.find(({id}) => id === data.id))
              return [...prevValue, data];
            return prevValue;
          })
        })
      });
    });
    
    axios.get('https://pokeapi.co/api/v2/generation').then(res => {
      res.data.results.forEach(({name}) => {
        name = name.replace('generation-', '').toUpperCase()
        setGenerations(prevValue => {
          if(prevValue && !prevValue.find((n) => n === name))
            return [...prevValue, name];
          return prevValue;
        })
      })
    });
  }, []);
  
  console.log()
  
  return (
    <div className='container my-5'>
      <div className='d-flex my-2'>
        <nav className='d-flex align-items-center gap-5 w-100'>
          <input type='text' className='search-pokemon form-control w-25' value={search} placeholder='Rechercher un pokémon'
          onChange={(event) => setSearch(event.target.value.toLowerCase())} />
          
          <div className='d-flex gap-4 align-items-center'>
            <label htmlFor="language">Langue</label>
            {languages && <select name="language" id="language" value={lang} onChange={(event) => setLang(event.target.value)} className='form-control'>
              {languages.map(language => <option key={'language-' + language.id} lang-id={language.id}>{language.name}</option>)}
            </select>}
          </div>
          
          <div className='d-flex gap-4 align-items-center'>
            <label htmlFor='generation'>Génération</label>
            <select name='generation' id='generation' value={genera} onChange={(event) => setGenera(event.target.value)} className='form-control'>
              <option>Aucune</option>
              {generations.map(gen => <option key={'generation-' + gen}>{gen}</option>)}
            </select>
          </div>
        </nav>
        <span className='display-type my-auto rounded'>
          <img src="./applications.png" alt="simple" className={type ==='simple' ? 'active' : ''} onClick={() => setType('simple')}/>
          <img src="./aligner-justifier.png" alt="advanced" className={type ==='advanced' ? 'active' : ''} onClick={() => setType('advanced')}/>
        </span>
      </div>
      <div className='d-flex flex-wrap gap-3'>
        {
          pokemons
          .filter((pokemon) => (!search || pokemon.displayName?.toLowerCase().includes(search)) &&
            (genera === 'Aucune' || pokemon.generation?.name?.replace('generation-', '').toUpperCase() === genera))
          .sort((a, b) => a.id - b.id)
          .map((pokemon, index) => <PokemonCard key={'pokemon-' + index} pokemon={pokemon} type={type} lang={lang} />)
        }
      </div>
      {(offset > pokemons.length - 100) || (<div className='text-center' ref={loader}><LoadingSpinner /></div>)}
      <div className="my-5 text-center">
        {((loading) && (<LoadingSpinner />))}
        {(error && <span>{error}</span>)}
      </div>
    </div>
  );
};

export default Pokemons;