import i18next from "i18next";
import { Link, useNavigate } from "react-router-dom";
import { AudioEventID, AudioEventValue } from "../../data/audio_static";
import EventSystem from "../../utility/EventSystem";
import itri_logo from '../../assets/texture/sprite/itri-logo.png';
import { fetch_json } from "../../utility/HttpFunc";
import { API, Get_API } from "../../data/api_static";
import { useEffect, useState } from "react";
import store from "store2";
import { AccountSystem } from "../../utility/AccountSystem";

export const LoginPage = function({event_system, account_system}: {event_system: EventSystem, account_system: AccountSystem}) {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

    let on_login_valid = function() {

    }

    let on_login_click = async function() {
        let login_btn = document.querySelector<HTMLButtonElement>('.login_btn');
        let email_dom = document.querySelector<HTMLButtonElement>('input[type="email"]');
        let password_dom = document.querySelector<HTMLButtonElement>('input[type="password"]');
        setErrorMsg('')

        if (login_btn == undefined || email_dom == undefined || password_dom == undefined)
            return;
        
        if (email_dom.value == '' ||  password_dom.value == '') {
            setErrorMsg('帳號密碼不能為空')
            return;
        }

        login_btn.disabled = true;
        let result = await account_system.login(email_dom.value, password_dom.value)

        if (result) {
            event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event002_線上模式起動});
            navigate('/action_page')
            return;
        }

        try {
            // let result = await fetch_json(Get_API(API.Login), 'post', {'email': email_dom.value, 'password': password_dom.value});
            
            // if (result['success']) {
            //     store.set('email', email_dom.value);
            //     store.set('user_id', result['data']['id']);
            //     store.set('name', result['data']['name']);

            //     event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event002_線上模式起動});
            //     navigate('/action_page')
            //     return;
            // }

        } catch(e) {
            // event_system.Notify(AudioEventID.ID, {audio: AudioEventValue.Event002_線上模式起動});
            // navigate('/action_page')
        }

        setErrorMsg('帳號密碼錯誤')
        login_btn.disabled = false;
    }

    let auto_login = async function() {
        let token = await account_system.refresh_token();

        if (token != null) {
            event_system.Notify(AudioEventID.ID, {audio:AudioEventValue.Event002_線上模式起動});
            navigate('/action_page')
        }
    }

    useEffect( () => {
        auto_login();
    }, []);

    return (
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
            <input className='input' type="password" placeholder='*******'></input>
            </div>
            {/* <Link className='forget_password' to='/#forget_password'>{i18next.t('forget_password')}</Link> */}
            <button className='button login_btn' onClick={on_login_click}>{i18next.t('login')}</button>
            {/* <Link className='button' to='/register'>{i18next.t('register')}</Link> */}
      </div>
    );
}