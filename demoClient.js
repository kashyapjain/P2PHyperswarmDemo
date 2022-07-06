(async() => {
    const topic = Buffer.alloc(32).fill('hello world') // A topic must be 32 bytes

    const Hyperswarm = require('hyperswarm')

    //Client
    const clientswarm = new Hyperswarm()

    clientswarm.on('connection', (conn, info) => {
        conn.on('data', data => console.log('client got message:', data.toString()))
    })

    clientswarm.join(topic)

    await clientswarm.flush() // Waits for the swarm to connect to pending peers.
        // After this point, both client and server should have connections\
    clientswarm.peers.forEach(element => {
            element.write("For Each")
        })
        //======
})();