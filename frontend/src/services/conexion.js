import { useState, useEffect } from 'react';

export function useDatabaseList(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = () => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(`Está fallando, ${err}`);
                    setError(err);
                    setLoading(false);
                });
        };

        getData();
    }, [url]);

    
    return { data, loading, error };
}