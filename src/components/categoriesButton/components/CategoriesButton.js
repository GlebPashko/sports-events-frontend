import React, {useEffect, useRef, useState} from 'react';
import '../styles/style.scss';
import CategoriesSection from "../../categoriesSection/components/CategoriesSection";

const CategoriesButton = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [closing, setClosing] = useState(false);
    const categoriesRef = useRef(null);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => setShowCategories(false), 600);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
                setShowCategories(false);
            }
        };
        if (showCategories) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCategories]);

    return (
        <div>
            <button onClick={() => setShowCategories(!showCategories)} className="categories-button">
                Категорії
            </button>
            {showCategories && (
                <div className="categories-popup">
                    <CategoriesSection />
                </div>
            )}
        </div>
    );
};

export default CategoriesButton;
