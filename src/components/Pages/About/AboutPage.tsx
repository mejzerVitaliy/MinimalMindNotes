import React from 'react'
import useBackTo from '../../../hooks/useBackTo'
import Navbar from '../../UI/Navbar/Navbar'
import Technologies from './Technologies'

const AboutPage: React.FC = () => {
    const BackToMenu = useBackTo('/myNotes')
    const currentTheme = localStorage.getItem('theme')

    return (
        <main className="flex justify-center w-full">
            <Navbar title='About' />

            <button 
                onClick={BackToMenu} 
                className="fixed z-[1000] top-20 md:top-16 lg:top-20 left-3 p-0 m-0 bg-transparent border-none cursor-pointer transition-transform duration-200 hover:scale-125"
            >
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.33337 22L6.62627 21.2929L5.91916 22L6.62627 22.7071L7.33337 22ZM34.8334 23C35.3857 23 35.8334 22.5523 35.8334 22C35.8334 21.4477 35.3857 21 34.8334 21V23ZM17.6263 10.2929L6.62627 21.2929L8.04048 22.7071L19.0405 11.7071L17.6263 10.2929ZM6.62627 22.7071L17.6263 33.7071L19.0405 32.2929L8.04048 21.2929L6.62627 22.7071ZM7.33337 23H34.8334V21H7.33337V23Z"
                        fill={ currentTheme === 'dark' ? "#DDDDDD" : '#000'}
                    />
                </svg>
            </button>

            <section
                className={currentTheme === 'dark' ? " flex flex-col items-center justify-center text-[16px] text-left mt-20 mb-8 w-4/5 sm:w-4/5 sm:mt-24 p-3 border-2 border-double border-[#525252] rounded-[30px] backdrop-blur-2xl " : " flex flex-col items-center justify-center text-left text-[16px] mt-20 mb-8 w-4/5 sm:w-4/5 sm:mt-24 p-3 border-2 border-double border-[#525252] rounded-[30px] backdrop-blur-2xl text-black" }   
            >
                <h1 className="text-center text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[50px] xl:animate-[titleAnim_2s_ease-in] font-bold underline">
                    About MinimalMind
                </h1>

                <hr className="w-full my-2" />

                <h2 className="text-center text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px]">Application Description: </h2>
                <h4 className='text-[12px] sm:text-[16px] lg:text-[20px]'>Welcome to MinimalMind — a modern and user-friendly application for creating and managing notes. Our app is designed for those who value simplicity and functionality.</h4>

                <h3 className='text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px]'>Key Features:</h3>
                <ul className='m-3'>
                    <li className='text-[12px] sm:text-[16px] lg:text-[20px]' ><b>Create, Edit, and Delete Notes:</b> Easily add new notes, edit existing ones, or delete those you no longer need. Your information is always at your fingertips.</li>
                    <li className='text-[12px] sm:text-[16px] lg:text-[20px]' ><b>Authentication:</b> Log in to your account to access your notes from any device. Your data is secure and accessible only to you.</li>
                    <li className='text-[12px] sm:text-[16px] lg:text-[20px]' ><b>Theme Selection:</b> We care about your comfort, so we offer the option to switch between light and dark themes. Change themes according to your mood or environment.</li>
                    <li className='text-[12px] sm:text-[16px] lg:text-[20px]' ><b>Beautiful Animations:</b> Pleasant and unobtrusive animations make interacting with the app even more enjoyable. Every action you take is accompanied by smooth transitions and effects.</li>
                </ul>

                <h4 className='text-[12px] sm:text-[16px] lg:text-[20px]'>MinimalMind — your essential tool for quickly saving and organizing thoughts. Enjoy simplifying your life with our application!</h4>

                <hr className="w-full my-2" />

                <Technologies />

                <hr className="w-full my-2" />

                <h2 className='text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px]'>Code of this project</h2>
                <h4 className='text-[12px] sm:text-[16px] lg:text-[20px]' >You can view code in <a href="https://github.com/mejzerVitaliy/MinimalMindNotes" className="text-[#5f72ff] transition-color duration-300 hover:text-violet-600">my Github repository</a></h4>    
            </section>
        </main>
    )
}
export default AboutPage
