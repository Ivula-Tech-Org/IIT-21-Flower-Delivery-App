import io from 'socket.io-client'

const socket = io.connect("http://localhost:8000",{
    query:'token=124124912414'
})

export default socket