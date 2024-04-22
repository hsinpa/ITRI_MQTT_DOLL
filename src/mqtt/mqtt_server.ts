import * as mqtt from 'mqtt';

export class MQTT_Server {
    connect(url: string) {
        const client = mqtt.default.connect(url);
    }
}