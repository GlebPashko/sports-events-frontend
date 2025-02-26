import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import '../styles/style.scss';
import {findAllCategories} from "../services/categories-sectionService";

const CategoriesSection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authorId } = useParams();
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    let authorIdField = null;
    const isAuthorPage = location.pathname.includes("/author/");
    if (isAuthorPage) {
        const parts = location.pathname.split("/author/");
        authorIdField = parts[1]?.split("/")[0];
    }

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const filters = { };
                if (authorId) filters.author = authorId;

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
                             onClick={() => {
                                 if (isAuthorPage) {
                                     navigate(`/categories/${category.id}/author/${authorId}/events/search`);
                                 } else {
                                     navigate(`/categories/${category.id}/events/search`);
                                 }
                             }}>
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
