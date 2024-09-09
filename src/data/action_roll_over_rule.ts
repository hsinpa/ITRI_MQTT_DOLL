import { Rule_Type } from "./mqtt_action_rules";
import { MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";
import { MQTTLightBulbIn } from "./static_share_varaible";

export const Roll_Over_Left_Rules = new Map<string, Rule_Type[]>([
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

export const Roll_Over_Right_Rules = new Map<string, Rule_Type[]>([
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