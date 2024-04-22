import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MQTT_Server } from './mqtt/mqtt_server'

function App() {
  const mqtt_server = new MQTT_Server();

  return (
    <>
      <div>
        <button onClick={() => {
          mqtt_server.connect("wss://broker.mqttgo.io:8084/mqtt");
        }}>Connect to MQTT</button>
      </div>
    </>
  )
}

export default App
