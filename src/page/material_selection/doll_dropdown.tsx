import store from "store2";
import { DoDelayAction } from "../../utility/UtilityFunc";
import { Link, useNavigate } from "react-router-dom";
import { Name_Field } from "./name_field";

export const DollDropdown = function({selected_option, options, select_callback}: 
                                    {selected_option: string, options: string[], select_callback: (index: number) => void }) {
    const navigate = useNavigate();

    let drop_down_dom = () => { 
        let dom: JSX.Element[] = []
        
        for (let i = 0; i < options.length; i++) {

            let class_name = (selected_option == options[i]) ? "dropdown-item is-active" : "dropdown-item";

            let option_element = <button className={class_name} key={options[i]} onClick={() => select_callback(i) } >{options[i]}</button>;
            
            dom.push(option_element)
        }

        return dom;
    }
    
    let on_drop_down_click =  function() {
        let dropdown_dom : HTMLDivElement | null = document.querySelector('.doll-dropdown');
        
        if (dropdown_dom != null) dropdown_dom.classList.add('is-active');
    }

    let on_drop_down_blur = async function() {
        await DoDelayAction(200);

        let dropdown_dom : HTMLDivElement | null = document.querySelector('.doll-dropdown');
        
        if (dropdown_dom != null) dropdown_dom.classList.remove('is-active');
    }

    let on_logout = function() {
        store.clearAll();
        navigate('/');
    }

    let on_export = function() {
        let records = localStorage.getItem('records');
        if (records == null) return;

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(records));
        element.setAttribute('download', 'MQTT JSON Record');
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

    return (
        <div className="dropdown doll-dropdown" >
            <Name_Field></Name_Field>
            <Link className='button logout' to='/record_page'>歷史成績</Link>
            <button className='button logout' onClick={on_logout}>登出</button>

            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={on_drop_down_click}  onBlur={on_drop_down_blur}>
                <span>Doll ID: {selected_option}</span>
                <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                {drop_down_dom()}
            </div>
        </div>
    );
}