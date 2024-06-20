import no_icon from '../../assets/texture/sprite/icon_no.png';
import yes_icon from '../../assets/texture/sprite/icon_yes.png';

export const ValidationComponent = function({name, id, on_click, progress} : 
                                            {name: string, id: number, on_click: (id: number) => void, progress: number}) {
    const progress_value = Math.round(progress * 100);
    const progress_text = progress_value + "%";

    let icon = (progress == 1) ? yes_icon : no_icon;

    const progress_style = {
        width: progress_text
    }


    return (
        <div className="validation_component" data-id={id}>
            <div className="validation_label" onClick={() => on_click(id) }>{name}</div>
            <div className='progress_bar'>
                <progress className="progress is-large" value={progress_value} max="100"></progress>
                <span>{progress_text}</span>
            </div>
            <div className="validation_progress" ><img src={icon}></img> <span>{ progress_text }</span></div>

        </div>
    ) 
}