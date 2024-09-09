import { Pat_Back_Left_Rules, Pat_Back_Right_Rules } from "./action_pat_back_rule";
import { Roll_Over_Left_Rules, Roll_Over_Right_Rules } from "./action_roll_over_rule";
import { MQTT_Action_Name, MQTT_State_Name } from "./mqtt_action_table";
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

export const MQTT_Action_Rules = new Map<string, Map<string, Rule_Type[]> >(
    [
        [MQTT_Action_Name.roll_over_left, Roll_Over_Left_Rules],
        [MQTT_Action_Name.roll_over_right, Roll_Over_Right_Rules],
        [MQTT_Action_Name.pat_back_left, Pat_Back_Left_Rules],
        [MQTT_Action_Name.pat_back_right, Pat_Back_Right_Rules]
    ]
);