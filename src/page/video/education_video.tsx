import { Link, useSearchParams } from "react-router-dom";
import { PageHeader } from "../page_header";
import '../../assets/scss/video_page.scss'
import EventSystem from "../../utility/EventSystem";
import { MQTTServer } from "../../mqtt/mqtt_server";
import { MQTTFrontModeOut } from "../../data/static_share_varaible";
import i18next from "i18next";
import { useEffect } from "react";
import { MQTT_Action_MQTT, MQTT_Material_Video, MaterialAudioPair, Material_Table } from "../../data/mqtt_action_table";
import {Howl, Howler} from 'howler';
import { AudioEventID, AudioEventValue } from "../../data/audio_static";

export const EducationVideoPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    let [searchParams, setSearchParams] = useSearchParams();
    let video_name = searchParams.get('name');
    let material_name = searchParams.get('material');

    if (video_name == null) video_name = "教學影片";
    if (material_name == null) material_name = Material_Table.roll_over;

    let to_address = `/action_validation?name=${video_name}`;
    let youtube_id = MQTT_Material_Video.get(material_name);
    let youtube_url = "https://www.youtube.com/embed/" + youtube_id;

    useEffect(() => {
        let mqtt_action = MQTT_Action_MQTT.get(video_name);
        if (mqtt_action == null) return;

        if (mqtt_action != null) mqtt_server.send(mqtt_server.get_mqtt_cmd(mqtt_action.id), 0);           

        // if (mqtt_action != null) mqtt_server.send(mqtt_server.get_mqtt_cmd(mqtt_action.id), mqtt_action.action_code);           
        
        event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event007_影片引導});

        // var sound = new Howl({
        //     src: ['audio_files/tw/0001_獨立模式啟動.mp3']
        //   });
        //   sound.play();
    }, []);

    return (
        <div id="video_page">
            <PageHeader title={i18next.t(video_name)}></PageHeader>

            <div className="video_content">

                <iframe src={youtube_url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}>
                </iframe>

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