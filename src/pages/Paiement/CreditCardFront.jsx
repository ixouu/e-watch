
const CreditCardFront = () => {
  return (
    <div className='creditCardFront'>
        <div className="creditCardFront-circle_container">
            <div className="creditCardFront-circle_1"></div>
            <div className="creditCardFront-circle_2"></div>
        </div>
        <div className="creditCardFront-number"><span>0000 0000 0000 0000</span></div>
        <div className="creditCardFront-bottom">
            <div className="creditCardFront-name"><span>JOHN DOE</span></div>
            <div className="creditCardFront-validty"><span>00 </span><span> / </span><span>00</span></div>
        </div>
    </div>
  )
}

export default CreditCardFront