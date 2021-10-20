import axios from 'axios';

export class ExchangeService {
  getPrices = async () => {
    const coins = 'BTC,ETH';
    const apiKey = '53c009f8407e9682916557061cb86bd5c83007b2';
    try {
      let urlApi = `https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=${coins}&interval=1m&convert=USD&per-page=2&page=1`;
      const resp = await axios.get(urlApi);
      

      return {
        error: false,
        data: { btc: resp.data[0].price, eth: resp.data[1].price },
      };
    } catch (error) {
      return { error: true };
    }
  };
}

