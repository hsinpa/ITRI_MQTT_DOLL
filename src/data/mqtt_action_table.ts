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

export const MQTT_Action_MQTT =  new Map<string, number> ([
    [MQTT_Action_Name.roll_over_left, MQTTFrontModeOut.Left_MCU_Read_Action],
    [MQTT_Action_Name.roll_over_right, MQTTFrontModeOut.Right_MCU_Read_Action],
]);

export const MQTT_Material_Video =  new Map<string, string> ([
    [Material_Table.roll_over, "6Ayxz5p7GBs"],
    [Material_Table.pat_back, "-iuVNwn6NxY"],
]);

export interface Validation_Type {
    name: string,
    validation_list: string[],
    weight: number,
    score: number,
    is_complete: boolean
}

export const MaterialDetailsLookUp = new Map<string, string[]> ([
    [Material_Table.roll_over, [MQTT_Action_Name.roll_over_left, MQTT_Action_Name.roll_over_right]],
    [Material_Table.pat_back, []]
]);

export const MQTT_Action_Validation = new Map<string, Validation_Type[]>(
[
    [    MQTT_Action_Name.roll_over_left, [
        {
            'name': '抬手',
            'validation_list': [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
            'weight': 1,
            'is_complete': false,
            'score': 0
        },
        {
            'name': '抬腳',
            'validation_list': [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
            'weight': 1,
            'is_complete': false,
            'score': 0
        },
        {
            'name': '翻身',
            'validation_list': [MCUResultInEvent.Body, MCUResultInEvent.Head],
            'weight': 1,
            'is_complete': false,
            'score': 0
        } ]
    ],
    [
        MQTT_Action_Name.roll_over_right,  [
        {
            'name': '抬手',
            'validation_list': [MCUResultInEvent.LeftArmFlex, MCUResultInEvent.LeftArmIMU],
            'weight': 1,
            'is_complete': false,
            'score': 0
        },
        {
            'name': '抬腳',
            'validation_list': [MCUResultInEvent.LeftKneeFlex, MCUResultInEvent.LeftKneeIMU],
            'weight': 1,
            'is_complete': false,
            'score': 0
        },
        {
            'name': '翻身',
            'validation_list': [MCUResultInEvent.Body, MCUResultInEvent.Head],
            'weight': 1,
            'is_complete': false,
            'score': 0
        } ]
    ]
]);