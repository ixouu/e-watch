import React, { useEffect, useState } from 'react';
import { client } from "../lib/client";

const query = '*[_type == "product"]';

export const useData = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await client.fetch(query)
                setData(result)
                setIsLoading(false);
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();
    }, []);

    return { isLoading, data, error };

}
