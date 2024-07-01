import { Link, useSearchParams } from "react-router-dom";
import { MQTTServer } from "../../mqtt/mqtt_server";
import EventSystem from "../../utility/EventSystem";
import { PageHeader } from "../page_header";
import { ValidationComponent } from "./validation_component";
import '../../assets/scss/validation_page.scss';
import { MQTT_Action_MQTT, MQTT_Action_Validation, Validation_Score } from "../../data/mqtt_action_table";
import { useEffect, useState } from "react";
import i18next, { t } from "i18next";
import { MQTTFrontModeOut } from "../../data/static_share_varaible";
import { CancellationToken, Clamp, DoDelayAction, FormatString } from "../../utility/UtilityFunc";
import { MQTT_Action_Rules, Rule_Type } from "../../data/mqtt_action_rules";
import { process_msg_event, rule_matching } from "./validation_utility";
import { useUserInfoStore } from "./validation_zusland";
import exclamation_icon from '../../assets/texture/sprite/exclamation.svg';

interface Validation_State_Result {
    index: number,
    score: number,
}

let local_val_state = '';

let register_event = function(event_system: EventSystem, mqtt_server: MQTTServer , validation_list: Validation_Score[] | undefined, callback: any) {
    if (validation_list == undefined) return;
    validation_list.forEach(x=> {
        x.validation_list.forEach(event_id => {
            event_system.ListenToEvent(mqtt_server.get_mqtt_cmd(event_id), callback);
        });  
    });
}

let deregister_event = function(event_system: EventSystem, mqtt_server: MQTTServer, validation_list: Validation_Score[] | undefined) {
    if (validation_list == undefined) return;
    validation_list.forEach(x=> {
        x.validation_list.forEach(event_id => {
            event_system.Deregister(mqtt_server.get_mqtt_cmd(event_id));
        });  
    });
}

let get_validation_scores = function(target_validation_id: string, scores: Validation_Score[], 
    score_table: Map<string, number>, mqtt_server: MQTTServer): Validation_State_Result {

    for (let s_index = 0; s_index < scores.length; s_index++) {

        let validation_list = scores[s_index].validation_list.map(x => mqtt_server.get_mqtt_cmd(x));
        
        if (validation_list.findIndex((x) => x == target_validation_id) < 0) continue;
        let min_score = score_table.get(validation_list[0]);
        if (min_score == null) min_score = 0;

        for (let v_index = 0; v_index < validation_list.length; v_index++) {
            let validation_id = validation_list[v_index];
            let valid_score = score_table.get(validation_id);

            if (valid_score == undefined) 
                valid_score = 0;
            
            min_score = Math.min(min_score, valid_score);
        }
        console.log('min_score', min_score);

        return {score: min_score, index: s_index};
    }

    return {score: 0, index: -1};
}



let cancellation_token: CancellationToken = {is_cancel: false};

