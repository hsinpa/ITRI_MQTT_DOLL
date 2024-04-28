import * as mqtt from 'mqtt';
import { MCUResultInEvent } from '../data/static_flow_variable';
import EventSystem from '../utility/EventSystem';
import { MqttEventListener } from './mqtt_listener';

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
]

export class MQTTServer {
    private _mqtt_client: mqtt.MqttClient | undefined;
    private _mqtt_listener: MqttEventListener | undefined;
    private _event_system: EventSystem;
    private _client_id: string = "1";

    constructor(event_system: EventSystem) {
        this._event_system = event_system;
    }

    connect(url: string) {
        if (this._mqtt_client != undefined) {
            this.disconnect();
            this._mqtt_client = undefined;
        }
        this._mqtt_client = mqtt.default.connect(url);
        this._mqtt_listener = new MqttEventListener(this._mqtt_client, this._event_system, this.get_mqtt_cmd.bind(this));

        this._mqtt_client.on("connect", () => {
            console.log("Connect is fun");
        });

        this._mqtt_client.on("message", (topic, message) => {
            console.log(topic, message.toString());
        });          
    }

    public send(command_id: string, command_value: number) {
        if (this._mqtt_client == null) return;

        this._mqtt_client.publish(this.get_mqtt_cmd(command_id),  command_value.toString() );
    }

    public disconnect() {
        this._mqtt_client?.end();
    }

    public get_mqtt_cmd(cmd_message_id: string) {
        return cmd_message_id.replace("{0}", this._client_id);
    }
}