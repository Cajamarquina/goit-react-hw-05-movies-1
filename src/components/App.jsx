import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Link, Navigate } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Movies = React.lazy(() => import('./pages/Movies'));
const MovieDetails = React.lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('./pages/Cast'));
const Reviews = React.lazy(() => import('./pages/Reviews'));

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="movies">Movies</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route path="movies" element={<Suspense fallback={<div>Loading...</div>}><Movies /></Suspense>} />
        <Route path="movies/:movieId" element={<Suspense fallback={<div>Loading...</div>}><MovieDetails /></Suspense>}>
          <Route index element={<Outlet />} />
          <Route path="cast" element={<Suspense fallback={<div>Loading...</div>}><Cast /></Suspense>} />
          <Route path="reviews" element={<Suspense fallback={<div>Loading...</div>}><Reviews /></Suspense>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
