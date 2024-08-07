import React, { ReactNode } from 'react'
import cl from './Modal.module.scss'

interface ModalPropsTypes{
    style?: {}
    message?: string
    message2?: string
    children?: ReactNode
    onClose?: () => void
}

const Modal: React.FC<ModalPropsTypes> = ({style, message, message2, children, onClose}) => {
    const closeModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && onClose) {
            return onClose()
        }
    }
    return (
        <main className={cl.modalPage}  onClick={closeModal}>
            <section className={cl.modalWindow} style={style}>
                <h3>{message}</h3>
                <h5><u>{message2}</u></h5>
                <hr />
                <div className={cl.buttons}>
                    {children}
                </div>
                
            </section>
        </main>
    )
}

export default Modal