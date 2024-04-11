import React from 'react'

const MovieListHeading = (props) => {
  return (
    <div className='col'>
        <h4>
            {props.heading}
        </h4>
    </div>
  )
}

export default MovieListHeading