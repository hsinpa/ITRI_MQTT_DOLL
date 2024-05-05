import { Link, useSearchParams } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import { PageHeader } from '../page_header'
import { MQTT_Action_Name, MaterialDetailsLookUp, Material_Table } from '../../data/mqtt_action_table';
import i18next from 'i18next';
import EventSystem from '../../utility/EventSystem';
import { MQTTServer } from '../../mqtt/mqtt_server';
import { useEffect } from 'react';

export const MaterialDetailPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {

    let [searchParams, setSearchParams] = useSearchParams();
    let material_name = searchParams.get('name');

    if (material_name == null) material_name = Material_Table.roll_over;

    let material_detail_list = MaterialDetailsLookUp.get(material_name);
    if (material_detail_list == null) material_detail_list = [];
    
    useEffect(() => {
        mqtt_server.to_default();
    }, []);
    
    return (
        <>
        <PageHeader title={i18next.t(material_name)}></PageHeader>
        <div id="material_selection_page">
            <div className='material_selection_comp'>
                {
                    material_detail_list.map( (x, i)  => {
                        let to_address = `/education_video?name=${x}`;
                        return <Link className='button' to={to_address} key={i}>{i18next.t(x)}</Link>;
                    })
                }
            </div>
        </div>
        </>
    )
}