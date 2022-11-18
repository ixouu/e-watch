import React, { useRef, useEffect } from "react";

const CreditCardBack = ({ paiementInformations }) => {
	const cvcRef = useRef(null);

	useEffect(() => {
		cvcRef.current.value = paiementInformations.creditCardCvc;
	}, [paiementInformations.creditCardCvc]);

	return (
		<div className='creditCardBack'>
			<div className='creditCardBack-band'></div>
			<div className='creditCardBack-cvc_container'>
				<div className='creditCardBack-cvc'>
					<span ref={cvcRef}>
						{paiementInformations.creditCardCvc}
					</span>
				</div>
			</div>
			<div className='creditCardBack-phantom_container'>
				<div className='ccp ccp1'></div>
				<div className='ccp ccp2'></div>
				<div className='ccp ccp3'></div>
				<div className='ccp ccp4'></div>
				<div className='ccp ccp5'></div>
				<div className='ccp ccp6'></div>
				<div className='ccp ccp7'></div>
				<div className='ccp ccp8'></div>
				<div className='ccp ccp9'></div>
				<div className='ccp ccp10'></div>
				<div className='ccp ccp11'></div>
				<div className='ccp ccp12'></div>
				<div className='ccp ccp13'></div>
				<div className='ccp ccp14'></div>
			</div>
		</div>
	);
};

export default CreditCardBack;
