// fixer.io    restcountries.eu


// http://data.fixer.io/api/latest?access_key=d1b90095d0b20832def727c348206e98
// https://restcountries.eu/rest/v2/currency/{currency}


/// get exchange rate *from* and *to* different currencies

const axios = require('axios');

// compare / contrast - non-async version
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

const getCountries = (currencyCode) =>
{
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) =>
  {
    return response.data.map((country)=> country.name);     // ES6 arrow abbreviation
  });
};

// compare / contrast - async version
const getExchangeRateAwait = async (from, to) =>
{
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=d1b90095d0b20832def727c348206e98');
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
    // fixer euro as default stadard currency
};


// --------------------------------------
getExchangeRate('USD','CAD').then((rate) =>
{
  console.log('non-async/await', rate);
});

getExchangeRateAwait('USD','CAD').then((rate) =>
{
  console.log('await', rate);
});

getCountries('EUR').then((countries) => {
  console.log(countries);
})
