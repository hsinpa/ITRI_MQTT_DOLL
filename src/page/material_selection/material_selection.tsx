import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import { PageHeader } from '../page_header'
import i18next from 'i18next'
import { Material_Table } from '../../data/mqtt_action_table'

export const MaterialSelectionPage = function() {

    return (
        <>
        <PageHeader title={i18next.t('teaching_material')}></PageHeader>
        <div id="material_selection_page">
            <div className='material_selection_comp'>
                <Link className='button' to='/detail_page?name=roll_over'>{i18next.t(Material_Table.roll_over)}</Link>
                <Link className='button' to='#?name=pat_back'>{i18next.t(Material_Table.pat_back)}</Link>
            </div>
        </div>
        </>
    )
}