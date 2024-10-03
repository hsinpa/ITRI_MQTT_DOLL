import { AudioEventID } from "../../data/audio_static";
import EventSystem from "../EventSystem";
import {Howl, Howler} from 'howler';

export interface AudioInterface {
    audio: string,
    force_play?: boolean
}

export default class AudioSystem {
    private _event_system: EventSystem;

    private c_howl: Howl | undefined = undefined;
    private c_audio: AudioInterface | undefined = undefined;
    private n_audio: AudioInterface | undefined = undefined;
    private _folder:string = 'audio_files/tw/';

    constructor(event_system: EventSystem) {
        this._event_system = event_system;
        this._event_system.ListenToEvent(AudioEventID.ID, this.set_listener.bind(this));
    }

    set_listener(event_id: string, audio_interface: AudioInterface) {
        if (audio_interface == null) return;
        console.log(this.c_audio)

        if (this.c_audio != undefined && this.c_audio.force_play && audio_interface.force_play) {
            this.n_audio = audio_interface;
            return;
        }

        if (audio_interface.force_play != undefined && audio_interface.force_play) {
            this.n_audio = undefined;

            if (this.c_howl != undefined) this.c_howl.stop();

            this.play_audio(audio_interface);
            return;
        }

        // The same as the current one
        if (this.c_audio?.audio == audio_interface.audio || audio_interface.audio == null) return;

        if (this.c_audio == undefined) {
            this.play_audio(audio_interface);
            return    
        }

        this.n_audio = audio_interface;
    }

    play_audio(audio_src: AudioInterface) {
        this.c_audio = audio_src;
        this.c_howl = new Howl({
            src: [this._folder + audio_src.audio]
        });
        this.c_howl.play();

        this.c_howl.on('end', () => {
            this.c_audio = undefined;

            if (this.c_howl != undefined)
                this.c_howl.unload();

            if (this.n_audio != undefined) {
                this.play_audio(this.n_audio);
                this.n_audio = undefined;
            }
        });
    }

    set_folder(folder: string) {
        this._folder = folder;
    }
}