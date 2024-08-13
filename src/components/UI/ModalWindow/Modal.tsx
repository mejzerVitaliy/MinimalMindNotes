import React, { ReactNode } from 'react';

interface ModalPropsTypes {
    style?: React.CSSProperties;
    message?: string;
    message2?: string;
    children?: ReactNode;
    onClose?: () => void;
}

const Modal: React.FC<ModalPropsTypes> = ({ style, message, message2, children, onClose }) => {
    const closeModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && onClose) {
            return onClose();
        }
    };
    return (
        <main className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-60" onClick={closeModal}>
            <section
                className="relative z-[2100] w-2/3 sm:w-1/2 lg:w-[400px] h-[160px] sm:h-[130px] p-4 text-center bg-[#888888] border-1 border-solid border-black rounded-2xl animate-[modalWindowLighting_3s_ease-in-out_infinite]"
                style={style}
            >
                <h3 className='text-[20px]'>{message}</h3>
                <h5><u>{message2}</u></h5>

                <div className="absolute bottom-7 left-0 right-0 flex justify-evenly">
                    {children}
                </div>
            </section>
        </main>
    );
};

export default Modal;
