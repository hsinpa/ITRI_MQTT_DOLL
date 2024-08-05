import { Link, useSearchParams } from "react-router-dom";
import { MQTTServer } from "../../mqtt/mqtt_server";
import EventSystem from "../../utility/EventSystem";
import { PageHeader } from "../page_header";
import { ValidationComponent } from "./validation_component";
import '../../assets/scss/validation_page.scss';
import { TrainingStartAudioPair, MQTT_Action_MQTT, MQTT_Action_Validation, Validation_Score } from "../../data/mqtt_action_table";
import { useEffect, useState } from "react";
import i18next, { t } from "i18next";
import { get_empty_record, HistoryRecord, MQTTEvent, MQTTFrontModeOut, MQTTLightBulbIn } from "../../data/static_share_varaible";
import { CancellationToken, Clamp, deep_clone_map, deep_clone_object, DoDelayAction, FormatString } from "../../utility/UtilityFunc";
import { MQTT_Action_Rules, Rule_Type } from "../../data/mqtt_action_rules";
import { process_msg_event, rule_matching } from "./validation_utility";
import { useUserInfoStore } from "./validation_zusland";
import exclamation_icon from '../../assets/texture/sprite/exclamation.svg';
import { MQTT_Audio_Rules, Roll_Over_Left_Rules_Audio } from "../../data/mqtt_audio_rules";
import { ActionAudioHandler } from "./action_audio";
import { AudioEventID, AudioEventValue } from "../../data/audio_static";
import { LocalStorageSystem } from "../../mqtt/local_record_system";
import itri_logo from '../../assets/texture/sprite/itri-logo-02.png';
import itri_logo_02 from '../../assets/texture/sprite/afd_logo.png';

interface Validation_State_Result {
    index: number,
    score: number,
}

let local_val_state = '';
let local_record: HistoryRecord;

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

let fire_event_list = function(events: MQTTEvent[], mqtt_server: MQTTServer) {
    if (events == null || mqtt_server == null) return;

    for (let i = 0; i < events.length; i++) {
        mqtt_server.send(mqtt_server.get_mqtt_cmd(events[i].id), events[i].value);
    }
}


let cancellation_token: CancellationToken = {is_cancel: false};

