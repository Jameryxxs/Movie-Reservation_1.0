import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import 'swiper/css';

const API_KEY = '9966a963c6f1fc2755816b7795357a8e';

export default function MovieCarousel() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        if (!data.results) {
          throw new Error(data.status_message || 'No results found');
        }

        setMovies(data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleBuyTicket = (movie) => {
    alert(`Buying ticket for: ${movie.title}`);
  };

  const handleInfo = (movie) => {
    alert(`${movie.title}\n\n${movie.overview}`);
  };

  const handleTrailer = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    const trailer = data.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');

    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    } else {
      alert('Trailer not available.');
    }
  };

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="w-full"
    >
      {movies.map((movie, i) => (
        <SwiperSlide
          key={i}
          className="flex flex-col items-center bg-#02122E p-4"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-contain"
          />

          <div className="hero-button-group mt-4">
            <button className="icon-button" onClick={() => handleTrailer(movie)}>
              <FaPlay className="icon-lg" />
              <span>Trailer</span>
            </button>

            <button className="buy-button bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold" onClick={() => handleBuyTicket(movie)}>
              Buy Ticket
            </button>

            <button className="icon-button" onClick={() => handleInfo(movie)}>
              <FaInfoCircle className="icon-lg" />
              <span>Info</span>
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
