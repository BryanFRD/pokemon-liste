import { Outlet } from 'react-router-dom'

const BaseScreen = () => {
  return (
    <div>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default BaseScreen;