import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { API } from '../api-service'


// creating custom hooks
function useFetchMovies(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [token] = useCookies(['token'])

    useEffect( () => {
        async function fetchData(){
            setLoading(true);
            setError();
            const data = await API.getMovies(token['token']).catch(errors => setError(errors))
            setData(data)
            setLoading(false)
        }
        fetchData();
    }, )
    return [data, loading, error]
}

export {useFetchMovies};