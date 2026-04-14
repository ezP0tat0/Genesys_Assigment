import { useState, useEffect } from "react";

export function useFetch(url)
{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>
    {
        const abortCont = new AbortController();

        const fetchData = async () =>
        {
            setLoading(true);
            try
            {
                const response = await fetch(url, {signal: abortCont.signal});
                if(!response.ok)
                {
                    throw Error('Could not fetch the data');
                }
                
                const result = await response.json();
                setData(result);
                setError(null);
                console.log(result);
            }
            catch(err)
            {
                if(err.name === 'AbortError')
                    console.log('Fetch aborted');
                else
                    setError(err.message);
            }
            finally
            {
                setLoading(false);
            }          
        };

        fetchData();

        return () => abortCont.abort();

    },[url]);

    return{data, loading, error};
}