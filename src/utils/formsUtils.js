// verifies creditCard validity
function verifiesActualDate(month, year) {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    if (year < currentYear) {
        return false
    } else if (year === currentYear && month < currentMonth) {
        return false
    } else {
        return true
    }
}

// Format card Number
const formatedNumber = (value) => {
    const arrNumb = [];
    arrNumb.push(value.slice(0, 3), value.slice(3, 6), value.slice(6, 10));
    return arrNumb.join(" ");
};

// From the actual date, return an array with the next 10 years
const generateYears = () => {
    let years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i < currentYear + 8; i++) {
        years.push(i);
    }
    return years;
};

export const formsUtils = { verifiesActualDate, formatedNumber, generateYears } 