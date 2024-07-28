import React from 'react'
import FormButton from './UI/Button/FormButton'

interface NotesPropsTypes{
    title?: string ,
    id?: number,
    className?: string
}

const Notes: React.FC<NotesPropsTypes> = ({title}) => {
    return (
        <main title={title}>
            <h3>{title}</h3>
            <FormButton>delete</FormButton>
        </main>
    )
}

export default Notes