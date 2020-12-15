import React, {useState, useEffect} from 'react';
import './App.css';
import { MovieList } from './components/movie-list';
import { MovieDetails } from './components/movie-details';
import { MovieForm } from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useFetchMovies } from './hooks/use-fetch'

function App() {
  // creating a hook
  const [movies, setMovies] = useState([]);

  const [token, deleteToken] = useCookies(['token']);

  // this component will remember which movie was selected.
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [editedMovie, setEditedMovie] = useState(null);

  const [data, loading, error] = useFetchMovies();

  // checking if the current user is authenticated or not. 
  // if no it will redirect the user to the login page.
  useEffect(() => {
    if(!token['token']) window.location.href = '/'
  }, [token])
  
  useEffect(()=>{
    setMovies(data);    
  }, [data])

  // arrow function that fetched the details of movie once the title of the movie is clicked.
  const movieClickAction = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  // arrow function that takes actions on the event of edit button is clicked
  const editMovieAction = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovieAction = movie => {
    const newMovies = movies.map( mov => {
      // looping through the list of movies and if same movie id is found then return it 
      // else update the movie list
      if (mov.id ===movie.id){
        return movie;
      }
      return mov
    })
    setMovies(newMovies)
  }

  const newMovie = () =>{
    setEditedMovie({title: '', genre: '', description: ''});
    setSelectedMovie(null);
  }

  const createMovieAction = movie =>{
    const newCreatedMovie = [...movies, movie]
    setMovies(newCreatedMovie);
  }

  // arrow function that takes actions on the event of delete button is clicked
  const deleteMovieAction = movie =>{
    const updatedMovieList = movies.filter(mov => mov.id !== movie.id)
    setMovies(updatedMovieList)
  }

  const logoutUser = () => {
    deleteToken(['token']);
    // window.location.href = '/'
  }

  if (loading) return <h1>Loading</h1>
  if (error) return <h1>Error loading movies: {error}</h1>
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} className="Icons"/>
          <span>Movie Rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} className="Icons" onClick={logoutUser}/>
      </header>
      
      <div className="Layout">
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={movieClickAction} 
            editMovie={editMovieAction} 
            removeMovie={deleteMovieAction}/>
          <button onClick={ newMovie } className='btn btn-success'>Add New Movie</button>
        </div>  

        <MovieDetails movie={selectedMovie} updateMovie={movieClickAction}/>
        { editedMovie ? <MovieForm movie={editedMovie} 
          updatedMovie={updatedMovieAction} 
          createMovie={createMovieAction}/> 
        : null}
      </div>

    </div>
  );
}

export default App;
