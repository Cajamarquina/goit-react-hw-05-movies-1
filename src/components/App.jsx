import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
  Navigate,
} from 'react-router-dom';
import { FaVideo } from 'react-icons/fa';

import './styles/App.css';

const Home = React.lazy(() => import('./pages/Home'));
const Movies = React.lazy(() => import('./pages/Movies'));
const MovieDetails = React.lazy(() => import('./components/MovieDetails'));
const Cast = React.lazy(() => import('./components/Cast'));
const Reviews = React.lazy(() => import('./components/Reviews'));

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router basename="/goit-react-hw-05-movies">
      <header>
        <nav>
          <ul className="header-tabs list">
            <li>
              <Link to="/home">
                <span className="icon icon-hidden">
                  <FaVideo />
                </span>
                Home
              </Link>
            </li>
            <li>
              <Link to="/movies">
                <span className="icon icon-hidden">
                  <FaVideo />
                </span>
                Movies
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:movieId" element={<MovieDetails />}>
  <Route index element={<Outlet />} />
  <Route path="cast" element={<Cast />} />
  <Route path="reviews" element={<Reviews />} />
  </Route>

          <Route path="/movies" element={<Movies setSearchResults={setSearchResults} searchResults={searchResults} />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
  <Route index element={<Outlet />} />
  <Route path="cast" element={<Cast />} />
  <Route path="reviews" element={<Reviews />} />
  </Route>

          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}


export default App;
