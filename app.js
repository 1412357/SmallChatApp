let server = require('ws').Server;
let s = new server({port: 5001});

const sendName = 100;
const sendMeg = 200;

let clients = {};

s.on('connection', function(ws) {
    ws.on('message', function(message) {
        let data = JSON.parse(message);
        if (data.code == sendName) {
            let owner = data.name;
            clients[owner] = ws;
            console.log("connected");
        }
        else {
            let {to, content} = data;
            clients[to].send(message);
        }
    })
})