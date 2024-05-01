import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'

export const ActionPage = function() {

    return (
        <div id="action_page">

            <div className='action_comp'>
                <Link className='button' to='/material_page'>培訓教材</Link>
                <Link className='button' to='#'>自訂教材</Link>
            </div>
        </div>
    )
}