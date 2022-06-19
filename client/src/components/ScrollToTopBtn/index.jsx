import React from "react";
import { useEffect, useState } from "react";
import './index.css'

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, [])

    const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTopFunc = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <div className='scroll-to-top-btn' style={{ transform: `scale(${isVisible ? 1 : 0})` }}>
                <i class="top-btn fas fa-chevron-circle-up" onClick={scrollToTopFunc}><span style={{ marginLeft: '.33rem' }}>Back To Top</span></i>
            </div>
        </div>
    )
}

export default ScrollToTop;
