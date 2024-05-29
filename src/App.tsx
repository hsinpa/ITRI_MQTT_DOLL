import './assets/scss/App.scss'
import { MQTTServer } from './mqtt/mqtt_server'
import { API, MQTTFrontModeOut } from './data/static_share_varaible'
import EventSystem from './utility/EventSystem';
import test_video_source from './assets/video/test_video_source.webm';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import i18next from 'i18next';
import itri_logo from './assets/texture/sprite/itri-logo.png';

function App({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {

  return (
    <div id='app_page'>
      <div className='app_action_comp'>
        <img src={itri_logo}></img>
        <h1 className='title is-2 has-text-weight-bold'>{i18next.t('home_page_title')}</h1>
        <h3 className='subtitle is-3 has-text-weight-bold'>{i18next.t('home_page_subtitle')}</h3>
        <br></br>
        <div>
          <p>{i18next.t('email')}</p>
          <input className='input' type='email' placeholder='example@gmail.com'></input>

          <p>{i18next.t('password')}</p>
          <input className='input' type="password" placeholder='*******'></input>
        </div>
        <Link className='forget_password' to='/#forget_password'>{i18next.t('forget_password')}</Link>
        <Link className='button' to='/action_page'>{i18next.t('login')}</Link>
      </div>
    </div>
  )
}

export default App
