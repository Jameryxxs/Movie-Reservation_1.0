import React, { useState, useEffect, useRef } from 'react';

const API_KEY = '9966a963c6f1fc2755816b7795357a8e';

function Search() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [recentSearches, setRecentSearches] = useState(() => JSON.parse(localStorage.getItem('recentSearches')) || []);
  const [sortOption, setSortOption] = useState('popularity.desc');
  const observerRef = useRef();

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
      const data = await res.json();
      setGenres(data.genres || []);
    };
    fetchGenres();
  }, []);

  const fetchMovies = async (searchQuery, pageNum, selectedGenre, sortBy) => {
    if (!searchQuery && !selectedGenre) return;

    let url = '';
    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${pageNum}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&sort_by=${sortBy}&page=${pageNum}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (pageNum === 1) {
      setMovies(data.results || []);
    } else {
      setMovies((prev) => [...prev, ...(data.results || [])]);
    }
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query || genre) {
        setPage(1);
        fetchMovies(query, 1, genre, sortOption);
        if (query) {
          const updatedRecent = [query, ...recentSearches.filter(q => q !== query)].slice(0, 5);
          setRecentSearches(updatedRecent);
          localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
        }
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, genre, sortOption]);

  useEffect(() => {
    if (page > 1) fetchMovies(query, page, genre, sortOption);
  }, [page]);

  const handleFavorite = (movie) => {
    const isFavorite = favorites.find((m) => m.id === movie.id);
    let updated;
    if (isFavorite) {
      updated = favorites.filter((m) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const loadMoreRef = useRef();
  useEffect(() => {
    if (!loadMoreRef.current) return;
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    });
    observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current.disconnect();
  }, [movies, page, totalPages]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-xl font-serif italic">🎬 Movie Search App</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
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
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Latest</option>
        </select>
      </div>

      {recentSearches.length > 0 && (
        <div className="mb-4">
          <p className="mb-1 font-semibold">Recent Searches:</p>
          <div className="flex gap-2 flex-wrap">
            {recentSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(term)}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition-transform cursor-pointer"
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="mb-2 rounded"
              />
            )}
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-1">{movie.release_date}</p>
            <p className="text-sm text-gray-300 mb-1">
              ⭐ {movie.vote_average} ({movie.vote_count} votes)
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); handleFavorite(movie); }}
              className={`text-xs mt-2 px-2 py-1 rounded ${favorites.find(m => m.id === movie.id) ? 'bg-red-600' : 'bg-blue-600'}`}
            >
              {favorites.find(m => m.id === movie.id) ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-10"></div>

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

export default Search;
