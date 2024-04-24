import './App.scss'
import { MQTTServer } from './mqtt/mqtt_server'
import { API, MQTTFrontModeOut } from './data/static_share_varaible'

function App() {
  const mqtt_server = new MQTTServer();

  return (
    <>
      <div className='button_group'>
        <button onClick={() => {
          mqtt_server.connect(API.MQTT_URL);
        }}>Connect to MQTT</button>

      <button onClick={() => {
          mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Idle);
      }}>Back to default setting</button>

      <button onClick={() => {
          mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Left_MCU_Read_Action);
        }}>Turn left</button>

      <button onClick={() => {
          mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Right_MCU_Read_Action);
        }}>Turn right</button>
      </div>
    </>
  )
}

export default App
