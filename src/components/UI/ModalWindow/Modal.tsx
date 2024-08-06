import React, { ReactNode } from 'react'
import cl from './Modal.module.scss'

interface ModalPropsTypes{
    style?: {}
    message?: string
    children?: ReactNode
    onClose?: () => void
}

const Modal: React.FC<ModalPropsTypes> = ({style, message, children, onClose}) => {
    const closeModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && onClose) {
            return onClose()
        }
    }
    return (
        <main className={cl.modalPage}  onClick={closeModal}>
            <section className={cl.modalWindow} style={style}>
                <h3>{message}</h3>
                <hr />
                <div className={cl.buttons}>
                    {children}
                </div>
                
            </section>
        </main>
    )
}

export default Modal