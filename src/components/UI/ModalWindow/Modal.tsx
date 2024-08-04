import React from 'react'
import cl from './Modal.module.scss'

interface ModalPropsTypes{
    style?: {}
    message?: string
}

const Modal: React.FC<ModalPropsTypes> = ({style, message}) => {
    return (
        <main className={cl.modalPage} style={style}>
            <section className={cl.modalWindow}>
                <h2>{message}</h2>
            </section>
        </main>
    )
}

export default Modal