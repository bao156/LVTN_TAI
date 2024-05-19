import React from 'react'
import { Province } from '../../components'
import { text } from '../../ultils/constant'
import { List, Pagination } from './index'


const FavoritePostsPage = () => {
    return (
        <div className='w-full flex flex-col gap-3 ' >
            <div>
                <h1 className='text-[28px] font-bold' >{text.HOME_TITLE}</h1>
                <p className='text-base text-gray-700'>{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className='w-full flex gap-3'>
                <div className='w-[75%]'>
                    <List isFavoritePostPage={true}/>
                    <Pagination />
                </div>
            </div>

        </div>
    )
}

export default FavoritePostsPage