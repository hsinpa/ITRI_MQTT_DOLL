import { AudioEventValue } from "./audio_static";
import { Rule_Type } from "./mqtt_action_rules";
import { MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";

export const PAT_BACK_Left_Rules_Audio = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_bottom,
        [

            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterCount, MCUResultInEvent.LeftBackCenterPower],
                trigger_events: [],
                sound_effect: [AudioEventValue.Event085_肺下葉拍背訓練時誤拍肺中葉_editing],
                type: 'warn',
                operation: '>',
                value: 0.1,
            },

            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                trigger_events: [],
                sound_effect: [AudioEventValue.Event086_肺下葉拍背訓練時誤拍肺上葉_editing],
                type: 'warn',
                operation: '>',
                value: 0.1,
            },


            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackBottomPower],
                sound_effect: [AudioEventValue.Event066_肺下葉拍背完成_editing, AudioEventValue.Event083_肺中葉拍背動作開始_editing],
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
                sound_effect: [AudioEventValue.Event089_肺中葉拍背訓練時誤拍肺下葉_editing],
                value: 4.1,
            },

            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                sound_effect: [AudioEventValue.Event090_肺中葉拍背訓練時誤拍肺上葉_editing],
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackCenterPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event069_肺中葉拍背完成_editing, AudioEventValue.Event084_肺上葉拍背動作開始_editing],
                value: 3
            },
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
                sound_effect: [AudioEventValue.Event093_肺上葉拍背訓練時誤拍肺下葉_editing],
                value:  4.1,
            },

            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterCount, MCUResultInEvent.LeftBackCenterPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value:  4.1,
                sound_effect: [AudioEventValue.Event094_肺上葉拍背訓練時誤拍肺中葉_editing],
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event072_肺上葉拍背完成_editing],
                value: 3
            },
        ]
    ],
]);

export const PAT_BACK_Right_Rules_Audio = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_bottom,
        [
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterCount, MCUResultInEvent.RightBackCenterPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,               
                sound_effect: [AudioEventValue.Event085_肺下葉拍背訓練時誤拍肺中葉_editing],
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                trigger_events: [],
                type: 'warn',
                sound_effect: [AudioEventValue.Event086_肺下葉拍背訓練時誤拍肺上葉_editing],
                operation: '>',
                value: 0.1,
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackBottomPower],
                sound_effect: [AudioEventValue.Event066_肺下葉拍背完成_editing, AudioEventValue.Event083_肺中葉拍背動作開始_editing],
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
                sound_effect: [AudioEventValue.Event089_肺中葉拍背訓練時誤拍肺下葉_editing],
                value:  4.1,
            },

            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value: 0.1,
                sound_effect: [AudioEventValue.Event090_肺中葉拍背訓練時誤拍肺上葉_editing],
            },

            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackCenterPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event069_肺中葉拍背完成_editing, AudioEventValue.Event084_肺上葉拍背動作開始_editing],
                value: 3
            },
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
                value:  4.1,
                sound_effect: [AudioEventValue.Event093_肺上葉拍背訓練時誤拍肺下葉_editing],
            },

            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterCount, MCUResultInEvent.RightBackCenterPower],
                trigger_events: [],
                type: 'warn',
                operation: '>',
                value:  4.1,
                sound_effect: [AudioEventValue.Event094_肺上葉拍背訓練時誤拍肺中葉_editing],
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event072_肺上葉拍背完成_editing],
                value: 3
            },
        ]
    ],

]);