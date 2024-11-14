import { Rule_Type } from "./mqtt_action_rules";
import { MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";
import { MQTTBackModeOut, MQTTLightBulbIn } from "./static_share_varaible";

export const Pat_Back_Left_Rules = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_bottom,
        [
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterCount, MCUResultInEvent.LeftBackCenterPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                error_message: 'pat_back_lung_bottom_lung_center_error'
            },

            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                error_message: 'pat_back_lung_bottom_lung_upper_error'
            },

            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackBottomPower],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_1}],
                type: 'success',
                operation: '==',
                value: 3
            },
        ]
    ],

    [MQTT_State_Name.lung_center,
        [
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackBottomPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 3,
                error_message: 'pat_back_lung_center_lung_bottom_error'
            },

            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                error_message: 'pat_back_lung_center_lung_upper_error'
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterCount, MCUResultInEvent.LeftBackCenterPower],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_2}],
                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ],
    [MQTT_State_Name.lung_upper,
        [

            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackBottomPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 3,
                error_message: 'pat_back_lung_upper_lung_bottom_error'
            },

            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterCount, MCUResultInEvent.LeftBackCenterPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 3,
                error_message: 'pat_back_lung_upper_lung_center_error'
            },

            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_3}, {id: MQTTBackModeOut.ID, value: MQTTBackModeOut.Idle}],
                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ]
]);

export const Pat_Back_Right_Rules = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_bottom,
        [
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterCount, MCUResultInEvent.RightBackCenterPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                error_message: 'pat_back_lung_bottom_lung_center_error'
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                error_message: 'pat_back_lung_bottom_lung_upper_error'
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackBottomPower],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_1}],
                type: 'success',
                operation: '==',
                value: 3
            },
        ]
    ],

    [MQTT_State_Name.lung_center,
        [
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackBottomPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 3,
                error_message: 'pat_back_lung_center_lung_bottom_error'
            },

            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                error_message: 'pat_back_lung_center_lung_upper_error'
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterCount, MCUResultInEvent.RightBackCenterPower],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_2}],
                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ],
    [MQTT_State_Name.lung_upper,
        [
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackBottomPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 3,
                error_message: 'pat_back_lung_upper_lung_bottom_error'
            },

            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterCount, MCUResultInEvent.RightBackCenterPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 3,
                error_message: 'pat_back_lung_upper_lung_center_error'
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                trigger_events: [{id: MQTTLightBulbIn.ID, value: MQTTLightBulbIn.Bulb_3}, {id: MQTTBackModeOut.ID, value: MQTTBackModeOut.Idle}],
                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ]
]);