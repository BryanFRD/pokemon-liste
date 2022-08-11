import { Outlet } from 'react-router-dom'
import NavBar from '../components/layouts/NavBar';

const BaseScreen = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer>
        
      </footer>
    </>
  );
}

export default BaseScreen;