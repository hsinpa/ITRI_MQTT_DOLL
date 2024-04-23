import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MQTTServer } from './mqtt/mqtt_server'
import { API } from './data/static_config'

function App() {
  const mqtt_server = new MQTTServer();

  return (
    <>
      <div>
        <button onClick={() => {
          mqtt_server.connect(API.MQTT_URL);

          

        }}>Connect to MQTT</button>

      <button onClick={() => {
          mqtt_server.send();
        }}>Send empty message</button>

      </div>
    </>
  )
}

export default App
