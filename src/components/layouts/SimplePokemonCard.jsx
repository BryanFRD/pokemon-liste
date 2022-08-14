const SimplePokemonCard = ({children}) => {
  return (
    <div className="pokemon-card justify-content-center align-items-center img-thumbnail">
      {children}
    </div>
  );
};

export default SimplePokemonCard;