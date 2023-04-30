import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import socket from './socket';

function App() {
  const [message, setMessage] = useState("")
  const [recieved, setRecieved] = useState("No message yet")
  const [room, setRoom] = useState()
  const sendMessage = () => {
    try {

      socket.emit("send_message", { message: message, clientID: '6425772bba67d55d9c79271d', contID: '6425a00dad9c1f93f703053a' })
      console.log(message)

    } catch (err) {
      console.log(err)
    }
  }
  const joinRoom = () => {
    socket.emit("join_room", '6425772bba67d55d9c79271d_6425a00dad9c1f93f703053a')
  }
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setRecieved(data.message)
    })
  }, [socket])
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
      <div>{recieved}</div>
    </div>
  );
}

export default App;
