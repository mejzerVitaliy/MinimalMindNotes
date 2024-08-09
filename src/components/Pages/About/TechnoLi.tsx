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
        <li className='m-4'>
            <h3 data-aos="fade-right" data-aos-duration="1000">{nameOfTechno}:</h3>
            <ul data-aos="zoom-out-up" className='m-[8px-24px]'>
                <li><a className='text-[#5f72ff] transition-colors hover:text-violet-600' target='_blank' href={technoLink1}><b>{technoLi1}:</b></a> {technoLip1}</li>
                {technoLi2 && 
                    <li><a className='text-[#5f72ff] transition-colors hover:text-violet-600' target='_blank' href={technoLink2}><b>{technoLi2}:</b></a> {technoLip2}</li>
                }
                {technoLi3 &&
                    <li><a className='text-[#5f72ff] transition-colors hover:text-violet-600' target='_blank' href={technoLink3}><b>{technoLi3}:</b></a> {technoLip3}</li>
                }
                
            </ul>
        </li>
    )
}
export default TechnoLi
