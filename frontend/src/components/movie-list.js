import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {API} from '../api-service';
import {useCookies} from 'react-cookie';

function MovieList(props){

    const [token] = useCookies(['token']);

    const onMovieClick = movie => evt => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
        props.editMovie(movie);
    }

    const removeClicked = movie => {
        API.deleteMovie(movie.id, token['token'])
        .then( () => props.removeMovie(movie) )
        .catch(error => console.log(error))
    }

    return (
        <div>
            Movie List
            {props.movies && props.movies.map(movie => {
              return (
                  <div key={movie.id} className = {'Movie-Item'}>
                      <h2 className='Movie-title' onClick={onMovieClick(movie)}>{movie.title}</h2>
                      <FontAwesomeIcon icon={faEdit} onClick={()=>editClicked(movie)} className="Icons"/>
                      <FontAwesomeIcon icon={faTrash} onClick={()=>removeClicked(movie)} className="Icons"/>
                  </div>
              )
            })}
          </div>
    )    
}

export { MovieList };   