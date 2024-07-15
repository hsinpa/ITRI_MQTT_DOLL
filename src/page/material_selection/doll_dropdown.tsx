import store from "store2";
import { DoDelayAction } from "../../utility/UtilityFunc";
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="dropdown doll-dropdown" >
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