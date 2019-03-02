// fixer.io    restcountries.eu


// http://data.fixer.io/api/latest?access_key=d1b90095d0b20832def727c348206e98
// https://restcountries.eu/rest/v2/currency/{currency}



const axios = require('axios');

/// get exchange rate *from* and *to* different currencies
// compare / contrast - non-async/await version
const getExchangeRate = (from, to) =>
{
  return axios.get('http://data.fixer.io/api/latest?access_key=d1b90095d0b20832def727c348206e98')
  .then((response) =>
  {
    // fixer euro as default stadard currency
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate;
  });
};

/// get country info by use-of-currency-code
// compare / contrast - non-async/await version
const getCountries = (currencyCode) =>
{
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) =>
  {
    return response.data.map((country)=> country.name);     // ES6 arrow abbreviation
  });
};

/// currency conversion method
// compare / contrast - non-async/await version
const convertCurrency = (from, to, amount) =>
{
  let convertedAmount;      // variable at higher scope so as to be available in both chained .then blocks
  return getExchangeRate(from, to).then((rate) =>
  {
      // const convertedAmount = (amount * rate).toFixed(2);
      convertedAmount = (amount * rate).toFixed(2);
      // console.log('convertedAmount',convertedAmount);
      return getCountries(to);
  }).then((countries) =>
  {
    // console.log('countries: ',countries);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend this in the following countries: ${countries.join(', ')}`;
  });
};



/// get exchange rate *from* and *to* different currencies
// compare / contrast - async/await version
const getExchangeRateAsync = async (from, to) =>
{
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=d1b90095d0b20832def727c348206e98');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];
    // fixer euro as default standard currency

    if (isNaN(rate))
    {
      throw new Error();
    }
    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
  }
};


/// get country info by use-of-currency-code
// compare / contrast - async/await version
const getCountriesAsync = async (currencyCode) =>
{
  try
  {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country)=> country.name);     // ES6 arrow abbreviation
  }
  catch (e)
  {
    throw new Error(`Unable to get countries which d'use ${currencyCode}`);
  }
};


/// currency conversion method
// compare / contrast - async/await version
const convertCurrencyAsync = async (from, to, amount) =>
{
  let rate = await getExchangeRateAsync(from, to);
  convertedAmount = (amount * rate).toFixed(2);

  let countries = await getCountriesAsync(to);

  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend this in the following countries: ${countries.join(', ')}`;
}


// example 10-133
// const doWork = async() => { return 10;}
// const doWork = async() => { return myNumbers;}
// const doWork = async() => { const result = await add(12,13); return result;}
const doWork = async() =>
{
  try {
   const result = await add(12,13); return result;}
   catch (error)
   {
     return '10: default';
   }
 };

// const add = async (a, b) => a + b;    // ES6 arrow abbreviation
const add = async (a, b) => a + b + c;    // ES6 arrow abbreviation
// --------------------------------------
// getExchangeRate('USD','CAD').then((rate) =>
// {
//   console.log('non-async/await', rate);
// });
//
// getExchangeRateAsync('USD','CAD').then((rate) =>
// {
//   console.log('await', rate);
// });
//
// getCountries('EUR').then((countries) => {
//   console.log(countries);
// })
//
// getCountriesAsync('EUR').then((countries) => {
//   console.log(countries);
// })

// convertCurrency('USD','CAD',20);
console.log('non-async/await');
convertCurrency('USD','EUR',20).then((message) => {console.log(message)});
console.log('-------------------------------');   // interesting - this will print before both async methods' outputs (both promise based and async/await)
console.log('async/await');                       // interesting - this will print before both async methods' outputs (both promise based and async/await)
// convertCurrencyAsync('USD','EUR',20).then((message) => {console.log(message)});
convertCurrencyAsync('USD','CAD',20).then((message) => {console.log(message)}).catch((error) =>
{
  console.log(error.message);
});

doWork().then((data) => {console.log('doWork: ', data)}).catch((error) =>{ console.log('Something went wrong: ', error.message)});
