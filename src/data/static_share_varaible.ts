import { v4 as uuidv4 } from 'uuid';

export const API = Object.freeze({
    MQTT_URL : "wss://broker.mqttgo.io:8084/mqtt"
});

export interface MQTTModeType {
    id: string,
    action_code: number
}

export const MQTTFrontModeOut = Object.freeze({
    ID : "ITRI/照護人{0}/正面模式發",

    Idle: 0,
    Left_MCU_Read_Action: 6,
    Left_MCU_Calibration_Mode: 7,
    Left_MCU_Waiting: 8,

    All_Calibration_Mode: 5,

    Right_MCU_Read_Action: 1,
    Right_MCU_Calibration_Mode: 2,
    Right_MCU_Waiting: 3,
});

export const MQTTFrontModeIn = Object.freeze({
    ID : "ITRI/照護人{0}/正面模式收",

    Idle: 0,
    Left_MCU_Read_Action: 6,
    Left_MCU_Calibration_Mode: 7,
    Left_MCU_Waiting: 8,

    Right_MCU_Read_Action: 1,
    Right_MCU_Calibration_Mode: 2,
    Right_MCU_Waiting: 3,
});

export const MQTTBackModeOut = Object.freeze({
    ID : "ITRI/照護人{0}/背面模式發",

    Idle: 0,
    Left_MCU_Read_Action: 1,
    Left_MCU_Calibration_Mode: 2,
    Left_MCU_Waiting: 3,

    All_Calibration_Mode: 5,

    Right_MCU_Read_Action: 6,
    Right_MCU_Calibration_Mode: 7,
    Right_MCU_Waiting: 8,
});

export const MQTTBackModeIn = Object.freeze({
    ID : "ITRI/照護人{0}/背面模式收",

    Idle: 0,
    MCU_Read_Action: 1,
    MCU_Calibration_Mode: 2,
    MCU_Waiting: 3,
});


export const MQTTTeachModeOut = Object.freeze({
    ID : "ITRI/照護人{0}/教材模式收",

    Action_1_Completed: 0,
    Action_2_Completed: 1,
    Action_3_Completed: 2,
    Action_4_Completed: 3,
    Action_5_Completed: 4,
    Action_6_Completed: 5,
    Action_7_Completed: 6,
    Action_8_Completed: 7,
    None: 8,
});

export const MQTTLightBulbIn = Object.freeze({
    ID : "ITRI/照護人{0}/教材模式發",

    Bulb_1: 1,
    Bulb_2: 3,
    Bulb_3: 5,
    All_Off: 8
});

export function get_mqtt_cmd(client_id: string, cmd_message_id: string) {
    return cmd_message_id.replace("{0}", client_id);
}

export const DollIDList = ['1', '2', '3', '4', '5', '6']

export const LocalStorageKey = Object.freeze({
    DOLL_ID: 'doll_id'
});

export interface MQTTEvent {
    id: string,
    value: number
}

export interface HistoryRecord { 
    caregiverId: string
    name: string,
    time: string,
    title: string,
    completeness: number,
    errorPrompt: string[],
    id?: string,
    remark?: string,
}

export function get_empty_record(): HistoryRecord {
    return {
        id: '',
        caregiverId: uuidv4(),
        time: '',
        name: '',
        title: '',
        completeness: 0,
        errorPrompt: [],
        remark: '',
    }
}
