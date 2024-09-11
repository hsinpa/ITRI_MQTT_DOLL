import mqtt, { IPublishPacket, OnMessageCallback } from "mqtt";
import { MCUResultInEvent } from "../data/static_flow_variable";
import EventSystem from "../utility/EventSystem";

const EVENT_LISTENER_LIST = [
    MCUResultInEvent.Body,
    MCUResultInEvent.Head,

    MCUResultInEvent.LeftArmFlex,
    MCUResultInEvent.LeftArmIMU,
    MCUResultInEvent.LeftKneeFlex,
    MCUResultInEvent.LeftKneeIMU,

    MCUResultInEvent.RightArmFlex,
    MCUResultInEvent.RightArmIMU,
    MCUResultInEvent.RightKneeFlex,
    MCUResultInEvent.RightKneeIMU,

    MCUResultInEvent.LeftBackBottomCount,
    MCUResultInEvent.LeftBackBottomPower,
    MCUResultInEvent.LeftBackCenterCount,
    MCUResultInEvent.LeftBackCenterPower,
    MCUResultInEvent.LeftBackUpCount,
    MCUResultInEvent.LeftBackUpPower,

    MCUResultInEvent.RightBackBottomCount,
    MCUResultInEvent.RightBackBottomPower,
    MCUResultInEvent.RightBackCenterCount,
    MCUResultInEvent.RightBackCenterPower,
    MCUResultInEvent.RightBackUpCount,
    MCUResultInEvent.RightBackUpPower,
]

export class MqttEventListener {
    private _client: mqtt.MqttClient;
    private _event_sytem: EventSystem;
    private _event_dict: Set<string>;
    private _get_cmd_callback: (cmd_message_id: string) => string;

    constructor(client: mqtt.MqttClient, event_sytem: EventSystem, get_cmd: (cmd_message_id: string) => string) {
        this._client = client;
        this._event_sytem = event_sytem;
        this._get_cmd_callback = get_cmd;

        this._event_dict = new Set<string>();

        for (let i in EVENT_LISTENER_LIST) {
            let event_id = this._get_cmd_callback(EVENT_LISTENER_LIST[i]);
            this._event_dict.add(event_id);
            client.subscribe(event_id);
        }
    }

    public on_message(topic: string, payload: Buffer, packet: IPublishPacket) {
        // console.log('on message ' + topic + ", " + payload);
        this._event_sytem.Notify(topic, payload);
    }
}