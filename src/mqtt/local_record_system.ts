import { json } from "react-router-dom";
import { HistoryRecord } from "../data/static_share_varaible";
import { AccountSystem } from "../utility/AccountSystem";
import { API, Get_API } from "../data/api_static";
import { FormatString } from "../utility/UtilityFunc";

const KEY = 'records';
export class LocalStorageSystem {
    private _local_records: HistoryRecord[] = [];
    private _account: AccountSystem;

    constructor(account: AccountSystem) {
        this._account = account;
        let records = localStorage.getItem(KEY);
        
        if (records != null) {
            this._local_records = JSON.parse(records);
        }

        let info = this.account.get_info();
        console.log(info);
    }

    get account() {
        return this._account;
    }

    async get_records(): Promise<HistoryRecord[] | null> {
        let info = this.account.get_info();
        let token = await this.account.get_token();

        try {
            if (info != null && token != null) {            
                let url =  Get_API(API.ReadData);
                let fetch_r = await fetch(url, {headers: {'Content-Type': 'application/json' },
                    method:'post',
                    body: JSON.stringify({'token': token, 'caregiverId':info.id, 'hospitalId': info.hospitalId })
                });
    
                let fetch_json = await fetch_r.json();
                return fetch_json['data'];
            }
        } catch {

        }

        return null;
    }

    async push_records(h_record: HistoryRecord) {
        // this._local_records = [...this._local_records, h_record];
        // localStorage.setItem(KEY, JSON.stringify(this._local_records));
        let info = this.account.get_info();
        let token = await this.account.get_token();
        let incremental_id_str = localStorage.getItem('incremental_id') || '1';
        let incremental_id = Number.parseInt(incremental_id_str);

        if (info != null && token != null) {
            h_record.remark = info.name + " " + incremental_id;
            h_record.caregiverId = info.id;
            
            let url =  Get_API(FormatString(API.UploadData, [info.hospitalId, token]));
            let fetch_r =  await fetch(url, {headers: {'Content-Type': 'application/json', 'Authorization': token },
                        method:'post',
                        body: JSON.stringify(h_record)})

            console.log(await fetch_r.json());

            localStorage.setItem('incremental_id', (incremental_id).toString());
        }
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