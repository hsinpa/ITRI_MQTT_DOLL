import '../assets/scss/header.scss'
import { useNavigate } from 'react-router-dom';
import back_texture from '../assets/texture/sprite/return.png';

export const PageHeader = function({title} : {title: string}) {
    const navigate = useNavigate();

    return(
    <div className='page_header'>
        
        <div className='inner_header'>
            
        <div className="page_header_empty">
            <button onClick={() => navigate(-1)}><img src={back_texture}></img></button>
        </div>

        <h2 className=''>{title}</h2>

        <div className="page_header_empty"></div>
        
        </div>
    </div>
    );
}