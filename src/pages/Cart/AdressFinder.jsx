import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = "https://api-adresse.data.gouv.fr/search/?q=";

const AdressFinder = ({ adress, replaceAdressValue }) => {
	const [adressToFetch, setAdressToFetch] = useState(null);
	const [axiosData, setAxiosData] = useState([]);
	const [axiosIsLoading, setAxiosIsLoading] = useState(false);
	const [axiosError, setAxiosError] = useState(null);

	useEffect(() => {
		setAdressToFetch(
			`${apiUrl}+${adress
				.toLowerCase()
				.trimStart()
				.trimEnd()
				.replace(/ +/g, "+")}`
		);
		const FetchData = async (urlToSearch) => {
			try {
				setAxiosIsLoading(true);

				const result = await axios({
					method: "get",
					url: urlToSearch,
				});
				setAxiosData(result.data.features);
				setAxiosIsLoading(false);
				setAxiosError(null);
			} catch (err) {
				setAxiosError(err.message);
			} finally {
				setAxiosIsLoading(false);
			}
		};
		FetchData(adressToFetch);
	}, [adress, adressToFetch]);

  const addToInput = (e) => {
    replaceAdressValue(e.target.textContent)
  }

	const displayData = () => {
    if (axiosIsLoading) return <p>Loading...</p>
		if (axiosError !== null) {
			return <p>{axiosError}</p>;
		} else {
      if(axiosData.length > 1){
				 return axiosData.map((result, index) => {
					return <p key={index} onClick={(e) => addToInput(e)} className="address">{result.properties.label}</p>
				})
      }else return <p > 0 résultats à afficher</p>
		}
	};

	return (
		<>
			<div className='adress-finder'>{displayData()}</div>
		</>
	);
};

export default AdressFinder;
