import { useState, useEffect } from 'react';
import axios from 'axios';

export const UseAxios = () =>{

    const [axiosData, setAxiosData] = useState();
    const [axiosIsLoading, setAxiosIsLoading] = useState(false);
    const [axiosUrl, setAxiosUrl] = useState("")
    const [axiosError, setAxiosError] = useState("");

    useEffect(() =>{
        const fetchData = async() =>{
            if (axiosUrl !== ""){
                try{
                setAxiosIsLoading(true);
                
                const result = await  axios(axiosUrl);
                setAxiosData(result);
                setAxiosIsLoading(false);
            }catch(err){
                setAxiosError(err)
            }
            }
            else setAxiosData(undefined);
        }
        fetchData();
    },[axiosUrl])

    return {axiosData, axiosIsLoading, setAxiosUrl, axiosError}

}