export const currencyExchange = (currencyName) =>{

    const someInfo = `${currencyName} Will be Exchanged`

    return (amount)=>{
            console.log(`${amount} ${someInfo}`)
    }
};

export const farenheitToCelsius = (value) => {

    return Math.round((value - 32) * (5/9));
} 
