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


const event_system = new EventSystem();
const mqtt_server = new MQTTServer(event_system);


const router = createHashRouter([
  {
    path: "/",
    element: <App event_system={event_system} mqtt_server={mqtt_server}/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
