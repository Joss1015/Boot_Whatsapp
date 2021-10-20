import schedule from 'node-schedule';
import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';
import { ExchangeService } from './exchange_service';

const client = new Client({
  puppeteer: {
    timeout: 30000,
  },
});

client.on('qr', (qr: any) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
  const job = schedule.scheduleJob('* /5 * * * *', async function () {
    const exchangeService = new ExchangeService();
    const result = await exchangeService.getPrices();
    if (!result.error) {
      client.sendMessage('50684687044@c.us', 'BTC Price is:' + result?.data?.btc);
    }
  });
});

client.on('message', async (message: any) => {
  console.log(message.body);
  if (message?.body?.toLowerCase() === 'btc') {
    const exchangeService = new ExchangeService();
    const result = await exchangeService.getPrices();
    if (!result.error) {
      client.sendMessage(message.from, 'BTC Price is:' + result?.data?.btc);
    } else {
      client.sendMessage(message.from, 'Welcome, for get BTC price send only term "btc" without quotes.');
    }
  }
});

client.initialize();
