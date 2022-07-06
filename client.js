(async () => {
    const DHT = require('@hyperswarm/dht');
    const node = new DHT();

    const noiseSocket = node.connect(Buffer.from('0c3610592c23a271513392289f51eed4ce222463f9692cd42134a2ca3a7ed54b', 'hex'));
    noiseSocket.on('open', function () {
        console.log('Connected To Server...');
        noiseSocket.on('data', (data) => {
            process.stdout.write('>> ' + data);
        });
    });
})();