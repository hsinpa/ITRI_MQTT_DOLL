import { MQTT_Action_Name, MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";

export interface Rule_Type {
    score_id: string,
    matches: string[],
    message_id: string,
    type: 'warn' | 'error' | 'success'
    operation: '>' | '<' | '==',
    value: number,
}

const Roll_Over_Left_Rules = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.hand,
        [
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
                message_id: '',
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
                message_id: '',
                type: 'error',
                operation: '<',
                value: 2
            },
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                message_id: '',
                type: 'warn',
                operation: '>',
                value: 2
            },
            {
                score_id: MQTT_State_Name.knee,
                matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
                message_id: '',
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
                message_id: '',
                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ]
]);


export const MQTT_Action_Rules = new Map<string, Map<string, Rule_Type[]> >(
    [
        [MQTT_Action_Name.roll_over_left, Roll_Over_Left_Rules]
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