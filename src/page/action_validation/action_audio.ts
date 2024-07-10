import { AudioEventID } from "../../data/audio_static";
import { Rule_Type } from "../../data/mqtt_action_rules";
import EventSystem from "../../utility/EventSystem";

export class ActionAudioHandler {

    private _event_system: EventSystem;
    private _interval_id : NodeJS.Timeout | null;
    private _frame_loop_id: string | undefined;
    private _frame_ignore: boolean = true;

    constructor(event_system: EventSystem) {
        this._event_system = event_system;
        this._interval_id = setInterval(this.frame_loop.bind(this), 5000);
    }

    set_loop_audio(id: string) {
        this._frame_loop_id = id;
    }

    play(rule: Rule_Type) {
        this._frame_ignore = true;

        if (rule.sound_effect == null) return;

        for (let i = 0; i < rule.sound_effect.length; i++) {
            this._event_system.Notify(AudioEventID.ID, rule.sound_effect[i]);
        }
    }

    dispose() {
        this._frame_loop_id = undefined;
        if (this._interval_id != null)
            clearInterval(this._interval_id);
    }

    private frame_loop() {
        if (this._frame_ignore) {
            this._frame_ignore = false;
            return;
        }

        if (this._frame_loop_id == undefined) return;

        this._event_system.Notify(AudioEventID.ID, this._frame_loop_id);
    }
}