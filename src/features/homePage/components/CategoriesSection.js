import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/style.scss';

const categoriesSection = [
    {name: 'Фітнес', description: 'Тренування для підтримки форми та сили', path: '/categoriesSection/fitness'},
    {name: 'Йога', description: 'Знайди гармонію через йогу та медитацію', path: '/categoriesSection/yoga'},
    {name: 'Біг', description: 'Пробіжки для покращення витривалості', path: '/categoriesSection/running'},
    {name: 'Велоспорт', description: 'Велопрогулянки та змагання', path: '/categoriesSection/cycling'},
    {name: 'Плавання', description: 'Плавання для здоров’я та спорту', path: '/categoriesSection/swimming'},
    {name: 'Гімнастика', description: 'Спортивна, художня, акробатика', path: '/categoriesSection/swimming'},
    {name: 'Серфінг', description: 'Катання на хвилях, навчання', path: '/categoriesSection/swimming'},
    {name: 'Бойові мистецтва', description: 'Карате, бокс, джиу-джитсу', path: '/categoriesSection/swimming'}
];

const CategoriesSection = () => {
    const navigate = useNavigate();

    return (
        <section id="categories" className="categories">
            <h2 className="categories__title">Обери свою категорію</h2>
            <div className="categories__wrapper">
                <div className="categories__grid">
                    {categoriesSection.map((category, index) => (
                        <div key={index} className="category-card" onClick={() => navigate(category.path)}>
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
