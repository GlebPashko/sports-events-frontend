import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/style.scss';
import {findAllCategories} from "../services/categories-sectionService";

const CategoriesSection = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const result = await findAllCategories();
                console.log(result);

                if (!result) {
                    throw new Error("Дані про івенти відсутні");
                }

                setCategories(result);
            } catch (error) {
                setError(error.message);
            }
        };

        loadCategories();
    }, []);

    return (
        <section id="categories" className="categories">
            <div className="categories__wrapper">
                <div className="categories__grid">
                    {categories.map((category) => (
                        <div key={category.id} className="category-card"
                             onClick={() => navigate('/categories/' + category.id)}>
                            <h3 className="category-card__name">{category.name}</h3>
                            <p className="category-card__description">{category.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
