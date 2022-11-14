import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAxios = (urlToSearch) => {

    const [axiosData, setAxiosData] = useState([]);
    const [axiosIsLoading, setAxiosIsLoading] = useState(false);
    const [axiosError, setAxiosError] = useState("");

    useEffect(() => {

        const FetchData = async (urlToSearch) => {
            try {
                setAxiosIsLoading(true);
    
                const result = await axios({
                    method: 'get',
                    url: urlToSearch
                });
                setAxiosData(result.data.features);
                setAxiosIsLoading(false);
            } catch (err) {
                setAxiosError(err)
            } finally {
                setAxiosIsLoading(false)
            }
        }
        FetchData(urlToSearch);

    }, [urlToSearch,axiosData])

    return { axiosData, axiosIsLoading, axiosError }

}