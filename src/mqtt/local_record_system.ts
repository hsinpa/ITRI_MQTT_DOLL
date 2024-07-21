import { json } from "react-router-dom";
import { HistoryRecord } from "../data/static_share_varaible";

const KEY = 'records';
export class LocalStorageSystem {
    private _local_records: HistoryRecord[] = [];

    constructor() {
        let records = localStorage.getItem(KEY);
        
        if (records != null) {
            this._local_records = JSON.parse(records);
        }
    }

    get records() {
        return this._local_records;
    }

    push_records(h_record: HistoryRecord) {
        this._local_records = [...this._local_records, h_record];
        localStorage.setItem(KEY, JSON.stringify(this._local_records));
    }

    update_records() {

    }

    delete_records(id: string) {
        for (let i = 0; i < this._local_records.length; i++) {
            if (this._local_records[i].caregiverId == id) {
                this._local_records.splice(i, 1);
                break;
            }
        }

        this._local_records = [...this._local_records];
        localStorage.setItem(KEY, JSON.stringify(this._local_records));
    }
}