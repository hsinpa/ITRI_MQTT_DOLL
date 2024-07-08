import { AudioEventID } from "../../data/audio_static";
import EventSystem from "../EventSystem";
import {Howl, Howler} from 'howler';

export default class AudioSystem {
    private _event_system: EventSystem;

    private c_audio: string | undefined = undefined;
    private n_audio: string | undefined = undefined;
    private _folder:string = 'audio_files/tw/';

    constructor(event_system: EventSystem) {
        this._event_system = event_system;
        this._event_system.ListenToEvent(AudioEventID.ID, this.set_listener.bind(this));
    }

    set_listener(event_id: string, audio_id: string) {
        // The same as the current one
        if (this.c_audio == audio_id || audio_id == null) return;

        if (this.c_audio == undefined) {
            this.play_audio(audio_id);
            return    
        }

        this.n_audio = audio_id;
    }

    play_audio(audio_src: string) {
        this.c_audio = audio_src;
        var sound = new Howl({
            src: [this._folder + audio_src]
        });
        sound.play();

        sound.on('end', () => {
            this.c_audio = undefined;

            if (this.n_audio != undefined) {
                this.play_audio(this.n_audio);
                this.n_audio = undefined;
            }

            sound.unload();
        });
    }

    set_folder(folder: string) {
        this._folder = folder;
    }
}