export const ActionValidationPage = function({event_system, mqtt_server}: {event_system: EventSystem, mqtt_server: MQTTServer}) {
    let [searchParams, setSearchParams] = useSearchParams();
    let material_name = searchParams.get('name');

    if (material_name == null) material_name = "動作判讀";
    let validation_table = MQTT_Action_Validation.get(material_name);
        validation_table = JSON.parse(JSON.stringify(validation_table));

    let validation_rules = MQTT_Action_Rules.get(material_name);

    if (validation_table == null) validation_table = [];
    if (validation_rules == null) validation_rules = new Map();

    let validation_score_map = new Map<string, number>();

    const [validationScores, setValidationScores] = useState([...validation_table]);
    let [validationFulfilled, setValidationFulfilled] = useState(false);
    let [displayMessage, setDisplayMessage] = useState('');
    let [displayMessageDelay, setDisplayMessageDelay] = useState(0);


    let process_rule = function(rule: Rule_Type) {
        if (rule == null) return;

        console.log('process_rule', rule);
        let index = validation_table.findIndex(x => x.name == local_val_state);
        
        if (rule.type == 'warn' || rule.type == 'error') {
            let error_msg = (t("stage_error"))
            setDisplayMessage(FormatString(error_msg, [t(local_val_state), t(rule.score_id)]))
        }

        if (rule.type == 'warn') {
            return;
        }

        if (rule.type == 'error') {
            if (index > 0) local_val_state = ( validation_table[index - 1].name + '')
            return;
        }

        if (index >= validation_table.length - 1) {
            validationFulfilled = true;
            setValidationFulfilled(true);
            setDisplayMessage(t("stage_complete"))
            return;
        }
        local_val_state = validation_table[index + 1].name;
    }

    let on_message_event = function(event_id: string, message: Buffer) {
        if (validationFulfilled) return;

        console.log('validation_score_map', validation_score_map)
        let revert_event_id = event_id.replace(mqtt_server.client_id, "{0}");

        let max_score = 3;
        let validation_scores = get_validation_scores(event_id, validationScores, validation_score_map, mqtt_server);
        let rule = validation_rules.get(local_val_state);

        console.log('rule', rule);

        if (validation_scores.index < 0 || rule == null) return;
        if (!process_msg_event(revert_event_id, rule)) return;

        let score = parseFloat(message.toString());
            score = Clamp(score, 0, max_score);

        let original_score = validation_score_map.get(event_id);
        let original_v_score = validationScores[validation_scores.index].score;

        validation_score_map.set(event_id, score);

        validation_scores = get_validation_scores(event_id, validationScores, validation_score_map, mqtt_server);
        validationScores[validation_scores.index].score = validation_scores.score;

        let rule_match_result = rule_matching(revert_event_id, local_val_state, rule, validationScores);

        if ((rule_match_result != null && rule_match_result.type == 'warn') || 
            (original_v_score == 3 && rule_match_result == null)
            ) {
            if (original_score == undefined) original_score = 0; 

            validation_score_map.set(event_id, original_score);
            validationScores[validation_scores.index].score = original_v_score;

            console.log('REVERT', event_id,  original_score);
            return;
        }
        
        validationScores[validation_scores.index].score = validation_scores.score;
        setValidationScores([...validationScores]);

        if (rule_match_result != null)
            process_rule(rule_match_result);
    }

    let on_validation_debug_click = function(id: number) {
        validationScores[id].score = 1;
        setValidationScores([...validationScores])
    }

    let is_validations_fulfill = async function() {
        // Finish
        if (validationFulfilled) {            
            console.log("Stage complete");

            await DoDelayAction(5000, cancellation_token);

            if (window.location.href.includes('action_validation'))
                window.location.href="#/action_page";
        }
    }

    let is_display_msg_end = async function() {
        if (displayMessage == '') return;

        setDisplayMessageDelay(Date.now() + 5000);
        await DoDelayAction(5000);

        if (Date.now() > displayMessageDelay) 
            setDisplayMessage('')
    }

    useEffect(() => {
        console.log("ActionValidationPage");
        cancellation_token.is_cancel = false;
        local_val_state = validation_table[0].name;
        validation_score_map.clear();
        register_event(event_system, mqtt_server, validationScores, on_message_event)

        let action_id = MQTT_Action_MQTT.get(material_name);
        if (action_id != null) mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTFrontModeOut.ID), action_id);

        return () => {
            validation_score_map.clear();
          cancellation_token.is_cancel = true;
          local_val_state = '';

          setValidationScores([]);
          deregister_event(event_system, mqtt_server, validationScores);
        };
    }, []);
    
    useEffect(() => {
        is_validations_fulfill();
        is_display_msg_end();
    }, [validationScores, displayMessage]);

    return (
        <div id="validation_page">
            <PageHeader title={i18next.t(material_name)}></PageHeader>

            <div className="validation_content">
            {
                validationScores.map((x,i)=>{
                    return <ValidationComponent name={ i18next.t(x.name) } id={i} key={i}
                    on_click={on_validation_debug_click} 
                    progress={x.score / 3}
                    ></ValidationComponent>
                })
            }

            {
                displayMessage != '' && 
                <div className="complete_notification notification is-success">
                    <img src={exclamation_icon}></img>
                    {displayMessage}
                    {/* {t("stage_complete") } */}
                </div>
            }
            </div>
        </div>
    );
}