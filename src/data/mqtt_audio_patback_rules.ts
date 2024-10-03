import { AudioEventValue } from "./audio_static";
import { Rule_Type } from "./mqtt_action_rules";
import { MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";

export const PAT_BACK_Left_Rules_Audio = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_bottom,
        [
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackBottomPower],
                sound_effect: [AudioEventValue.Event066_肺下葉拍背完成_editing, AudioEventValue.Event083_肺中葉拍背動作開始_editing, AudioEventValue.Event068_請拍擊肺中葉_editing],
                type: 'success',
                operation: '==',
                value: 3
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomPower],
                sound_effect: [AudioEventValue.Event073_請加強拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomPower],
                sound_effect: [AudioEventValue.Event078_請放輕拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount],
                sound_effect: [AudioEventValue.Event074_請加快拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount],
                sound_effect: [AudioEventValue.Event079_請放慢拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
        ]
    ],
    [MQTT_State_Name.lung_center,
        [
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackCenterPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event069_肺中葉拍背完成_editing, AudioEventValue.Event084_肺上葉拍背動作開始_editing, AudioEventValue.Event071_請拍擊肺上葉_editing],
                value: 3
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterPower],
                sound_effect: [AudioEventValue.Event073_請加強拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterPower],
                sound_effect: [AudioEventValue.Event078_請放輕拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterCount],
                sound_effect: [AudioEventValue.Event074_請加快拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.LeftBackCenterCount],
                sound_effect: [AudioEventValue.Event079_請放慢拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
        ]
    ],
    [MQTT_State_Name.lung_upper,
        [
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event072_肺上葉拍背完成_editing],
                value: 3
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpPower],
                sound_effect: [AudioEventValue.Event073_請加強拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpPower],
                sound_effect: [AudioEventValue.Event078_請放輕拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount],
                sound_effect: [AudioEventValue.Event074_請加快拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount],
                sound_effect: [AudioEventValue.Event079_請放慢拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
        ]
    ],
]);

export const PAT_BACK_Right_Rules_Audio = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_bottom,
        [
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackBottomPower],
                sound_effect: [AudioEventValue.Event066_肺下葉拍背完成_editing, AudioEventValue.Event083_肺中葉拍背動作開始_editing, AudioEventValue.Event068_請拍擊肺中葉_editing],
                type: 'success',
                operation: '==',
                value: 3
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomPower],
                sound_effect: [AudioEventValue.Event073_請加強拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomPower],
                sound_effect: [AudioEventValue.Event078_請放輕拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount],
                sound_effect: [AudioEventValue.Event074_請加快拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount],
                sound_effect: [AudioEventValue.Event079_請放慢拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
        ]
    ],

    [MQTT_State_Name.lung_center,
        [
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackCenterPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event069_肺中葉拍背完成_editing, AudioEventValue.Event084_肺上葉拍背動作開始_editing, AudioEventValue.Event071_請拍擊肺上葉_editing],
                value: 3
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterPower],
                sound_effect: [AudioEventValue.Event073_請加強拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterPower],
                sound_effect: [AudioEventValue.Event078_請放輕拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterCount],
                sound_effect: [AudioEventValue.Event074_請加快拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_center,
                matches: [MCUResultInEvent.RightBackCenterCount],
                sound_effect: [AudioEventValue.Event079_請放慢拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
        ]
    ],

    [MQTT_State_Name.lung_upper,
        [
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event072_肺上葉拍背完成_editing],
                value: 3
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpPower],
                sound_effect: [AudioEventValue.Event073_請加強拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpPower],
                sound_effect: [AudioEventValue.Event078_請放輕拍背力道_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount],
                sound_effect: [AudioEventValue.Event074_請加快拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 1
            },
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount],
                sound_effect: [AudioEventValue.Event079_請放慢拍背速度_editing],
                type: 'none',
                operation: '==',
                value: 2
            },
        ]
    ],

]);