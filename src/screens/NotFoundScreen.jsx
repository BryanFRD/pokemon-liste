import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
  return (
    <div className="bg-dark text-secondary d-flex vh-100 justify-content-center align-items-center flex-column">
      <h1 className="text-danger">Erreur 404</h1>
      <h4>Cette page n'existe pas !</h4>
      <Link to="/" className="btn btn-lg btn-outline-secondary mt-5">Accueil</Link>
    </div>
  );
}

export default NotFoundScreen;