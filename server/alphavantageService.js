import fetch from "node-fetch";

const API_KEY = process.env.ALPHAVANTAGE_API_KEY
class AlphavantageService {
    getStockTimeSeriesDaily(coin_name) {
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${coin_name}&apikey=${API_KEY}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return Stock_to_GraphQLSchema(data['Time Series (Daily)']);
            });
    }

    getStockTimeSeriesWeekly(coin_name) {
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${coin_name}&apikey=${API_KEY}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return Stock_to_GraphQLSchema(data['Weekly Adjusted Time Series']);
            });
    }

    getStockTimeSeriesMonthly(coin_name) {
        return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${coin_name}&apikey=${API_KEY}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return Stock_to_GraphQLSchema(data['Monthly Adjusted Time Series']);
            });
    }


    //  market
    getCryptoTimeSeriesDaily(coin_name) {
        return fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${coin_name}&market=USD&apikey=${API_KEY}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return Cryptocurrency_to_GraphQLSchema(data['Time Series (Digital Currency Daily)']);
            });
    }

    getCryptoTimeSeriesWeekly(coin_name) {
        return fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${coin_name}&market=USD&apikey=${API_KEY}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return Cryptocurrency_to_GraphQLSchema(data['Time Series (Digital Currency Weekly)']);
            });
    }

    getCryptoTimeSeriesMonthly(coin_name) {
        return fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${coin_name}&market=USD&apikey=${API_KEY}`)
            .then((response) => {
                return response.json();
            }).then((data) => {
                return Cryptocurrency_to_GraphQLSchema(data['Time Series (Digital Currency Monthly)']);
            });
    }
}

function Stock_to_GraphQLSchema(data) {
    const keysValue = Object.keys(data);
    let value = [];
    for (let key in keysValue) {
        value.push({
            date: keysValue[key],
            open: data[keysValue[key]]['1. open'],
            high: data[keysValue[key]]['2. high'],
            low: data[keysValue[key]]['3. low'],
            close: data[keysValue[key]]['4. close'],
            adjusted_close: data[keysValue[key]]['5. adjusted close'],
            volume: data[keysValue[key]]['6. volume'],
            dividend_amount: data[keysValue[key]]['7. dividend amount']
        })

    }
    return value;
}

// nerabotaet)
function Cryptocurrency_to_GraphQLSchema(data) {
    const keysValue = Object.keys(data);
    let value = [];
    for (let key in keysValue) {
        value.push({
            date: keysValue[key],
            open: data[keysValue[key]]['1a. open (USD)'],
            high: data[keysValue[key]]['2a. high (USD)'],
            low: data[keysValue[key]]['3a. low (USD)'],
            close: data[keysValue[key]]['4a. close (USD)'],
            volume: data[keysValue[key]]['5. volume'],
        })

    }
    return value;
}


export default new AlphavantageService();