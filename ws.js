const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const ServiceApi = require('./service/serviceApi');
const emitter = require('./helpers/create-eventEmitter');

const ws = new WebSocket.Server({port: 9000});
const serviceApi = new ServiceApi();

const formatMoney = (currency) => {
    const localies = new Map()
        .set('RUB', 'ru-RU')
        .set('EUR', 'de-DE')
        .set('USD', 'en-US');

    return new Intl.NumberFormat(localies.get(currency), {
        maximumSignificantDigits: 2,
        style: 'currency',
        currency
    }).format(serviceApi[currency]);
}

emitter.on('findUser', (id) => {
    console.log("EVENT WORK");
    console.log('event: ' + id);

    ws.clients.forEach(item => {
        if (item._id === id) return item.send(JSON.stringify({
            RUB: formatMoney('RUB'),
            EUR: formatMoney('EUR'),
            USD: formatMoney('USD')
        }));
    })
})

ws.on('connection', (socket) => {
    const id = uuidv4();
    socket._id = id
    socket._isAlive = true;

    console.log(id);
    socket.send(JSON.stringify("Hello is server"))

    socket.on('pong', () => {
        socket._isAlive = true;
        // console.log("pong");
    });

    socket.on('message', (message) => {
        console.log(message);
    });

    socket.on('close', (event) => {
        // console.log(ws.clients);
        console.log('disconnected');
    });
});

const interval = setInterval(() => {
    ws.clients.forEach(function each(socket) {
        if (socket._isAlive === false) return socket.terminate() && ws.clients.delete(socket);
        socket._isAlive = false;
        socket.ping();
    });
}, 10000);