import * as mqtt from 'mqtt';
import { MQTTFrontModeOut } from '../data/static_config';

export class MQTTServer {
    private _mqtt_client: mqtt.MqttClient | undefined;
    private _client_id: string = "1";

    connect(url: string) {
        this._mqtt_client = mqtt.default.connect(url);

        this._mqtt_client.on("connect", () => {
            console.log("Connect is fun");
        });
    }

    send() {
        if (this._mqtt_client == null) return;

        console.log(this.get_mqtt_cmd(MQTTFrontModeOut.ID));
        this._mqtt_client.publish(this.get_mqtt_cmd(MQTTFrontModeOut.ID),  MQTTFrontModeOut.Idle.toString() );
    }

    private get_mqtt_cmd(cmd_message_id: string) {
        return cmd_message_id.replace("{0}", this._client_id);
    }
}