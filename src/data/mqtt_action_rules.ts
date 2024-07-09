import { AudioEventValue } from "./audio_static";
import { MQTT_Action_Name, MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";
import { MQTTEvent, MQTTLightBulbIn } from "./static_share_varaible";

export interface Rule_Type {
    score_id: string,
    matches: string[],
    trigger_events?: MQTTEvent[], 
    sound_effect?: string[]
    message_id?: string,
    type: 'warn' | 'error' | 'success' | 'none'
    operation: '>' | '<' | '==',
    value: number,
}

const Roll_Over_Left_Rules = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.hand,
        [
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_1}],
                type: 'success',
                operation: '==',
                value: 3
            },
        ]
    ],

    [MQTT_State_Name.knee,
        [
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
                type: 'error',
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.All_Off}],
                operation: '<',
                value: 2
            },
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                type: 'warn',
                trigger_events: [],
                operation: '>',
                value: 2
            },
            {
                score_id: MQTT_State_Name.knee,
                matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_2}],
                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ],
    [MQTT_State_Name.body,
        [
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_3}],

                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ]
]);

const Roll_Over_Right_Rules = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.hand,
        [
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.LeftArmFlex, MCUResultInEvent.LeftArmIMU],
                message_id: '',
                type: 'success',
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_1}],
                operation: '==',
                value: 3
            },
        ]
    ],

    [MQTT_State_Name.knee,
        [
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.LeftArmFlex, MCUResultInEvent.LeftArmIMU],
                message_id: '',
                type: 'error',
                operation: '<',
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.All_Off}],

                value: 2
            },
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                message_id: '',
                type: 'warn',
                operation: '>',
                trigger_events: [],

                value: 2
            },
            {
                score_id: MQTT_State_Name.knee,
                matches: [MCUResultInEvent.LeftKneeFlex, MCUResultInEvent.LeftKneeIMU],
                message_id: '',
                type: 'success',
                operation: '==',
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_2}],

                value: 3
            }
        ]
    ],
    [MQTT_State_Name.body,
        [
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                message_id: '',
                type: 'success',
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_3}],
                operation: '==',
                value: 3
            }
        ]
    ]
]);


export const MQTT_Action_Rules = new Map<string, Map<string, Rule_Type[]> >(
    [
        [MQTT_Action_Name.roll_over_left, Roll_Over_Left_Rules],
        [MQTT_Action_Name.roll_over_right, Roll_Over_Right_Rules]
    ]
);

// 
// {
//     matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
//     action: '',
//     operation: '==',
//     value: 3
// },
// {
//     matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
//     action: '',
//     operation: '==',
//     value: 3
// },
// {
//     matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
//     action: '',
//     operation: '==',
//     value: 3
// }