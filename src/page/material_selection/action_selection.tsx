import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import i18next from 'i18next'

export const ActionPage = function() {

    return (
        <div id="action_page">

            <div className='action_comp'>
                <Link className='button' to='/material_page'>{i18next.t('teaching_material')}</Link>
                <Link className='button' to='#'>{i18next.t('custom_material')}</Link>
            </div>
        </div>
    )
}