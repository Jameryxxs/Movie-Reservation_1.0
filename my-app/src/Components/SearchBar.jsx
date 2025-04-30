import React, { useState, useEffect } from 'react';

const API_KEY = '9966a963c6f1fc2755816b7795357a8e';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (searchQuery, pageNum) => {
    if (!searchQuery) return;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      searchQuery
    )}&page=${pageNum}`;

    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results || []);
    setTotalPages(data.total_pages);
  };

  const handleSearch = () => {
    setPage(1); // reset to first page
    fetchMovies(query, 1);
  };

  useEffect(() => {
    if (query) {
      fetchMovies(query, page);
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎬 Movie Search App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-2 rounded">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="mb-2 rounded"
              />
            )}
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
          </div>
        ))}
      </div>

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
    </div>
  );
}

export default App;
