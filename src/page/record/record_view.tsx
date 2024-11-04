import i18next from "i18next"
import { PageHeader } from "../page_header"
import EventSystem from "../../utility/EventSystem"
import { MQTTServer } from "../../mqtt/mqtt_server"
import '../../assets/scss/record_page.scss'
import { LocalStorageSystem } from "../../mqtt/local_record_system"
import React, { useEffect, useState } from "react"
import { HistoryRecord } from "../../data/static_share_varaible"
import moment, { invalid } from "moment"
import { FormatString } from "../../utility/UtilityFunc"
import { AudioEventID, AudioEventValue } from "../../data/audio_static"
import { useNavigate } from "react-router-dom";
import { AccountInterface } from "../../data/api_static"
import { useTempUserInfoStore } from "../../stores/user_stores"


function get_date(date_str: string, foramting: string) {
    let date = new Date(date_str);
    date.setHours(date.getHours() + 8);
    let time_message = date_str;
    if (date instanceof Date && !isNaN(date.getMilliseconds())) {
        time_message = moment(date).format(foramting);
    }
    return time_message;
}

const Record_Row_View = function({record, user_info, local_storage_sys}: {record: HistoryRecord, user_info: AccountInterface | null, local_storage_sys: LocalStorageSystem}) {
    let time_message = get_date(record.time, "YYYY-MM-DD HH:mm");

    let user_name: string | undefined = user_info?.name + ' ' + get_date(record.time, "YYYY-MM-DD HH:mm");

    if (record.id != undefined)
        user_name = local_storage_sys.get_name(record.id, user_name);

    if (record.name != undefined)
        user_name = record.name;

    const [is_error_reveal, set_error_reveal] = useState(false);
    const [is_name_focus, set_name_focus] = useState(false);
    const [column_user_name, set_user_name] = useState(user_name);

    let error_msg = FormatString(i18next.t('record_error_message'), [record.errorPrompt.length]);
    let detail_error_msg = (<section>{record.errorPrompt.map( (x, i)=><p key={i}>{x}</p>)}</section>);

    let on_error_msg_click = function(x: React.FormEvent<HTMLTableCellElement>) {
        if (record.errorPrompt.length < 1) return;

        set_error_reveal(!is_error_reveal);
    }

    let remark_text = (record.remark != undefined && record.remark != '') ? record.remark : i18next.t('record_none');
    

    let on_name_column_click = function(event: React.MouseEvent<HTMLSpanElement>) {
        set_name_focus(true);
    }

    let on_name_column_blur = function(event: React.FocusEvent<HTMLInputElement>) {
        set_name_focus(false);
    }

    let on_name_column_change = function(event: React.FocusEvent<HTMLInputElement>) {
        let update_name = (event.target as HTMLInputElement).value;
        set_user_name(update_name);

        if (record.id != undefined)
            local_storage_sys.update_local_name(record.id, update_name);
    }

    let name_input_dom = <span onClick={on_name_column_click}>{column_user_name}</span>;
    if (is_name_focus) {
        name_input_dom = <input type='text' onChange={on_name_column_change} onBlur={on_name_column_blur} value={column_user_name} autoFocus={true}></input>
    }

    return (
    <tr>
        <td>{ name_input_dom }</td>
        <td>{ time_message  }</td>
        <td>{ record.completeness == 100 ? i18next.t('record_complete') : i18next.t('record_non_complete')}</td>
        <td>{record.title}</td>
        <td className="error_msg" onClick={on_error_msg_click}>{is_error_reveal ? detail_error_msg : error_msg}</td>
        <td>{remark_text}</td>
    </tr>)
}

export const Record_View = function({event_system, mqtt_server, local_storage_sys}:
                                     {event_system: EventSystem, mqtt_server: MQTTServer, local_storage_sys: LocalStorageSystem}) {
    const navigate = useNavigate();
    const [records, setRecords] = useState<HistoryRecord[]>([]);
    const user_info = local_storage_sys.account.get_info();

    const fetch_records = async function() {        
        let sort_records = await local_storage_sys.get_records();

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
                        records.reverse().map(x=> <Record_Row_View key={x.id} user_info={user_info} record={x} local_storage_sys={local_storage_sys}></Record_Row_View> )
                    }
                </tbody>
            </table>
            </div>
        </div>
        </>
    )
}