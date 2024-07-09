import { AudioEventValue } from "./audio_static";
import { MCUResultInEvent } from "./static_flow_variable";
import { MQTTFrontModeOut } from "./static_share_varaible";

export const Material_Table = Object.freeze({
    'roll_over':'roll_over',
    'pat_back':'pat_back',

    "wheelchair":"wheelchair",
    "out_of_bed":"out_of_bed",
    "change_cloth":"change_cloth",
    "cleaning":"cleaning",
});

export const MQTT_Action_Name = Object.freeze({
    'roll_over_left':'roll_over_left',
    'roll_over_right':'roll_over_right',

    'pat_back':'pat_back',
});

export const MQTT_State_Name = Object.freeze({
    'hand':'hand',
    'knee':'knee',
    'body':'body',
});

export const MQTT_Action_MQTT =  new Map<string, number> ([
    [MQTT_Action_Name.roll_over_left, MQTTFrontModeOut.Left_MCU_Read_Action],
    [MQTT_Action_Name.roll_over_right, MQTTFrontModeOut.Right_MCU_Read_Action],
]);

export const MQTT_Material_Video =  new Map<string, string> ([
    [Material_Table.roll_over, "6Ayxz5p7GBs"],
    [Material_Table.pat_back, "-iuVNwn6NxY"],
]);

export interface Validation_Score {
    name: string,
    validation_list: string[],
    score: number,
    idle_audio_id: string,
}

export const MaterialDetailsLookUp = new Map<string, string[]> ([
    [Material_Table.roll_over, [MQTT_Action_Name.roll_over_left, MQTT_Action_Name.roll_over_right]],
    [Material_Table.pat_back, []]
]);

export const MaterialAudioPair = new Map<string, string> ([
    [MQTT_Action_Name.roll_over_left, AudioEventValue.Event005_翻身教材左翻],
    [MQTT_Action_Name.roll_over_right, AudioEventValue.Event006_翻身教材右翻]
]);

export const TrainingStartAudioPair = new Map<string, string> ([
    [MQTT_Action_Name.roll_over_left, AudioEventValue.Event008_左翻抬手動作開始],
    [MQTT_Action_Name.roll_over_right, AudioEventValue.Event026_右翻抬手動作開始]
]);

export const MQTT_Action_Validation = new Map<string, Validation_Score[]>(
[
    [    MQTT_Action_Name.roll_over_left, [
        {
            'name': MQTT_State_Name.hand,
            'validation_list': [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
            'score': 0,
            'idle_audio_id': AudioEventValue.Event009_右手移往胸前
        },
        {
            'name': MQTT_State_Name.knee,
            'validation_list': [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
            'score': 0,
            'idle_audio_id': AudioEventValue.Event015_右腳向上彎曲
        },
        {
            'name': MQTT_State_Name.body,
            'validation_list': [MCUResultInEvent.Body],
            'score': 0,
            'idle_audio_id': AudioEventValue.Event021_請抓照護者右肩胛及右髖部進行左翻
        } ]
    ],
    [
        MQTT_Action_Name.roll_over_right,  [
        {
            'name': MQTT_State_Name.hand,
            'validation_list': [MCUResultInEvent.LeftArmFlex, MCUResultInEvent.LeftArmIMU],
            'score': 0,
            'idle_audio_id': AudioEventValue.Event027_左手移往胸前
        },
        {
            'name': MQTT_State_Name.knee,
            'validation_list': [MCUResultInEvent.LeftKneeFlex, MCUResultInEvent.LeftKneeIMU],
            'score': 0,
            'idle_audio_id': AudioEventValue.Event033_左腳向上彎曲
        },
        {
            'name': MQTT_State_Name.body,
            'validation_list': [MCUResultInEvent.Body],
            'score': 0,
            'idle_audio_id': AudioEventValue.Event039_請抓照護者左肩胛及左髖部進行右翻
        } ]
    ]
]);