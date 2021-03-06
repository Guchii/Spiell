/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import './styles/select-styles.css';
import titles from './titles.json';

const validMovie = (movie) => true;
const backgroundLink =
  'https://images.unsplash.com/photo-1554298819-74ec8c6acac6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2hlcnJ5JTIwYmxvc3NvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&h=1080&w=1920&q=90';
const App = () => {
  const [movies, setMovies] = useState([1, 2, 3, 4, 5]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fetchMovies = async (movieIn) => {
    try {
      setLoaded(false);
      const res = await fetch(`http://127.0.0.1:5000/recommend/${movieIn}`);
      setMovies(await res.json());
      setLoaded(true);
    } catch {
      setError(true);
    }
  };
  const newTitles = titles.map((title) => {
    const movieObj = {
      name: title,
      value: title,
    };
    return movieObj;
  });
  return (
    <div
      className="min-h-screen bg-slate-500 text-center text-white antialiased"
      style={{
        background: `url(${backgroundLink})`,
      }}
    >
      <div
        className="mx-auto flex h-full w-full flex-col"
        style={{ maxWidth: '1400px' }}
      >
        <header className="bg-slate-700 py-8 shadow-xl">
          <h1 className="mb-4 block text-7xl font-bold uppercase">Spiell</h1>
          <p className="text-3xl text-gray-200">
            Content Based Movie Recommendation System
          </p>
        </header>
        <div className="flex-1 bg-slate-600 p-6 text-xl font-bold text-neutral-100">
          <label htmlFor="movie-name" className="mb-4 block">
            Enter/Choose a movie name
          </label>
          {/* <input
            type="text"
            id="movie-name"
            name="movie-name"
            placeholder="Avatar"
            className="rounded-full text-black focus:shadow-lg"
            onChange={(e) => {
              setSelectedMovie(e.target.value);
            }}
            maxLength={20}
            value={selectedMovie}
            onKeyDown={(e) => {
              setDisplay(true);
              if (e.key === 'Enter' && validMovie(selectedMovie)) {
                setError(false);
                setTimeout(() => fetchMovies(selectedMovie), 500);
                // fetchMovies(selectedMovie);
              }
            }}
          /> */}

          <div className="flex items-center justify-center gap-4 text-black">
            <SelectSearch
              // options2={[
              //   { name: 'Swedish', value: 'sv' },
              //   { name: 'English', value: 'en' },
              // ]}
              options={newTitles}
              search
              filterOptions={fuzzySearch}
              placeholder="Select your country"
              value={selectedMovie}
              onChange={setSelectedMovie}
            />
            <button
              type="button"
              className="rounded-xl bg-red-500 p-2 px-8 text-white hover:shadow-2xl"
              onClick={() => {
                if (validMovie(selectedMovie)) {
                  setError(false);
                  setTimeout(() => fetchMovies(selectedMovie), 500);
                }
              }}
            >
              Suggest
            </button>
          </div>
          {loaded && !error && (
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {movies.map((movie, idx) => (
                <div
                  className="grid h-56 w-48 place-items-center overflow-hidden rounded-xl bg-blue-600 p-4 text-gray-300 shadow-2xl transition-all hover:scale-105"
                  key={movie.title}
                >
                  {movie.title} <br /> {movie.id}
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="mt-8 grid h-48 place-items-center bg-red-400 text-5xl">
              An Error Occured.
            </div>
          )}
        </div>
        <footer className="bg-slate-800 p-8">
          Made by Shivom Srivastava, TV Anish & PC Bhaskar
          <span className="block">using React, Tailwind & Flask </span>
        </footer>
      </div>
    </div>
  );
};

export default App;
