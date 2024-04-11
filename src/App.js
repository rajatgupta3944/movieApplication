import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { useState } from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import { useEffect } from "react";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import MoviesLandingPage from "./components/MoviesLandingPage";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('react-movie-app-favourites')) || []);
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=9e52a107`
    const response = await fetch(url);
    const responseJSON = await response.json();
    if(responseJSON.Search){
      setMovies(responseJSON.Search);
    }
  }
  useEffect(() => {
    getMovieRequest(searchValue);
  },[searchValue])
  
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items))
  }
  const AddFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((fav) => fav.imdbID !== movie.imdbID)
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  return <div className="container-fluid movie-app">
    <div className="row d-flex align-tems-center mt-4 mb-4">
      <MovieListHeading heading="Movies" />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
    <div className="row">
      {movies.length > 0 ? <MovieList movies={movies}
      handleFavouritesClick={AddFavouriteMovie}
      favouriteComponent={AddFavourites}
      />
    : <MoviesLandingPage />
    }
    </div>
    <div className="row d-flex align-tems-center mt-4 mb-4">
      <MovieListHeading heading="Favourites" />
    </div>
    <div className="row">
      <MovieList movies={favourites}
      handleFavouritesClick={removeFavouriteMovie}
      favouriteComponent={RemoveFavourites }
      />
    </div>
  </div>;
}

export default App;
