import * as mqtt from 'mqtt';
import { MCUResultInEvent } from '../data/static_flow_variable';
import EventSystem from '../utility/EventSystem';
import { MqttEventListener } from './mqtt_listener';
import { LocalStorageKey, MQTTFrontModeOut } from '../data/static_share_varaible';

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

    get client_id(): string {
        return this._client_id;
    }

    constructor(event_system: EventSystem) {
        this._event_system = event_system;

        let doll_id = localStorage.getItem(LocalStorageKey.DOLL_ID);
        if (doll_id !=  null) this._client_id = doll_id;
    }

    set_client_id(id: string) {
        this._client_id = id;
        localStorage.setItem(LocalStorageKey.DOLL_ID, this._client_id);
    }

    connect(url: string) {
        if (this._mqtt_client != undefined && !this._mqtt_client.disconnected) {
            return;
        }

        this._mqtt_client = mqtt.default.connect(url);
        this._mqtt_listener = new MqttEventListener(this._mqtt_client, this._event_system, this.get_mqtt_cmd.bind(this));

        this._mqtt_client.on("connect", () => {
            console.log("Connect is fun");
        });

        this._mqtt_client.on("message", (topic, message, packet) => {
            //console.log(topic, message.toString());

            this._mqtt_listener?.on_message(topic, message, packet);
        });          
    }

    public to_default() {
        this.send(MQTTFrontModeOut.ID, MQTTFrontModeOut.Idle);
    }

    public send(command_id: string, command_value: number) {
        if (this._mqtt_client == null) return;
        
        let cmd_id =  this.get_mqtt_cmd(command_id);
        console.log(`Event Send ${cmd_id}, ${command_value}`);

        this._mqtt_client.publish(cmd_id,  command_value.toString() );
    }

    public disconnect() {
        this._mqtt_client?.end();
        this._mqtt_client = undefined;
    }

    public get_mqtt_cmd(cmd_message_id: string) {
        return cmd_message_id.replace("{0}", this._client_id);
    }
}