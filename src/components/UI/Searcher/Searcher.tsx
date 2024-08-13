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
        <section className='relative w-[100%]'>
            <textarea
                onChange={onChangeSearcher}
                placeholder='search...'
                className=" relative border-2 text border-gray-500 rounded-2xl w-full h-[35px] md:h-[45px] box-border resize-none flex items-center bg-[#525252] px-5 text-center text-white text-[24px] leading-8 italic overflow-hidden placeholder:text-sm md:placeholder:text-lg"
                maxLength={67}
                value={value}
            >
            </textarea>
            
            <select
                className=" absolute right-2 top-1 bottom-1 w-12 md:w-16 h-[25px] md:h-[35px] text-[12px] md:text-[20px] rounded-[30px] bg-[#888] text-white border-solid border-gray-600 px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b6b6b6]"
                onChange={onChangeSorter}
            >
                <option>{option1}</option>
                <option>{option2}</option>
                <option>{option3}</option>
                <option>{option4}</option>
            </select>
        </section>
        
    )
}

export default Searcher