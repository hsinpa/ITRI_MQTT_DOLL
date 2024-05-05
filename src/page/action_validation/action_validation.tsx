import { Link, useSearchParams } from "react-router-dom";
import { MQTTServer } from "../../mqtt/mqtt_server";
import EventSystem from "../../utility/EventSystem";
import { PageHeader } from "../page_header";
import { ValidationComponent } from "./validation_component";
import '../../assets/scss/validation_page.scss';
import { MQTT_Action_MQTT, MQTT_Action_Validation, Validation_Type } from "../../data/mqtt_action_table";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { MQTTFrontModeOut } from "../../data/static_share_varaible";


let register_event = function(event_system: EventSystem, mqtt_server: MQTTServer , validation_list: Validation_Type[] | undefined, callback: any) {
    if (validation_list == undefined) return;
    validation_list.forEach(x=> {
        x.validation_list.forEach(event_id => {
            console.log('register_event ' + event_id);
            event_system.ListenToEvent(mqtt_server.get_mqtt_cmd(event_id), callback);
        });  
    });
}

let deregister_event = function(event_system: EventSystem, mqtt_server: MQTTServer, validation_list: Validation_Type[] | undefined, callback: any) {
    if (validation_list == undefined) return;
    validation_list.forEach(x=> {
        x.validation_list.forEach(event_id => {
            event_system.Deregister(event_id, callback);
        });  
    });
}

export const ActionValidationPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    let [searchParams, setSearchParams] = useSearchParams();
    let material_name = searchParams.get('name');

    if (material_name == null) material_name = "動作判讀";
    let validation_list = MQTT_Action_Validation.get(material_name);
    if (validation_list == null) validation_list = [];

    console.log(validation_list)

    const [validationState, setValidationState] = useState([...validation_list]);

    let on_message_event = function(message: string) {
        console.log("ActionValidationPage " + message);
    }


    useEffect(() => {
        console.log("ActionValidationPage");
        register_event(event_system, mqtt_server, validation_list, on_message_event)

        let action_id = MQTT_Action_MQTT.get(material_name);
        if (action_id != null) mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTFrontModeOut.ID), action_id);

        return () => {
          console.log("cleaned up");
          deregister_event(event_system, mqtt_server, validation_list, on_message_event);
        };
    }, []);
    


    return (
        <div id="validation_page">
            <PageHeader title={i18next.t(material_name)}></PageHeader>

            <div className="validation_content">

            {
                validationState.map((x,i)=>{
                    return  <ValidationComponent name={x.name} id={x.name} key={i} is_sucess={x.is_complete}></ValidationComponent>
                })
            }
            </div>
        </div>
    );
}