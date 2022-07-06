(async() => {
    const topic = Buffer.alloc(32).fill('hello world') // A topic must be 32 bytes

    const Hyperswarm = require('hyperswarm')

    let cons = [];

    // Server
    const swarm = new Hyperswarm()

    swarm.on('connection', (conn, info) => {
        // swarm will receive server connections
        console.log('Peer Connected')
        conn.on('data', data => console.log('Peer Messaged:', data.toString()))
        cons.push(conn)

        conn.on('end', () => {
            cons.pop(conn)

            console.log("Peer Disconnected")
        })
    })

    swarm.join(topic) // Waits for the topic to be fully announced on the DHT
        //discovery.write("From Server

    await swarm.flush()

    console.log("This Peer Is Online")
    console.log(swarm.peers)

    // setInterval(() => {
    //     cons.forEach(element => {
    //         element.write("Testing")
    //     })
    // }, 500);
    //======
})();