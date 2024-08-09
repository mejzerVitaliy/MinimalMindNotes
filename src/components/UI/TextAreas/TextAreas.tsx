import React from 'react'

interface TextAreaPropsTypes{
    className1?: string
    className2: string
    className3: string
    onChange2: React.ChangeEventHandler<HTMLTextAreaElement>
    onChange3: React.ChangeEventHandler<HTMLTextAreaElement>
}

const TextAreas: React.FC<TextAreaPropsTypes> = ({className1, className2, className3, onChange2, onChange3 }) => {
    return (
        <main className={className1}>
            <textarea
                maxLength={40}
                className={className2}
                placeholder="title of note"
                onChange={onChange2}
            ></textarea>

            <textarea
                className={className3}
                placeholder="description"
                onChange={onChange3}
            ></textarea>
        </main>
    )
}

export default TextAreas