import io from 'socket.io-client'

const socket = io.connect("http://localhost:8000",{
    query:'token=124124912414',
    path:'/chat_service'
})
const gsocket = io.connect("http://localhost:8000",{
    query:"token=234234",
    path:"/g_service"
})
export  {socket, gsocket}