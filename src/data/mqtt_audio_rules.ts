import { AudioEventValue } from "./audio_static";
import { Rule_Type } from "./mqtt_action_rules";
import { MQTT_Action_Name, MQTT_State_Name } from "./mqtt_action_table";
import { MCUResultInEvent } from "./static_flow_variable";
import { MQTTLightBulbIn } from "./static_share_varaible";


export const Roll_Over_Left_Rules_Audio = new Map<string, Rule_Type[]>([
    [MQTT_State_Name.hand,
        [
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
                type: 'none',
                operation: '==',
                sound_effect: [AudioEventValue.Event012_左翻抬手動作完成, AudioEventValue.Event014_左翻抬腳動作開始],
                value: 3
            },
            {
                score_id: MQTT_State_Name.knee,
                matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeFlex],
                type: 'none',
                operation: '>',
                sound_effect: [AudioEventValue.Event044_抬手訓練時誤做抬腳],
                value: 0
            },
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                type: 'none',
                operation: '>',
                sound_effect: [AudioEventValue.Event045_抬手訓練時誤做翻身],
                value: 0
            },
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
                type: 'none',
                operation: '==',
                sound_effect: [AudioEventValue.Event011_請加強彎曲右手軸到胸前],
                value: 2
            },
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
                type: 'none',
                operation: '==',
                sound_effect: [AudioEventValue.Event010_請加強移動右手臂到胸前],
                value: 1
            },
        ]
    ],

    [MQTT_State_Name.knee,
        [
            {
                score_id: MQTT_State_Name.knee,
                matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
                type: 'none',
                operation: '==',
                sound_effect: [AudioEventValue.Event018_左翻抬腳動作完成, AudioEventValue.Event020_左翻翻身動作開始],
                value: 3
            },
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                type: 'none',
                operation: '>',
                sound_effect: [AudioEventValue.Event047_抬腳訓練時誤做翻身],
                value: 0
            },
            {
                score_id: MQTT_State_Name.hand,
                matches: [MCUResultInEvent.RightArmFlex, MCUResultInEvent.RightArmIMU],
                sound_effect: [AudioEventValue.Event046_抬腳訓練時誤放抬手],
                type: 'none',
                operation: '>',
                value: 0
            },
            {
                score_id: MQTT_State_Name.knee,
                matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
                type: 'none',
                operation: '==',
                sound_effect: [AudioEventValue.Event017_請加強彎曲右膝蓋],
                value: 2
            },

            {
                score_id: MQTT_State_Name.knee,
                matches: [MCUResultInEvent.RightKneeFlex, MCUResultInEvent.RightKneeIMU],
                type: 'none',
                operation: '==',
                sound_effect: [AudioEventValue.Event016_請加強抬高右膝蓋],
                value: 1
            },
        ]
    ],
    [MQTT_State_Name.body,
        [
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                sound_effect: [AudioEventValue.Event022_請加強左翻身角度及確認手腳位置],
                type: 'success',
                operation: '==',
                value: 2
            },
            {
                score_id: MQTT_State_Name.body,
                matches: [MCUResultInEvent.Body],
                sound_effect: [AudioEventValue.Event024_左翻翻身動作完成],
                type: 'success',
                operation: '==',
                value: 3
            }
        ]
    ]
]);

export const MQTT_Audio_Rules = new Map<string, Map<string, Rule_Type[]> >(
    [
        [MQTT_Action_Name.roll_over_left, Roll_Over_Left_Rules_Audio],
        [MQTT_Action_Name.roll_over_right, Roll_Over_Left_Rules_Audio]
    ]
);