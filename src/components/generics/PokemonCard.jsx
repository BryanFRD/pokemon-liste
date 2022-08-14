import { Link } from "react-router-dom";
import SimplePokemonCard from "../layouts/SimplePokemonCard";

const PokemonCard = ({pokemon, type, lang}) => {
  pokemon.displayName = pokemon?.names?.find(({language}) => language.name === lang)?.name ?? pokemon.name;
  return (<>
    {(type === 'simple' &&
    (<SimplePokemonCard onClick={() => console.log(pokemon)}>
      {(pokemon && <img src={pokemon.sprites['front_default']} alt={pokemon.displayName} className="img-fluid" />)}
      <div className="infos w-100 h-100 text-light">
        {(pokemon && <span>{pokemon.displayName}</span>)}
      </div>
      <Link to={`/pokemon-info/${pokemon.id}`} className='stretched-link'/>
    </SimplePokemonCard>)
    )}
    
    {(type === 'advanced' &&
      <div className='pokemon-card w-100 h-100 border rounded p-2 gap-3'>
        {(pokemon && (
        <>
          <img src={pokemon.sprites['front_default']} alt={pokemon.displayName} className="img-fluid" onClick={() => console.log(pokemon)}/>
          <div className="d-flex justify-content-around gap-5">
            <div className="d-flex flex-column justify-content-around">
              <span>Nom:&nbsp;{pokemon.displayName}</span>
              <span>Taille:&nbsp;{pokemon.height / 10}&nbsp;m</span>
            </div>
            <div className="d-flex flex-column justify-content-around">
              <span>Génération:&nbsp;
                {('(' + pokemon.generation?.name?.replace('generation-', '').toUpperCase() + ') ' ?? '') +
                (pokemon.genera?.find(({language}) => language.name === lang).genus ??'')}
              </span>
              <span>Poids:&nbsp;{pokemon.weight / 10}&nbsp;Kg</span>
            </div>
            <div className="d-flex flex-column justify-content-around">
              <span></span>
            </div>
          </div>
        </>
        ))}
        <Link to={`/pokemon-info/${pokemon.id}`} className='stretched-link'/>
      </div>)}
      
  </>);
};

export default PokemonCard;