export const ActionValidationPage = function({event_system, mqtt_server, record}: 
                                            {event_system: EventSystem, mqtt_server: MQTTServer, record: LocalStorageSystem}) {
    let [searchParams, setSearchParams] = useSearchParams();
    let material_name = searchParams.get('name');

    if (material_name == null) material_name = "動作判讀";
    let validation_table = MQTT_Action_Validation.get(material_name);
        validation_table = JSON.parse(JSON.stringify(validation_table));

    let validation_rules = MQTT_Action_Rules.get(material_name);
    let audio_rules = MQTT_Audio_Rules.get(material_name);
    let audio_handler = new ActionAudioHandler(event_system);

    if (validation_table == null) validation_table = [];
    if (validation_rules == null) validation_rules = new Map();
    if (audio_rules == null) audio_rules = new Map();

    let validation_score_map = new Map<string, number>();

    const [validationScores, setValidationScores] = useState([...validation_table]);
    let [validationFulfilled, setValidationFulfilled] = useState(false);
    let [displayMessage, setDisplayMessage] = useState('');
    let [displayMessageDelay, setDisplayMessageDelay] = useState(0);

    let set_val_state = function(validation_state: Validation_Score) {
        console.log(validation_state);
        local_val_state = validation_state.name + "";

        audio_handler.set_loop_audio(validation_state.idle_audio_id);
        
        return local_val_state;
    }

    let process_rule = async function(rule: Rule_Type) {
        if (rule == null || rule.trigger_events == null) return;

        console.log('process_rule', rule);
        let index = validation_table.findIndex(x => x.name == local_val_state);
        
        // Only to play audio
        if (rule.type == 'none') {
            return;
        }

        if (rule.type == 'warn' || rule.type == 'error') {
            let error_msg = (t("stage_error"))
            let final_msg = FormatString(error_msg, [t(local_val_state), t(rule.score_id)]);
            setDisplayMessage(final_msg)
            local_record.errorPrompt.push(final_msg);
        }

        if (rule.type == 'warn') {
            return;
        }

        if (rule.type == 'error') {
            if (index > 0) set_val_state(validation_table[index - 1]);
            fire_event_list(rule.trigger_events, mqtt_server);
            return;
        }
        
        if (index >= validation_table.length - 1) {
            validationFulfilled = true;

            local_record.completeness = 100;
            local_record.time = new Date().toUTCString();
            record.push_records(local_record);

            setValidationFulfilled(true);
            setDisplayMessage(t("stage_complete"))

            mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTLightBulbIn.ID), MQTTLightBulbIn.Bulb_3);

            event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event055_此培訓操作已完成, force_play: true});

            return;
        }

        set_val_state(validation_table[index + 1]);

        fire_event_list(rule.trigger_events, mqtt_server);
    }

    let on_message_event = function(event_id: string, message: Buffer) {
        if (validationFulfilled) return;

        console.log('validation_score_map', validation_score_map)
        let revert_event_id = event_id.replace(mqtt_server.client_id, "{0}");

        let max_score = 3;
        let validation_scores = get_validation_scores(event_id, validationScores, validation_score_map, mqtt_server);
        let rule = validation_rules.get(local_val_state);
        let audio_rule = audio_rules.get(local_val_state);
        let current_index = validation_table.findIndex(x => x.name == local_val_state);
        
        if (validation_scores.index < 0 || rule == null) return;

        let clone_validation_score_map: Map<string, number> = deep_clone_map(validation_score_map);
        let clone_validation_score_obj: Validation_Score[] = deep_clone_object(validationScores);

        console.log('rule', rule);

        let score = parseFloat(message.toString());
            score = Clamp(score, 0, max_score);

        let original_score = clone_validation_score_map.get(event_id);
        let original_v_score = clone_validation_score_obj[validation_scores.index].score;

        clone_validation_score_map.set(event_id, score);

        validation_scores = get_validation_scores(event_id, clone_validation_score_obj, clone_validation_score_map, mqtt_server);
        clone_validation_score_obj[validation_scores.index].score = validation_scores.score;

        let rule_match_result = rule_matching(revert_event_id, local_val_state, rule, clone_validation_score_obj);

        // Play Audio 
        if (audio_rule != null) {
            let audio_match_result = rule_matching(revert_event_id, local_val_state, audio_rule, clone_validation_score_obj);
            if (audio_match_result != null) audio_handler.play(audio_match_result);
        }

        if (!process_msg_event(revert_event_id, rule)) return;

        if ((rule_match_result != null && rule_match_result.type == 'warn') || 
            (original_v_score == 3 && rule_match_result == null) 
            ||
            (rule_match_result == null && validation_scores.index > current_index
            )
        ) {
            if (original_score == undefined) original_score = 0; 

            console.log('REVERT', event_id,  original_score);
            return;
        }

        validation_score_map.set(event_id, score);
        validationScores[validation_scores.index].score = validation_scores.score;
        setValidationScores([...validationScores]);

        if (rule_match_result != null)
            process_rule(rule_match_result);
    }

    let on_validation_debug_click = function(id: number) {
        validationScores[id].score = 3;
        setValidationScores([...validationScores])
    }

    let is_validations_fulfill = async function() {
        // Finish
        if (validationFulfilled) {            
            console.log("Stage complete");

            await DoDelayAction(5000, cancellation_token);

            if (window.location.href.includes('action_validation'))
                window.location.href="#/record_page";
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
        local_record = get_empty_record();
        local_record.completeness = 0;
        local_record.title = i18next.t(material_name);

        set_val_state(validation_table[0]);

        validation_score_map.clear();
        register_event(event_system, mqtt_server, validationScores, on_message_event)

        let action_id = MQTT_Action_MQTT.get(material_name);
        if (action_id != null) mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTFrontModeOut.ID), action_id);

        mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTLightBulbIn.ID), MQTTLightBulbIn.All_Off);

        let start_audio_id = TrainingStartAudioPair.get(material_name)
        if (start_audio_id != null )event_system.Notify(AudioEventID.ID, {audio: start_audio_id, force_play: true});


        return () => {
            if (validationFulfilled) {
                event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event056_感謝您的體驗, force_play: true});
            }

            validation_score_map.clear();
            cancellation_token.is_cancel = true;
            local_val_state = '';

            audio_handler.dispose();
            setValidationScores([]);
            deregister_event(event_system, mqtt_server, validationScores);
            mqtt_server.send(mqtt_server.get_mqtt_cmd(MQTTLightBulbIn.ID), MQTTLightBulbIn.All_Off);
        };
    }, []);
    
    useEffect(() => {
        is_validations_fulfill();
        is_display_msg_end();
    }, [validationScores, displayMessage]);

    return (
        <>
            <PageHeader title={i18next.t(material_name)}></PageHeader>

            <div id="validation_page">

            <div className="validation_content">
                <div className="validation_holder">
                {
                    validationScores.map((x,i)=>{
                        return <ValidationComponent name={ i18next.t(x.name) } id={i} key={i}
                        on_click={on_validation_debug_click} 
                        progress={x.score / 3}
                        ></ValidationComponent>
                    })
                }
                </div>

            {
                displayMessage != '' && 
                <div className="complete_notification notification is-success">
                    <img src={exclamation_icon}></img>
                    {displayMessage}
                </div>
            }

            </div>

            <div className='icon_group'>
                <img src={itri_logo_02}></img>
                <img src={itri_logo}></img>
            </div>
        </div>
        </>
    );
}