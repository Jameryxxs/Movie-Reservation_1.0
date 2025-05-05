import React, { useState, useEffect } from 'react';

const API_KEY = '9966a963c6f1fc2755816b7795357a8e';

function App() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch genres on load
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      const data = await res.json();
      setGenres(data.genres || []);
    };
    fetchGenres();
  }, []);

  const fetchMovies = async (searchQuery, pageNum, selectedGenre) => {
    if (!searchQuery && !selectedGenre) return;

    let url = '';
    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${pageNum}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${pageNum}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results || []);
    setTotalPages(data.total_pages);
  };

  const handleSearch = () => {
    setPage(1);
    fetchMovies(query, 1, genre);
  };

  useEffect(() => {
    if (query || genre) {
      fetchMovies(query, page, genre);
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Movie Search App</h1>

      {/* Search Inputs */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded text-black flex-1"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="bg-gray-800 p-3 rounded shadow transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="mb-2 rounded transition duration-300 hover:brightness-110"
              />
            )}
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-1">{movie.release_date}</p>
            <p className="text-sm text-gray-300 mb-1">
              ⭐ {movie.vote_average} ({movie.vote_count} votes)
            </p>
            <p className="text-sm text-gray-200 line-clamp-3">{movie.overview}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {movies.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal Popup */}
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
            {selectedMovie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                className="rounded mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
            <p className="text-sm text-gray-400 mb-2">{selectedMovie.release_date}</p>
            <p className="text-sm text-gray-300 mb-2">
              ⭐ {selectedMovie.vote_average} ({selectedMovie.vote_count} votes)
            </p>
            <p className="text-sm">{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
