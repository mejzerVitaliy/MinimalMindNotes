import React from 'react'

interface SearcherPropsTypes {
    onChangeSearcher: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    onChangeSorter: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value?: string
    option1: string
    option2: string
    option3: string
    option4: string
}

const Searcher: React.FC<SearcherPropsTypes> = ({onChangeSearcher, onChangeSorter, value, option1, option2, option3, option4}) => {
    return (
        <article className=' relative'>
            <textarea
                onChange={onChangeSearcher}
                placeholder='search...'
                className=" relative border-2 border-gray-500 rounded-2xl w-[927.2px] h-[60px] box-border resize-none flex items-center bg-[#525252] px-5 mb-5 text-center text-white text-[24px] leading-10 italic overflow-hidden"
                maxLength={67}
                value={value}
            >
            </textarea>
            
            <select
                className=" absolute right-2 top-2 h-[40px] rounded-[30px] bg-[#888] text-white border-solid border-gray-600 px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b6b6b6]"
                onChange={onChangeSorter}
            >
                <option>{option1}</option>
                <option>{option2}</option>
                <option>{option3}</option>
                <option>{option4}</option>
            </select>
        </article>
        
    )
}

export default Searcher