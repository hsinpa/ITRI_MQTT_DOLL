import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import i18next from 'i18next'
import EventSystem from '../../utility/EventSystem'
import { MQTTServer } from '../../mqtt/mqtt_server'
import { useEffect, useState } from 'react'
import { DollIDList } from '../../data/static_share_varaible'
import { DollDropdown } from './doll_dropdown'
import { AudioEventID, AudioEventValue } from '../../data/audio_static'



export const ActionPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    const [client_id, set_client_id] = useState<string>(mqtt_server.client_id);

    useEffect(() => {
        mqtt_server.to_default();
    }, []);

    let on_dropdown_select = function(index: number) {
        let selected_id = DollIDList[index];

        mqtt_server.set_client_id(selected_id);
        set_client_id(selected_id);

        mqtt_server.reconnect();
    }

    return (
        <div id="action_page">
            <DollDropdown selected_option={client_id} options={DollIDList} select_callback={on_dropdown_select}></DollDropdown>

            <div className='action_comp'>
                <Link className='button' to='/material_page' onClick={() => event_system.Notify(AudioEventID.ID, AudioEventValue.Event003_培訓教材)}>{i18next.t('teaching_material')}</Link>
                <Link className='button' to='#'>{i18next.t('custom_material')}</Link>
            </div>
        </div>
    )
}