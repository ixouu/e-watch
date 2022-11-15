import React from "react";

const Options = ({ options }) => {
	return (
		<>
			{options.map((option, index) => {
				return (
					<option
						key={index}
						value={option}
					>
						{option}
					</option>
				);
			})}
		</>
	);
};

export default Options;
