import React, { Suspense , useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Link,
  Navigate,
} from 'react-router-dom';
import './styles/App.css';

const Home = React.lazy(() => import('./pages/Home'));
const Movies = React.lazy(() => import('./pages/Movies'));
const MovieDetails = React.lazy(() => import('./pages/MovieDetails'));
const Cast = React.lazy(() => import('./pages/Cast'));
const Reviews = React.lazy(() => import('./pages/Reviews'));

function App() {
  const [setSearchResults] = useState([]);

  return (
    <Router>
      <header>
        <nav>
          <ul className="header-tabs list">
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
        <Route path="movies" element={<Suspense fallback={<div>Loading...</div>}><Movies setSearchResults={setSearchResults} /></Suspense>} />
        <Route path="movies/:movieId" element={<Suspense fallback={<div>Loading...</div>}><MovieDetails /></Suspense>}>
          <Route index element={<Outlet />} />
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
