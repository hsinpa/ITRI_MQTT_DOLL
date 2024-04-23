import { MQTTServer } from "./mqtt_server";

export class MQTTQuickCmd {
    private _server: MQTTServer;

    constructor(server: MQTTServer ) {
        this._server = server;
    }


    default_mode() {

    }
}