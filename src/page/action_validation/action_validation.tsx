import { Link, useSearchParams } from "react-router-dom";
import { MQTTServer } from "../../mqtt/mqtt_server";
import EventSystem from "../../utility/EventSystem";
import { PageHeader } from "../page_header";
import { ValidationComponent } from "./validation_component";
import '../../assets/scss/validation_page.scss';
import { MQTT_Action_MQTT, MQTT_Action_Validation, Validation_Type } from "../../data/mqtt_action_table";
import { useEffect, useState } from "react";
import i18next, { t } from "i18next";
import { MQTTFrontModeOut } from "../../data/static_share_varaible";
import { CancellationToken, Clamp, DoDelayAction } from "../../utility/UtilityFunc";

interface Validation_State_Result {
    index: number,
    score: number,
}

let register_event = function(event_system: EventSystem, mqtt_server: MQTTServer , validation_list: Validation_Type[] | undefined, callback: any) {
    if (validation_list == undefined) return;
    validation_list.forEach(x=> {
        x.validation_list.forEach(event_id => {
            //console.log('register_event ' + mqtt_server.get_mqtt_cmd(event_id));
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

let get_validation_state = function(target_validation_id: string, states: Validation_Type[], score_table: Map<string, number>, mqtt_server: MQTTServer): Validation_State_Result {
    for (let s_index = 0; s_index < states.length; s_index++) {
        let average_score = 0;
        let validation_list = states[s_index].validation_list.map(x => mqtt_server.get_mqtt_cmd(x));

        if (validation_list.findIndex((x) => x == target_validation_id) < 0) continue;

        for (let v_index = 0; v_index < validation_list.length; v_index++) {
            let validation_id = validation_list[v_index];
            let valid_score = score_table.get(validation_id);

            if (valid_score == undefined) continue;

            average_score += valid_score;
        }

        average_score /= validation_list.length;

        return {score: average_score, index: s_index};
    }

    return {score: 0, index: -1};
}

let cancellation_token: CancellationToken = {is_cancel: false};

export const ActionValidationPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    let [searchParams, setSearchParams] = useSearchParams();
    let material_name = searchParams.get('name');

    if (material_name == null) material_name = "動作判讀";
    let validation_list = MQTT_Action_Validation.get(material_name);
        validation_list = JSON.parse(JSON.stringify(validation_list));

    if (validation_list == null) validation_list = [];
    let validation_score_map = new Map<string, number>();
    
    const [validationState, setValidationState] = useState([...validation_list]);
    const [validationFulfilled, setValidationFulfilled] = useState(false);

    let on_message_event = function(event_id: string, message: Buffer) {
        let max_score = 3;
        let validation_result = get_validation_state(event_id, validationState, validation_score_map, mqtt_server);

        if (validation_result.index < 0) return;

        let score = parseFloat(message.toString());
            score = Clamp(score, 0, max_score);

        // If the quest is complete, than ignore
        if (validationState[validation_result.index].is_complete) {
            let previous_event_score = validation_score_map.get(event_id);

            if (previous_event_score != null && score < previous_event_score) {
                return;
            }
            
        }
        
        validation_score_map.set(event_id, score);
        validation_result = get_validation_state(event_id, validationState, validation_score_map, mqtt_server);
        
        validationState[validation_result.index].score = validation_result.score / max_score;
        validationState[validation_result.index].is_complete = Math.round(validation_result.score) >= 3;
        setValidationState([...validationState]);
    }

    let on_validation_debug_click = function(id: number) {
        validationState[id].is_complete = true;
        validationState[id].score = 1;
        setValidationState([...validationState])
    }

    let is_validations_fulfill = async function() {
        let sum = validationState.reduce( (accumulator, currentValue) => accumulator + ((currentValue.is_complete) ? 1 : 0), 0);
        
        // Finish
        if (sum >= validationState.length && !validationFulfilled) {
            setValidationFulfilled(true);
            
            console.log("Stage complete");

            await DoDelayAction(5000, cancellation_token);

            if (window.location.href.includes('action_validation'))
                window.location.href="#/action_page";
        }
    }

    useEffect(() => {
        console.log("ActionValidationPage");
        cancellation_token.is_cancel = false;
        register_event(event_system, mqtt_server, validationState, on_message_event)

        let action_id = MQTT_Action_MQTT.get(material_name);
        if (action_id != null) mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTFrontModeOut.ID), action_id);

        return () => {
          console.log("cleaned up");
          console.log(validation_list);
          cancellation_token.is_cancel = true;

          setValidationState([]);
          deregister_event(event_system, mqtt_server, validationState, on_message_event);
        };
    }, []);
    
    useEffect(() => {
        is_validations_fulfill();
    }, [validationState]);

    return (
        <div id="validation_page">
            <PageHeader title={i18next.t(material_name)}></PageHeader>

            <div className="validation_content">
            {
                validationState.map((x,i)=>{
                    return <ValidationComponent name={x.name} id={i} key={i}
                    on_click={on_validation_debug_click} 
                    is_success={x.is_complete}
                    progress={x.score}
                    ></ValidationComponent>
                })
            }

            {
                validationFulfilled && 
                <div className="complete_notification notification is-success">
                    {t("stage_complete")}
                </div>
            }
            </div>
        </div>
    );
}