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
		if (adress.length >= 3) {
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
		}else return
	}, [adress, adressToFetch]);

	const pasteTheFoundAdress = (e) => {
		let address= e.target.textContent.split(" ")
		replaceAdressValue(address.slice(0, -2).join(" ").replace(',',' '), address.slice(-2)[0], address.slice(-1)[0]);
	};

	const displayData = () => {
		if (axiosIsLoading) return <p>Loading...</p>;
		if (axiosError !== null) {
			return <p>{axiosError}</p>;
		} else {
			if (axiosData.length > 1) {
				return axiosData.map((result, index) => {
					return (
						<p
							key={index}
							onClick={(e) => pasteTheFoundAdress(e)}
							className='address'
						>
							{result.properties.label}
						</p>
					);
				});
			} else return <p> Pas de résultats.</p>;
		}
	};

	return (
		<>
			<div className='adress-finder'>{displayData()}</div>
		</>
	);
};

export default AdressFinder;
