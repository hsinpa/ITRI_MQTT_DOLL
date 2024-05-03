import './assets/scss/App.scss'
import { MQTTServer } from './mqtt/mqtt_server'
import { API, MQTTFrontModeOut } from './data/static_share_varaible'
import EventSystem from './utility/EventSystem';
import test_video_source from './assets/video/test_video_source.webm';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import i18next from 'i18next';

function App({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
  // mqtt_server.connect(API.MQTT_URL);


  return (
    <div id='app_page'>

      <div className='app_action_comp'>
        <h1 className='title is-1 has-text-weight-bold'>{i18next.t('home_page_title')}</h1>
        <h3 className='subtitle is-6 has-text-weight-bold'>{i18next.t('home_page_subtitle')}</h3>
        <Link className='button' to='/action_page'>{i18next.t('start')}</Link>
      </div>
      {/* <div className='button_group'>
        <button className='button' onClick={() => {
          mqtt_server.connect(API.MQTT_URL);
        }}>Connect to MQTT</button>

      <button className='button' onClick={() => {
          mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Idle);
      }}>Back to default setting</button>

      <button className='button' onClick={() => {
          mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Left_MCU_Read_Action);
        }}>Turn left</button>

      <button className='button' onClick={() => {
          mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Right_MCU_Read_Action);
        }}>Turn right</button>
      </div> */}
      
    </div>
  )
}

export default App
