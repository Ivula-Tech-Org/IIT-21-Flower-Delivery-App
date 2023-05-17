import io from 'socket.io-client'

const socket = io.connect("https://iit-21-flower-delivery-app-mcshelton.onrender.com/",{
    query:'token=124124912414'
})

export default socket