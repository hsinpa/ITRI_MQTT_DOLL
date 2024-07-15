import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bulma/css/bulma.min.css'
import './assets/scss/global.scss'

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import EventSystem from './utility/EventSystem.ts';
import { MQTTServer } from './mqtt/mqtt_server.ts';
import { ActionPage } from './page/material_selection/action_selection.tsx';
import { MaterialSelectionPage } from './page/material_selection/material_selection.tsx';
import { MaterialDetailPage } from './page/material_selection/material_detail_selection.tsx';
import { EducationVideoPage } from './page/video/education_video.tsx';
import { API } from './data/static_share_varaible.ts';
import { ActionValidationPage } from './page/action_validation/action_validation.tsx';
import i18next from 'i18next';
import zh_tw_lang from './assets/language/zh_tw.json';
import AudioSystem from './utility/audio/AudioSystem.ts'
import { LoginRegister } from './page/account/account_register.tsx'

i18next.init({
  lng: 'zh_tw',
  fallbackLng: 'zh_tw',
  resources: {
    zh_tw: {
      translation: zh_tw_lang
    }
  }
});

const event_system = new EventSystem();
const audio_system = new AudioSystem(event_system);
const mqtt_server = new MQTTServer(event_system);
      mqtt_server.connect(API.MQTT_URL);

const router = createHashRouter([
  {
    path: "/",
    element: <App event_system={event_system} mqtt_server={mqtt_server}/>,
  },
  {
    path: "/register",
    element: <LoginRegister event_system={event_system}></LoginRegister>,
  },
  {
    path: "/action_page",
    element: <ActionPage event_system={event_system} mqtt_server={mqtt_server}/>,
  },
  {
    path: "/material_page",
    element: <MaterialSelectionPage event_system={event_system} mqtt_server={mqtt_server}/>,
  },
  {
    path: "/detail_page",
    element: <MaterialDetailPage event_system={event_system} mqtt_server={mqtt_server}/>,
  },
  {
    path: "/education_video",
    element: <EducationVideoPage event_system={event_system} mqtt_server={mqtt_server}/>,
  },
  {
    path: "/action_validation",
    element: <ActionValidationPage event_system={event_system} mqtt_server={mqtt_server}/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
)
