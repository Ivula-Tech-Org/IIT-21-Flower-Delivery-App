import io from 'socket.io-client'

const socket = io.connect("http://rumaretreat.org/anotherServer/",{
    query:'token=124124912414'
})

export default socket