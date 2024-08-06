import React from 'react'
import Navbar from '../../UI/Navbar/Navbar'
import FormButton from '../../UI/Button/FormButton'
import { useNavigate } from 'react-router-dom'
import cl from './AboutPage.module.scss'

const AboutPage: React.FC = () => {
    const navigate = useNavigate()

    const back = () => {
        navigate('/myNotes')
    }
    
    return (
        <main>
            <Navbar title='About MinimalMind' />
            
            <FormButton onClick={back} className={cl.back}>
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

                <article  data-aos="zoom-in-down">

                    <h2>Technologies Used:</h2>

                    <ul>
                        <li className={cl.technologies}>
                            <h3 data-aos="fade-right" data-aos-duration="1000">Languages:</h3>
                            <ul data-aos="zoom-out-up" className={cl.technologi}>
                                <li><a target='_blank' href="https://www.typescriptlang.org/"><b>TypeScript (TS):</b></a> The application is built with TypeScript, ensuring type safety and better code quality.</li>
                                <li><a target='_blank' href="https://sass-lang.com/"><b>SCSS:</b></a> For enhanced styling capabilities, we use SCSS, which allows for more organized and modular CSS.</li>
                                <li><a target='_blank' href="https://tailwindcss.com/"><b>Tailwind CSS:</b></a> Tailwind CSS is utilized for utility-first styling, enabling rapid UI development with a consistent design system.</li>
                            </ul>
                        </li>
                        

                        <li className={cl.technologi}>
                            <h3 data-aos="fade-right" data-aos-duration="1000">Frameworks:</h3>
                            <ul data-aos="zoom-out-up" className={cl.technologi}>
                                <li><a target='_blank' href="https://react.dev/"><b>React: </b></a> The application is powered by React, a popular JavaScript library for building user interfaces.</li>
                            </ul>
                        </li>
                        

                        <li className={cl.technologi}>
                            <h3 data-aos="fade-right" data-aos-duration="1000">Routing:</h3>
                            <ul data-aos="zoom-out-up" className={cl.technologi}>
                                <li><a target='_blank' href="https://reactrouter.com/en/main"><b>React Router DOM:</b></a> For seamless navigation and routing within the application, i used React Router DOM.</li>
                            </ul>
                        </li>
                        

                        <li className={cl.technologi}>
                            <h3 data-aos="fade-right" data-aos-duration="1000">Forms:</h3>
                            <ul data-aos="zoom-out-up" className={cl.technologi}>
                                <li><a target='_blank' href="https://react-hook-form.com/"><b>React Hook Form:</b></a> This library is used for managing form state and validation, making form handling more efficient and less error-prone.</li>
                            </ul>
                        </li>
                        

                        <li className={cl.technologi}>
                            <h3 data-aos="fade-right" data-aos-duration="1000"> Animations: </h3>
                            <ul data-aos="zoom-out-up" className={cl.technologi}>
                                <li><a target='_blank' href="https://michalsnik.github.io/aos/"><b>AOS (Animate on Scroll):</b></a> To add appealing animations as users scroll through the app, we utilize AOS, providing smooth visual effects that enhance the user experience.</li>
                            </ul>
                        </li>
                        

                        <li className={cl.technologi}>
                            <h3 data-aos="fade-right" data-aos-duration="1000">API Requests:</h3>
                            <ul data-aos="zoom-out-up" className={cl.technologi}>
                                <li><a target='_blank' href="https://axios-http.com/"><b>Axios:</b></a>  For handling API requests, we rely on Axios, which simplifies the process of communicating with the server.</li>
                            </ul>
                        </li>
                        

                        <li className={cl.technologi}>
                            <h3 data-aos="fade-right" data-aos-duration="1000">Database:</h3>
                            <ul data-aos="zoom-out-up" className={cl.technologi}>
                                <li><a target='_blank' href="https://www.npmjs.com/package/json-server"><b>JSON Server:</b></a>  The application uses JSON Server as a mock backend to simulate API interactions and store data persistently during development.</li>
                            </ul>
                        </li>
                        
                    </ul>

                </article>

                <hr />

                <h2>Code of this project</h2>
                <h4>You can view code in <a href="https://github.com/mejzerVitaliy/MinimalMindNotes">my Github repository</a></h4>
                
                
            </section>
            
        </main>
    )
}

export default AboutPage