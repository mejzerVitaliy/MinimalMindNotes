import React from 'react'
import cl from './Searcher.module.scss'

interface SearcherPropsTypes {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    value?: string
}

const Searcher: React.FC<SearcherPropsTypes> = ({onChange, value}) => {
    return (
        <textarea
            onChange={onChange}
            placeholder='search...'
            className={cl.searcher}
            maxLength={67}
            value={value}
        ></textarea>
    )
}

export default Searcher