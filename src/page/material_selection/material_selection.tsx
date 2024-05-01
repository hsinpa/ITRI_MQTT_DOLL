import { Link } from 'react-router-dom'
import '../../assets/scss/material_page.scss'
import { PageHeader } from '../page_header'

export const MaterialSelectionPage = function() {

    return (
        <>
        <PageHeader title='培訓教材'></PageHeader>
        <div id="material_selection_page">
            <div className='material_selection_comp'>
                <Link className='button' to='/education_video?name=roll_over'>翻身</Link>
                <Link className='button' to='#?name=pat_back'>拍背</Link>
            </div>
        </div>
        </>
    )
}