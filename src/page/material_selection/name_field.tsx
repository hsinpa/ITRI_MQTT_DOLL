import { useState } from "react";
import { useTempUserInfoStore } from "../../stores/user_stores";
import { AccountSystem } from "../../utility/AccountSystem";

export const Name_Field = function() {
    let name_store = useTempUserInfoStore();
    const [name_focus, set_name_focus] = useState<boolean>(false);
    
    const on_btn_click = function() {
        set_name_focus(true);
    }

    const on_input_change = function(e: React.ChangeEvent<HTMLInputElement>) {
        let dom : HTMLInputElement= e.target as HTMLInputElement;
        name_store.set_name(dom.value);
    }

    const on_input_blur = function(e: React.FocusEvent<HTMLInputElement>) {
        set_name_focus(false);
    }

    let default_name_dom = <p>{name_store.name}</p>
    if (name_focus) {
        default_name_dom = (<input type='text' onBlur={on_input_blur} onChange={on_input_change} value={name_store.name} 
        autoFocus={true}></input>);
    }

    return (
        <div className='button' onClick={on_btn_click}>{default_name_dom}</div>
    )

}