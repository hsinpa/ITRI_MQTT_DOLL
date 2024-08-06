import i18next from "i18next";
import { Link, useNavigate } from "react-router-dom";
import { AudioEventID, AudioEventValue } from "../../data/audio_static";
import EventSystem from "../../utility/EventSystem";
import itri_logo from '../../assets/texture/sprite/itri-logo.png';
import '../../assets/scss/App.scss'
import { useState } from "react";
import { fetch_json } from "../../utility/HttpFunc";
import { API, Get_API } from "../../data/api_static";
import store from "store2";

export const LoginRegister = function({event_system}: {event_system: EventSystem}) {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

    let on_login_click = async function() {
        let login_btn = document.querySelector<HTMLButtonElement>('.register');
        let email_dom = document.querySelector<HTMLButtonElement>('input[type="email"]');
        let password_dom = document.querySelector<HTMLButtonElement>('input[type="password"]');
        let password_confirm_dom = document.querySelector<HTMLButtonElement>('input[name="confirm_password"]');

        setErrorMsg('')

        if (login_btn == undefined || email_dom == undefined || password_dom == undefined || password_confirm_dom == undefined)
            return;

        if (password_confirm_dom.value != password_dom.value) {
            setErrorMsg('密碼和確認密碼不一致')
            return;
        }
        
        login_btn.disabled = true;

        try {
            let result = await fetch_json(Get_API(API.Login), 'post', 
            {'email': email_dom.value, 'password': password_dom.value,
            "permission": "admin", "name": "web", "CountryCode": "ROG", "jobPosition": "doctor", "hospitalId": "web"});
            
            if (result['success']) {
                store.set('email', email_dom.value);
                store.set('user_id', result['data']['id']);
                
                event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event002_線上模式起動});
                navigate('/action_page')
                return;
            }
        } catch {
            event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event002_線上模式起動});
            navigate('/action_page')
        }

        setErrorMsg('帳號密碼錯誤')
        login_btn.disabled = false;
    }

    return (<div id='app_page'>
                <div className='app_action_comp'>
                    <img src={itri_logo}></img>
                    <h1 className='title is-2 has-text-weight-bold'>{i18next.t('home_page_title')}</h1>
                    <h3 className='subtitle is-3 has-text-weight-bold'>{i18next.t('home_page_subtitle')}</h3>
                    <br></br>
                    <div>
                        
                    <p className="error_text">{errorMsg}</p>
                    <p>{i18next.t('email')}</p>
                    <input className='input' type='email' placeholder='example@gmail.com'></input>

                    <p>{i18next.t('password')}</p>
                    <input className='input' name='password' type="password" placeholder='*******'></input>

                    <p>{i18next.t('confirm_password')}</p>
                    <input className='input' name='confirm_password' type="password" placeholder='*******'></input>
                    </div>
                    <button className='button register' onClick={on_login_click}>{i18next.t('submit')}</button>
                    <Link className='button' to='/'>{i18next.t('back')}</Link>
            </div>
        </div>
    );
}