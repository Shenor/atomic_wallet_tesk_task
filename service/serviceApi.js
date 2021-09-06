const axios = require('axios').default;
const api = axios.create({
    baseURL: 'https://min-api.cryptocompare.com/data/'
})

class ServiceApi {
    constructor(){
        this.scheduleGet();
    }

    EUR=null;
    USD=null;
    RUB=null;

    async getBTC(){
        const {data} = await api.get('/price?fsym=BTC&tsyms=EUR,USD,RUB')
        // console.log(data);
        return data;
    }

    async scheduleGet(){
        const {EUR, USD, RUB} = await this.getBTC();
        this.EUR = EUR;
        this.USD = USD;
        this.RUB = RUB;
        await new Promise(resolve => setTimeout(resolve, 1000 * 60));
        this.scheduleGet();
    }
}

module.exports = ServiceApi;