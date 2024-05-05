import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import i18next from 'i18next'
import EventSystem from '../../utility/EventSystem'
import { MQTTServer } from '../../mqtt/mqtt_server'
import { useEffect } from 'react'

export const ActionPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {

    useEffect(() => {
        mqtt_server.to_default();
    }, []);
    
    return (
        <div id="action_page">

            <div className='action_comp'>
                <Link className='button' to='/material_page'>{i18next.t('teaching_material')}</Link>
                <Link className='button' to='#'>{i18next.t('custom_material')}</Link>
            </div>
        </div>
    )
}