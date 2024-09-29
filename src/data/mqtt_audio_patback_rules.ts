import { AudioEventValue } from "./audio_static";
import { Rule_Type } from "./mqtt_action_rules";
import { MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";

export const PAT_BACK_Left_Rules_Audio = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_upper,
        [
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.LeftBackUpCount, MCUResultInEvent.LeftBackUpPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event082_肺下葉拍背動作開始_editing],
                value: 3
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
                sound_effect: [AudioEventValue.Event083_肺中葉拍背動作開始_editing],
                value: 3
            },
        ]
    ],
    [MQTT_State_Name.lung_bottom,
        [
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.LeftBackBottomCount, MCUResultInEvent.LeftBackBottomPower],
                sound_effect: [AudioEventValue.Event084_肺上葉拍背動作開始_editing],
                type: 'success',
                operation: '==',
                value: 3
            },
        ]
    ]
]);

export const PAT_BACK_Right_Rules_Audio = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.lung_upper,
        [
            {
                score_id: MQTT_State_Name.lung_upper,
                matches: [MCUResultInEvent.RightBackUpCount, MCUResultInEvent.RightBackUpPower],
                type: 'success',
                operation: '==',
                sound_effect: [AudioEventValue.Event082_肺下葉拍背動作開始_editing],
                value: 3
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
                sound_effect: [AudioEventValue.Event083_肺中葉拍背動作開始_editing],
                value: 3
            },
        ]
    ],
    [MQTT_State_Name.lung_bottom,
        [
            {
                score_id: MQTT_State_Name.lung_bottom,
                matches: [MCUResultInEvent.RightBackBottomCount, MCUResultInEvent.RightBackBottomPower],
                sound_effect: [AudioEventValue.Event084_肺上葉拍背動作開始_editing],
                type: 'success',
                operation: '==',
                value: 3
            },
        ]
    ]
]);