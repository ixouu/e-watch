import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<span>&#169; Julien Chanon</span>
			<span className="footer-disclamer">Les images de montres provienent et appartiennent du site <a href="http://1001-montres.fr/" target="_blank" rel="noreferrer">http://1001-montres.fr/</a></span>
		</footer>
	);
};

export default Footer; 
