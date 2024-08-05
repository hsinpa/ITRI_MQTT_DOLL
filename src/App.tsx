import './assets/scss/App.scss'
import { MQTTServer } from './mqtt/mqtt_server'
import { API, MQTTFrontModeOut } from './data/static_share_varaible'
import EventSystem from './utility/EventSystem';
import test_video_source from './assets/video/test_video_source.webm';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import i18next from 'i18next';
import itri_logo from './assets/texture/sprite/itri-logo.png';
import { AudioEventID, AudioEventValue } from './data/audio_static';
import { LoginPage } from './page/account/account_login';
import { AccountSystem } from './utility/AccountSystem';


function App({event_system, account_system, mqtt_server}: {event_system: EventSystem, account_system: AccountSystem, mqtt_server: MQTTServer}) {

  return (
    <div id='app_page'>
      <LoginPage  event_system={event_system} account_system={account_system}></LoginPage>
    </div>
  )
}

export default App
