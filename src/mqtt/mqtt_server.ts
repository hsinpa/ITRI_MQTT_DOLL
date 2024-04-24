import * as mqtt from 'mqtt';

export class MQTTServer {
    private _mqtt_client: mqtt.MqttClient | undefined;
    private _client_id: string = "1";

    connect(url: string) {
        this._mqtt_client = mqtt.default.connect(url);

        this._mqtt_client.on("connect", () => {
            console.log("Connect is fun");
        });
    }

    send(command_id: string, command_value: number) {
        if (this._mqtt_client == null) return;

        this._mqtt_client.publish(this.get_mqtt_cmd(command_id),  command_value.toString() );
    }

    private get_mqtt_cmd(cmd_message_id: string) {
        return cmd_message_id.replace("{0}", this._client_id);
    }
}