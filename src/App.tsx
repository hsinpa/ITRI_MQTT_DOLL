import './App.scss'
import { MQTTServer } from './mqtt/mqtt_server'
import { API, MQTTFrontModeOut } from './data/static_share_varaible'
import EventSystem from './utility/EventSystem';
import test_video_source from './assets/video/test_video_source.webm';

function App() {
  const event_system = new EventSystem();
  const mqtt_server = new MQTTServer(event_system);

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
      
      <video 
        id="my-video"
        className="video-js"
        controls
        preload="auto"
        width="640"
        height="264"><source src={test_video_source} type="video/webm" />
      </video>
    </>
  )
}

export default App
