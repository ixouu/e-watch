const regExpList = {
        firstName: new RegExp('(^[a-zA-Zéè -]{2,20}$)'),
        lastName: new RegExp('(^[a-zA-Z -]{3,30}$)'),
        address: new RegExp('(^[a-zA-Z 0-9,-]{4,50}$)'),
        city: new RegExp('(^[a-zA-Zàéè -]{4,30}$)'),
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
        postalCode : new RegExp('([0-9]{5})'),
        creditCardNumber: new RegExp('[0-9]{10}'),
        creditCardName: new RegExp('(^[a-zA-Z -]{3,30}$)'),
        creditCardCvc: new RegExp('[0-9]{3}')
}

export default regExpList;