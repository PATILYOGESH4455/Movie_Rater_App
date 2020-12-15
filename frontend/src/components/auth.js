import React, {useState, useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie'

function Auth(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoginView, setIsLoginView] = useState(true);
    
    const [token, setToken] = useCookies(['token']);

    // checking if the current user is authenticated or not. 
    // if yes it will redirect the user to the movies page.
    useEffect( () => {
        if(token['token']) window.location.href = '/movies';
    }, [token])

    const loginClicked = () => {
        API.loginUser({username, password})
        .then(resp => setToken('token', resp.token))
        .catch(error => console.log(error))
    }

    // registering the user and logging-in automatically if the user is registered
    const registerClicked = () => {
        API.registerUser({username, password})
        .then(() => loginClicked())
        .catch(error => console.log(error))
    }

    const isDisabled = username.length===0||password.length===0;

    return (
        <div className='App'>
            <header className="App-header">
                {isLoginView ? <h1>Login</h1>: <h1>Register</h1>}
            </header>
            <div className='Login-container'>
                <input id='username' type='text' placeholder='Username' 
                value={username} onChange={evnt => setUsername(evnt.target.value)}/><br/>
                
                <input id='password' type='password' placeholder='Password' 
                value={password} onChange={evnt => setPassword(evnt.target.value)}/><br/>
                
                {isLoginView ? 
                <button disabled={isDisabled} className='btn btn-outline-primary Login-items' onClick={loginClicked}>Login</button>
                : <button disabled={isDisabled} className='btn btn-outline-primary Login-items' onClick={registerClicked}>Register</button>}
                
                {isLoginView ?
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <p>Don't have an account? Register <a href='#' onClick={()=> setIsLoginView(false)}>here</a>.</p> 
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                : <p>Already have an account? Login <a href='#' onClick={()=> setIsLoginView(true)}>here</a>.</p>}
            </div>      
        </div>
    )
}

export {Auth}