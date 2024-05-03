import no_icon from '../../assets/texture/sprite/icon_no.png';
import yes_icon from '../../assets/texture/sprite/icon_yes.png';

export const ValidationComponent = function({name, id, is_sucess} : {name: string, id: string, is_sucess: boolean}) {

    let icon = (is_sucess) ? yes_icon : no_icon;

    return (
        <div className="validation_component" data-id={id}>
            <div className="validation_label">{name}</div>
            <img src={icon}></img>
        </div>
    )
}