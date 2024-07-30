import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import { PageHeader } from '../page_header'
import i18next from 'i18next'
import { MaterialAudioPair, MaterialDetailsLookUp, Material_Table } from '../../data/mqtt_action_table'
import { MQTTServer } from '../../mqtt/mqtt_server'
import EventSystem from '../../utility/EventSystem'
import { Fragment, useEffect, useState } from 'react'
import { AudioEventID } from '../../data/audio_static'
import itri_logo from '../../assets/texture/sprite/itri-logo-02.png';
import itri_logo_02 from '../../assets/texture/sprite/afd_logo.png';

interface DetailMatInterface {
    id: string,
    enable: boolean
}


export const MaterialSelectionPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    
    let [detail_mat_state, set_detail_mat_state] = useState<DetailMatInterface>({id: Material_Table.roll_over, enable: false})

    useEffect(() => {
        mqtt_server.to_default();
    }, []);

    let on_mat_selection_click = function(e: any) {
        let id: string = e.target.dataset.id;

        if (detail_mat_state.id == id) {
            set_detail_mat_state({...detail_mat_state, enable: !detail_mat_state.enable});
            return;
        }

        set_detail_mat_state({id: id, enable: true});
    }

    const Render_detail_mat = function({id, mat_interface} : {id: string, mat_interface: DetailMatInterface}) {
       
        let child = <Fragment></Fragment>;
        let classname = 'button';
        let disable = false;



        let detail_mat_array = MaterialDetailsLookUp.get(id);
        let detail_mats_dom: JSX.Element[] = [];
        if (detail_mat_array != null) {
            for (let i = 0;i < detail_mat_array.length; i++) {
                let to_address = `/education_video?name=${detail_mat_array[i]}&material=${mat_interface.id}`;

                detail_mats_dom.push(
                    <Link className='button inner_btn' key={detail_mat_array[i]} to={to_address}
                    onClick={() => event_system.Notify(AudioEventID.ID, {audio: MaterialAudioPair.get(detail_mat_array[i])} ) }>
                        {i18next.t(detail_mat_array[i])}
                    </Link>
                );
            }
        }
        
        if (mat_interface.id == id && mat_interface.enable) {
            child = <div className='expand'>
                    {detail_mats_dom}
                </div>
        }

        if (mat_interface.id != id && mat_interface.enable) {
            classname += " grayout";
            disable = true;
        }
       
        return (
            <div>
                <button data-id={id} className={classname} onClick={on_mat_selection_click} disabled={disable}>{i18next.t(id)}</button>
                {child}
            </div>
        )
    }

    return (
        <>
        <PageHeader title={i18next.t('teaching_material')}></PageHeader>
        <div id="material_selection_page">
            <div className='material_selection_comp'>
                <Render_detail_mat id={Material_Table.roll_over} mat_interface={detail_mat_state}></Render_detail_mat>
                <Render_detail_mat id={Material_Table.pat_back} mat_interface={detail_mat_state}></Render_detail_mat>

                <Render_detail_mat id={Material_Table.wheelchair} mat_interface={detail_mat_state}></Render_detail_mat>
                <Render_detail_mat id={Material_Table.out_of_bed} mat_interface={detail_mat_state}></Render_detail_mat>

                <Render_detail_mat id={Material_Table.change_cloth} mat_interface={detail_mat_state}></Render_detail_mat>
                <Render_detail_mat id={Material_Table.cleaning} mat_interface={detail_mat_state}></Render_detail_mat>
            </div>

            <div className='icon_group'>
                <img src={itri_logo_02}></img>
                <img src={itri_logo}></img>
            </div>
        </div>
        </>
    )
}