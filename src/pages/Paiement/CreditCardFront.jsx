
import React, { useRef, useEffect } from "react";
const CreditCardFront = ({ paiementInformations }) => {

  const {creditCardNumber,creditCardName, creditCardExpirationMonth, creditCardExpriationYear} = paiementInformations

  const numRef = useRef(null);
  const nameRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(()=>{
    
    numRef.current.value = creditCardNumber;
    nameRef.current.value= creditCardName;
    monthRef.current.value= creditCardExpirationMonth;
    yearRef.current.value= creditCardExpriationYear;
  },[creditCardNumber,creditCardName, creditCardExpirationMonth, creditCardExpriationYear])

  return (
    <div className='creditCardFront'>
        <div className="creditCardFront-circle_container">
            <div className="creditCardFront-circle_1"></div>
            <div className="creditCardFront-circle_2"></div>
        </div>
        <div className="creditCardFront-number"><span ref={numRef}>{creditCardNumber}</span></div>
        <div className="creditCardFront-bottom">
            <div className="creditCardFront-name"><span ref={nameRef}>{creditCardName}</span></div>
            <div className="creditCardFront-validty"><span ref={monthRef}>{creditCardExpirationMonth}</span><span> / </span><span ref={yearRef}>{creditCardExpriationYear}</span></div>
        </div>
    </div>
  )
}

export default CreditCardFront