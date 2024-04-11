import React from 'react'
import MoviesLandingPage from './MoviesLandingPage';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent; 
  return (
    <div className='d-flex flex-wrap m-3'>{
        props.movies.map((movie, index) => (
            <div className="image-container d-flex justify-content-start m-3">
                <img src={movie.Poster} alt="movie" className='custom-images' />
                <div onClick={()=>props.handleFavouritesClick(movie)}
                className="overlay d-flex align-items-center justify-content-center"
                >
                    {props.favouriteComponent ? <FavouriteComponent /> : <span>Add your favourites</span>}
                </div>
            </div>
        ))
    }</div>
  )
}

export default MovieList