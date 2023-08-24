import { useState, useEffect } from 'react';
import styles from './gototopbutton.module.css';

const GoToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showButton && (
                <div className={styles.up} onClick={scrollToTop}>
                        <img src='/icon/arrow_up_upload_icon.png'></img>
                </div>


            )}
        </>
    );
};

export default GoToTopButton;