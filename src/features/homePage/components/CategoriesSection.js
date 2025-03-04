import {useNavigate} from "react-router-dom";
import React from "react";
import CategoriesSection from "../../../components/categoriesSection/components/CategoriesSection";

const MainBanner = () => {
    const navigate = useNavigate();

    return (
        <section className="categories">
            <h2 id="categories__title" className="categories__title">Обери свою категорію</h2>
            <CategoriesSection/>
        </section>
    );
};

export default MainBanner;