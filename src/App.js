/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

const handleRequest = async (movieIn, setMovies) => {
  const res = await fetch(`localhost:5000/recommend/${movieIn}`);
  const data = await res.json();
  setMovies(data);
};
const App = () => {
  const [movies, setMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    handleRequest(selectedMovie, setMovies);
  }, []);
  return (
    <div className="min-h-screen bg-slate-500 text-center text-white">
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
        <div
          className="flex-1 bg-slate-600 p-6 text-xl font-bold text-neutral-100"
          style={{
            background: 'url()',
          }}
        >
          <label htmlFor="movie-name" className="mb-4 block">
            Enter/Choose a movie name
          </label>
          <input
            type="text"
            id="movie-name"
            name="movie-name"
            placeholder="Avatar"
            className="rounded-full text-black focus:shadow-lg"
            onChange={(e) => setSelectedMovie(e.target.value)}
            value={selectedMovie}
          />
          <div className="mt-8 flex justify-center gap-8">
            {new Array(5).fill().map((i, idx) => (
              <div
                className="grid h-56 w-48 place-items-center overflow-hidden rounded-xl bg-blue-600 text-gray-300 shadow-2xl transition-all hover:scale-105"
                key={idx}
              >
                This is a movie box <br /> {selectedMovie}
              </div>
            ))}
          </div>
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
