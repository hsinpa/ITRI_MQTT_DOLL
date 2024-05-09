import { Link, useSearchParams } from "react-router-dom";
import { PageHeader } from "../page_header";
import '../../assets/scss/video_page.scss'
import EventSystem from "../../utility/EventSystem";
import { MQTTServer } from "../../mqtt/mqtt_server";
import { MQTTFrontModeOut } from "../../data/static_share_varaible";
import i18next from "i18next";
import { useEffect } from "react";
import { MQTT_Action_MQTT } from "../../data/mqtt_action_table";

export const EducationVideoPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    let [searchParams, setSearchParams] = useSearchParams();
    let video_name = searchParams.get('name');

    if (video_name == null) video_name = "教學影片";

    let to_address = `/action_validation?name=${video_name}`;
    
    useEffect(() => {
        let action_id = MQTT_Action_MQTT.get(video_name);
        if (action_id != null) mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTFrontModeOut.ID), action_id);            
    }, []);


    return (
        <div id="video_page">
            <PageHeader title={i18next.t(video_name)}></PageHeader>

            <div className="video_content">
                <iframe src="https://player.vimeo.com/video/941599033?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="test_video_source"></iframe>
            
                <script src="https://player.vimeo.com/api/player.js"></script>

                <div className="video_actions">
                    <Link to={to_address} className='button'>跳過</Link>

                    {/* <button className='button' onClick={() => {
                        mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Idle);
                    }}>Back to default setting</button>

                    <button className='button' onClick={() => {
                        mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Left_MCU_Read_Action);
                        }}>Turn left</button>

                    <button className='button' onClick={() => {
                        mqtt_server.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Right_MCU_Read_Action);
                        }}>Turn right</button> */}
                </div>
            </div>
        </div>
    )
}