import React, {useState, useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie'

function MovieForm(props){

    const [token] = useCookies(['token']);

    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')

    useEffect( () => {
        setTitle(props.movie.title)
        setGenre(props.movie.genre)
        setDescription(props.movie.description)
    }, [props.movie])

    const updateClicked = () =>{
        API.updateMovie(props.movie.id, {title, genre, description}, token['token'])
        .then( resp => props.updatedMovie(resp))
        .catch(error => console.log(error))
        console.log('movie updated')
    }

    const createClicked = () =>{
        API.createMovie({title, genre, description}, token['token'])
        .then( resp => props.createMovie(resp))
        .catch(error => console.log(error))
        console.log('movie created')
    }

    const isDisabled = title.length===0||description.length===0;

    return (
        <React.Fragment>
            {props.movie ? (
                <div>
                    <label htmlFor='title'>Title</label><br/>
                    <input id='title' type='text' placeholder='Title' value={title}
                        onChange={ evnt => setTitle(evnt.target.value)}/><br/>
                    <label htmlFor='genre'>Genre</label><br/>
                    <input id='genre' type='text' placeholder='Genre' value={genre}
                        onChange={evnt => setGenre(evnt.target.value)}/><br/>
                    <label htmlFor='description'>Description</label><br/>
                    <textarea id='description' type='text' placeholder='Description' value={description}
                        onChange={evnt => setDescription(evnt.target.value)}/><br/>
                    {
                        props.movie.id ? 
                        <button className='btn btn-outline-secondary' disabled={isDisabled} onClick={updateClicked}>Update</button> 
                        : <button className='btn btn-outline-primary' disabled={isDisabled} onClick={createClicked}>Create</button>
                    }   
                </div>
            ) : null}
        </React.Fragment>  
    )    
}

export {MovieForm};