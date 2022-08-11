import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingSpinner from './components/layouts/LoadingSpinner';
import BaseScreen from './screens/BaseScreen';

const HomeScreen = React.lazy(() => import('./screens/HomeScreen'));
const AboutScreen = React.lazy(() => import('./screens/AboutScreen'));
const NotFoundScreen = React.lazy(() => import('./screens/NotFoundScreen'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseScreen />}>
          <Route index element={
            <Suspense fallback={<LoadingSpinner />}>
              <HomeScreen />
            </Suspense>
          } />
          
          <Route path="/about" element={
            <Suspense fallback={<LoadingSpinner />}>
              <AboutScreen />
            </Suspense>
          } />
        </Route>
        <Route path="*" element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFoundScreen />
            </Suspense>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
