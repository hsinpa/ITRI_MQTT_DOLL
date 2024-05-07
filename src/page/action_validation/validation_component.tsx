import no_icon from '../../assets/texture/sprite/icon_no.png';
import yes_icon from '../../assets/texture/sprite/icon_yes.png';

export const ValidationComponent = function({name, id, on_click, is_success} : {name: string, id: number, on_click: (id: number) => void, is_success: boolean}) {

    let icon = (is_success) ? yes_icon : no_icon;

    console.log(`name ${name}, is_success ${is_success}`)

    return (
        <div className="validation_component" data-id={id}>
            <div className="validation_label" onClick={() => on_click(id) }>{name}</div>
            <img src={icon}></img>
        </div>
    )
}