import { Link } from "react-router-dom";

const Error = () => {
	return (
		<main className='error-main'>
			<h2>Cette page n'est pas disponible</h2>
			<Link to='/'>Suivre le lien pour retourner à l'acceuil</Link>
		</main>
	);
};

export default Error;
