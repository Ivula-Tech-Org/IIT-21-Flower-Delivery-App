import './App.css';
import { useEffect, useState } from 'react'
import { socket, gsocket } from './socket';

function App() {
  const [message, setMessage] = useState("")
  const [recieved, setRecieved] = useState("No message yet")
  const [room, setRoom] = useState()
  const [allMessagees, setAllMessages] = useState()
  const [location, setLocation] = useState({ latitude: null, longitude: null })


  const sendMessage = () => {
    try {

      socket.emit("send_message", { message: message, clientID: '6425772bba67d55d9c79271d', contID: '6425a00dad9c1f93f703053a' })
      console.log(message)

    } catch (err) {
      console.log(err)
    }
  }
  const joinRoom = () => {
    socket.emit("join_room", { clientID: '6425772bba67d55d9c79271d', contID: '6425a00dad9c1f93f703053a' })
  }
  const trackOrder = () => {
    gsocket.emit("g_room", { list: 'asdfaf', rand: "kj;lk" })
  }
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setRecieved(data.message)
    })
    socket.on("all_messages", (data) => {
      setAllMessages(data)
      console.log(data)
    })
  }, [socket])

  useEffect(() => {
    console.log('changed')
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.log(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
      return ()=>{
        navigator.geolocation.clearWatch(id)
      }
    } else {
      console.log('There is no location')
    }

  },[])
  return (

    <div className="App">
      <div style={{ height: 200 }}></div>
      <input placeholder="message" onChange={(event) => {
        setMessage(event.target.value)
      }}></input>
      <button onClick={sendMessage}>Send message</button>

      <input placeholder="room" onChange={(event) => {
        setRoom(event.target.value)
      }}></input>
      <button onClick={joinRoom}>join room</button>
      <button onClick={trackOrder}>track</button>
      <div>{recieved}</div>
      <div>latitude : {location.latitude}</div>
      <div>longitude : {location.longitude}</div>
    </div>
  );
}

export default App;
