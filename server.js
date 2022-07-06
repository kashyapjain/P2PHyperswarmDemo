const { env } = require('process');

(async () => {
    const fs = require('fs');
    const readline = require('readline');
    const DHT = require('@hyperswarm/dht');
    let cons = [];

    const public = fs.readFileSync('public.key', null).toString();
    const private = fs.readFileSync('secret.key', null).toString();
    const publicKey = Buffer.from(public, 'hex');
    const privateKey = Buffer.from(private, 'hex');
    const keyPair = {
        publicKey: publicKey,
        secretKey: privateKey
    };

    const node = new DHT({ keyPair: keyPair });
    const server = node.createServer();
    await server.listen();
    console.log('Listening on ' + server.address().host + ':' + server.address().port + ' for incoming connections...');

    server.on('connection', function (noiseSocket) {
        console.log('A Client Connected...');
        r.prompt();
        cons.push(noiseSocket);
    });

    let r = readline.createInterface(process.stdin, process.stdout);
    r.setPrompt('>> ');
    r.prompt();
    r.on('line', async function (line) {
        if (line === 'exit') {
            send('Server Shutting Down...');
            await node.destroy()
            process.exit(0);
        }
        send(line);
        r.prompt();
    }).on('close', async function () {
        send('Server Shutting Down...');
        await node.destroy();
        process.exit(0);
    });

    function send(msg) {
        cons.forEach(con => {
            con.write(msg + '\n');
        });
    };
})();