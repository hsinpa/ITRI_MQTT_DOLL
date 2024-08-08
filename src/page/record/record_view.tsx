import i18next from "i18next"
import { PageHeader } from "../page_header"
import EventSystem from "../../utility/EventSystem"
import { MQTTServer } from "../../mqtt/mqtt_server"
import '../../assets/scss/record_page.scss'
import { LocalStorageSystem } from "../../mqtt/local_record_system"
import React, { useEffect, useState } from "react"
import { HistoryRecord } from "../../data/static_share_varaible"
import moment from "moment"
import { FormatString } from "../../utility/UtilityFunc"
import { AudioEventID, AudioEventValue } from "../../data/audio_static"
import { useNavigate } from "react-router-dom";
import { AccountInterface } from "../../data/api_static"


const Record_Row_View = function({record, user_info}: {record: HistoryRecord, user_info: AccountInterface | null}) {
    const [is_error_reveal, set_error_reveal] = useState(false);

    let error_msg = FormatString(i18next.t('record_error_message'), [record.errorPrompt.length]);
    let detail_error_msg = (<section>{record.errorPrompt.map( (x, i)=><p key={i}>{x}</p>)}</section>);

    let on_error_msg_click = function(x: React.FormEvent<HTMLTableCellElement>) {
        if (record.errorPrompt.length < 1) return;

        set_error_reveal(!is_error_reveal);
    }

    return (
    <tr>
        <td>{  user_info?.name }</td>
        <td>{ moment(new Date(record.time)).format("YYYY-MM-DD HH:mm")  }</td>
        <td>{ record.completeness == 100 ? i18next.t('record_complete') : i18next.t('record_non_complete')}</td>
        <td>{record.title}</td>
        <td className="error_msg" onClick={on_error_msg_click}>{is_error_reveal ? detail_error_msg : error_msg}</td>
        <td>{i18next.t('record_none')}</td>
    </tr>)
}

export const Record_View = function({event_system, mqtt_server, local_storage_sys}:
                                     {event_system: EventSystem, mqtt_server: MQTTServer, local_storage_sys: LocalStorageSystem}) {
    const navigate = useNavigate();
    const [records, setRecords] = useState<HistoryRecord[]>([]);
    const user_info = local_storage_sys.account.get_info();
    
    const fetch_records = async function() {        
        let sort_records = await local_storage_sys.get_records();
        console.log(sort_records)

        if (sort_records == null) {
            navigate('/');
            return;
        }
        sort_records = sort_records.sort(function(a,b){return new Date(Date.parse(a.time)) .getTime() - new Date(Date.parse(b.time)).getTime()})
        setRecords(sort_records);
    }

    useEffect(() => {
        fetch_records();
    }, []);

    return (
        <>
        <PageHeader title={i18next.t('record_page')} back_callback={() => {
                event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event051_請以遙控按鈕或平板介面進行操作, force_play: true});
                navigate('/action_page');
        }} ></PageHeader>

        <div id="record_page">
            <div className="container"> 
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                    <th>{i18next.t('record_user')}</th>
                    <th>{i18next.t('record_time')}</th>
                    <th>{i18next.t('record_completion')}</th>
                    <th>{i18next.t('record_material')}</th>
                    <th>{i18next.t('record_error')}</th>
                    <th>{i18next.t('record_note')}</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        records.reverse().map(x=> <Record_Row_View key={x.id} user_info={user_info} record={x}></Record_Row_View>)
                    }
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}