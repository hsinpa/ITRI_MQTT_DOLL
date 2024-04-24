export let MQTT_ID: string = "1";

export const API = Object.freeze({
    MQTT_URL : "wss://broker.mqttgo.io:8084/mqtt"
});

export const MQTTFrontModeOut = Object.freeze({
    ID : "ITRI/照護人{0}/正面模式發",

    Idle: 0,
    Left_MCU_Read_Action: 1,
    Left_MCU_Calibration_Mode: 2,
    Left_MCU_Waiting: 3,

    All_Calibration_Mode: 5,

    Right_MCU_Read_Action: 6,
    Right_MCU_Calibration_Mode: 7,
    Right_MCU_Waiting: 8,
});

export const MQTTFrontModeIn = Object.freeze({
    ID : "ITRI/照護人{0}/正面模式收",

    Idle: 0,
    Left_MCU_Read_Action: 1,
    Left_MCU_Calibration_Mode: 2,
    Left_MCU_Waiting: 3,

    Right_MCU_Read_Action: 6,
    Right_MCU_Calibration_Mode: 7,
    Right_MCU_Waiting: 8,
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

export const MQTTTeachModeIn = Object.freeze({
    ID : "ITRI/照護人{0}/教材模式發",

    Action_1_Completed: 0,
    Action_2_Completed: 1,
    Action_3_Completed: 2,
    Action_4_Completed: 3,
    Action_5_Completed: 4,
    Action_6_Completed: 5,
    Action_7_Completed: 6,
    Action_8_Completed: 7,
    None: 8
});

export function get_mqtt_cmd(client_id: string, cmd_message_id: string) {
    return cmd_message_id.replace("{0}", client_id);
}