import store from "store2";
import { AccountInterface, API, Get_API } from "../data/api_static";
import { fetch_json } from "./HttpFunc";

export class AccountSystem {

    async get_token() {
        let token = store.get('token');
        let expired_date = store.get('expired_date');

        if (token != undefined) {
            var current_timestamp = Math.floor(new Date().getTime() / 1000);

            //EXpired
            if (current_timestamp > expired_date) {
                return await this.refresh_token();
            } else {
                // Valid
                return token;
            }
        }

        return null;
    }

    async refresh_token(): Promise<string | null> {
        let info: AccountInterface = store.get('info');

        if (info != null) {
            let success_login = await this.login(info.email, info.password);

            if (success_login)
                return store.get('token');
        }

        return null;
    }

    get_info() {
        let info: AccountInterface = store.get('info');
        if (info == undefined) {
            return null;   
        }

        return info;
    }

    async login(email: string, password: string) {
        try {
            let result = await fetch_json(Get_API(API.Login), 'post', {'email': email, 'password': password});
            var now = new Date();

            var one_hour_timestamp = Math.floor((new Date(now.getTime() + 60 * 60000)).getTime()/ 1000);
          
            if (result['success']) {
                let info: AccountInterface = {
                    email: email,
                    password: password,
                    hospitalId: result['data']['hospitalId'],
                    id: result['data']['id'],
                    name: result['data']['name'],
                }

                store.set('info', info);
                store.set('token', result['token']);
                store.set('expired_date', one_hour_timestamp);

                return true;
            }
        } catch(e) {
            console.error('Login failed', e);
        }
        return false;
    }
}