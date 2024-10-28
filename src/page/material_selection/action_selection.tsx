import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import i18next from 'i18next'
import EventSystem from '../../utility/EventSystem'
import { MQTTServer } from '../../mqtt/mqtt_server'
import { useEffect, useState } from 'react'
import { DollIDList } from '../../data/static_share_varaible'
import { DollDropdown } from './doll_dropdown'
import { AudioEventID, AudioEventValue } from '../../data/audio_static'
import { LocalStorageSystem } from '../../mqtt/local_record_system'
import { AccountSystem } from '../../utility/AccountSystem'
import { useTempUserInfoStore } from '../../stores/user_stores'
import moment from 'moment'

export const ActionPage = function({event_system, mqtt_server, local_storage_sys}: 
    {event_system: EventSystem, mqtt_server: MQTTServer, local_storage_sys: LocalStorageSystem}) {
    const [client_id, set_client_id] = useState<string>(mqtt_server.client_id);
    let set_name = useTempUserInfoStore(x=>x.set_name);

    useEffect(() => {
        mqtt_server.to_default();

        // Set name
        let account_system = new AccountSystem();
        let account_interface = account_system.get_info();
        let default_user_name = (account_interface != null) ? account_interface.name: 'User';
        let date = new Date();
        default_user_name += " " + moment(date).format('YYYY-MM-DD HH:mm');
    
        set_name(default_user_name);
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
                <Link className='button' to='/material_page' onClick={() => event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event003_培訓教材})}>
                {i18next.t('teaching_material')}
                </Link>
                <Link className='button' to='#'>{i18next.t('custom_material')}</Link>
            </div>
        </div>
    )
}