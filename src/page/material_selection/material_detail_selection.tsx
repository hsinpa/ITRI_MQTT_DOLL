import { Link, useSearchParams } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import { PageHeader } from '../page_header'
import { MQTT_Action_Table, MaterialDetailsLookUp, Material_Table } from '../../data/mqtt_action_table';
import i18next from 'i18next';

export const MaterialDetailPage = function() {

    let [searchParams, setSearchParams] = useSearchParams();
    let material_name = searchParams.get('name');

    if (material_name == null) material_name = Material_Table.roll_over;

    let material_detail_list = MaterialDetailsLookUp.get(material_name);
    if (material_detail_list == null) material_detail_list = [];

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