import React from 'react'

interface TechnoLiPropsTypes{
    nameOfTechno: string
    technoLink1:string    
    technoLink2?:string
    technoLink3?:string
    technoLi1: string
    technoLi2?: string
    technoLi3?: string
    technoLip1: string
    technoLip2?: string
    technoLip3?: string
}

const TechnoLi: React.FC<TechnoLiPropsTypes> = ({
    nameOfTechno,
    technoLink1,
    technoLink2,
    technoLink3,
    technoLi1,
    technoLi2,
    technoLi3,
    technoLip1,
    technoLip2,
    technoLip3
}) => {
    return (
        <li className='my-6 mx-4'>
            <h3 data-aos="fade-right" data-aos-duration="1000" className='text-[14px] sm:text-[18px] lg:text-[22px]'>{nameOfTechno}:</h3>
            <ul data-aos="zoom-out-up" className='m-[8px-24px]'>
                <li className='text-[12px] sm:text-[16px] lg:text-[20px]'><a className='text-[#5f72ff] transition-colors hover:text-violet-600' target='_blank' href={technoLink1}><b className='text-[14px] sm:text-[18px] lg:text-[22px]'>{technoLi1}:</b></a> {technoLip1}</li>
                {technoLi2 && 
                    <li className='text-[12px] sm:text-[16px] lg:text-[20px]'><a className='text-[#5f72ff] transition-colors hover:text-violet-600' target='_blank' href={technoLink2}><b className='text-[14px] sm:text-[18px] lg:text-[22px]'>{technoLi2}:</b></a> {technoLip2}</li>
                }
                {technoLi3 &&
                    <li className='text-[12px] sm:text-[16px] lg:text-[20px]'><a className='text-[#5f72ff] transition-colors hover:text-violet-600' target='_blank' href={technoLink3}><b className='text-[14px] sm:text-[18px] lg:text-[22px]'>{technoLi3}:</b></a> {technoLip3}</li>
                }
                
            </ul>
        </li>
    )
}
export default TechnoLi
