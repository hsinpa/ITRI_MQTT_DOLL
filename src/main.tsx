import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bulma/css/bulma.min.css'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import EventSystem from './utility/EventSystem.ts';
import { MQTTServer } from './mqtt/mqtt_server.ts';
import { ActionPage } from './page/material_selection/action_selection.tsx';
import { MaterialSelectionPage } from './page/material_selection/material_selection.tsx';
import { EducationVideoPage } from './page/video/education_video.tsx';
import { API } from './data/static_share_varaible.ts';

const event_system = new EventSystem();
const mqtt_server = new MQTTServer(event_system);
      mqtt_server.connect(API.MQTT_URL);

const router = createHashRouter([
  {
    path: "/",
    element: <App event_system={event_system} mqtt_server={mqtt_server}/>,
  },
  {
    path: "/action_page",
    element: <ActionPage/>,
  },
  {
    path: "/material_page",
    element: <MaterialSelectionPage/>,
  },

  {
    path: "/education_video",
    element: <EducationVideoPage event_system={event_system} mqtt_server={mqtt_server}/>,
  },]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
