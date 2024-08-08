import React from 'react'
import TechnoLi from './TechnoLi'

const Technologies: React.FC = () => {
    return (
        <article  data-aos="zoom-in-down">

            <h2>Technologies Used:</h2>
            <ul>

                <TechnoLi
                    nameOfTechno='Languages'
                    technoLink1="https://www.typescriptlang.org/"
                    technoLink2='https://sass-lang.com/'
                    technoLink3='https://tailwindcss.com/'
                    technoLi1='TypeScript (TS)'
                    technoLi2='SCSS'
                    technoLi3='Tailwind CSS'
                    technoLip1='The application is built with TypeScript, ensuring type safety and better code quality.'
                    technoLip2='For enhanced styling capabilities, we use SCSS, which allows for more organized and modular CSS.'
                    technoLip3='Tailwind CSS is utilized for utility-first styling, enabling rapid UI development with a consistent design system.'
                />
               
                
                <TechnoLi
                    nameOfTechno='Frameworks'
                    technoLink1='https://react.dev/'
                    technoLi1='React'
                    technoLip1='The application is powered by React, a popular JavaScript library for building user interfaces.'
                />

                <TechnoLi
                    nameOfTechno='Routing'
                    technoLink1='https://reactrouter.com/en/main'
                    technoLi1='React Router DOM'
                    technoLip1='For seamless navigation and routing within the application, i used React Router DOM.'
                />
                
                <TechnoLi 
                    nameOfTechno='Forms'
                    technoLink1='https://react-hook-form.com/'
                    technoLi1='React Hook Form'
                    technoLip1='This library is used for managing form state and validation, making form handling more efficient and less error-prone.'
                />

                <TechnoLi 
                    nameOfTechno='Animations'
                    technoLink1='https://michalsnik.github.io/aos/'
                    technoLi1='AOS (Animate on Scroll)'
                    technoLip1='To add appealing animations as users scroll through the app, we utilize AOS, providing smooth visual effects that enhance the user experience.'
                />
                        
                <TechnoLi 
                    nameOfTechno='API Requests'
                    technoLink1='https://axios-http.com/'
                    technoLi1='AOS (Animate on Scroll)'
                    technoLip1=' For handling API requests, we rely on Axios, which simplifies the process of communicating with the server.'
                />
                        
                <TechnoLi
                    nameOfTechno='Database'
                    technoLink1='https://www.npmjs.com/package/json-server'
                    technoLi1='JSON Server'
                    technoLip1='The application uses JSON Server as a mock backend to simulate API interactions and store data persistently during development.'
                />                       
            </ul>

        </article>
    )
}

export default Technologies