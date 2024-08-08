import React from 'react'
import useBackTo from '../../../hooks/useBackTo'
import FormButton from '../../UI/Button/FormButton'
import Navbar from '../../UI/Navbar/Navbar'
import cl from './AboutPage.module.scss'
import Technologies from './Technologies'

const AboutPage: React.FC = () => {
    const BackToMenu = useBackTo('/myNotes')
    return (
        <main>
            <Navbar title='About MinimalMind' />
            
            <FormButton onClick={BackToMenu} className={cl.back}>
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.33337 22L6.62627 21.2929L5.91916 22L6.62627 22.7071L7.33337 22ZM34.8334 23C35.3857 23 35.8334 22.5523 35.8334 22C35.8334 21.4477 35.3857 21 34.8334 21V23ZM17.6263 10.2929L6.62627 21.2929L8.04048 22.7071L19.0405 11.7071L17.6263 10.2929ZM6.62627 22.7071L17.6263 33.7071L19.0405 32.2929L8.04048 21.2929L6.62627 22.7071ZM7.33337 23H34.8334V21H7.33337V23Z"
                        fill="#DDDDDD"
                    />
                </svg>
            </FormButton>

            <section className={cl.content}>
                <h1 className={cl.title}><b><u>About MinimalMind</u></b></h1>

                <hr />

                <h2>Application Description: </h2>
                <h4>Welcome to MinimalMind — a modern and user-friendly application for creating and managing notes. Our app is designed for those who value simplicity and functionality.</h4>

                <h3>Key Features:</h3>
                <ul>
                    <li><b>Create, Edit, and Delete Notes:</b> Easily add new notes, edit existing ones, or delete those you no longer need. Your information is always at your fingertips.</li>
                    <li><b>Authentication:</b> Log in to your account to access your notes from any device. Your data is secure and accessible only to you.</li>
                    <li><b>Theme Selection:</b> We care about your comfort, so we offer the option to switch between light and dark themes. Change themes according to your mood or environment.</li>
                    <li><b>Beautiful Animations:</b> Pleasant and unobtrusive animations make interacting with the app even more enjoyable. Every action you take is accompanied by smooth transitions and effects.</li>
                </ul>

                <h4>MinimalMind — your essential tool for quickly saving and organizing thoughts. Enjoy simplifying your life with our application!</h4>

                <hr />

                <Technologies />

                <hr />

                <h2>Code of this project</h2>
                <h4>You can view code in <a href="https://github.com/mejzerVitaliy/MinimalMindNotes">my Github repository</a></h4>    
            </section>
        </main>
    )
}
export default AboutPage